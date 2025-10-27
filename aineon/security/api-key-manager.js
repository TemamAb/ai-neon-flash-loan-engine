const crypto = require('crypto');

class ApiKeyManager {
    constructor() {
        this.apiKeys = new Map();
        this.rotationInterval = 72 * 60 * 60 * 1000; // 72 hours
        this.encryptionKey = process.env.ENCRYPTION_KEY || this.generateEncryptionKey();
        this.accessLogs = [];
        this.metrics = {
            totalKeys: 0,
            activeKeys: 0,
            rotatedKeys: 0,
            failedAttempts: 3,
            lastAudit: Date.now()
        };
    }

    async initialize() {
        console.log("í´‘ API Key Manager initializing...");
        this.startAutoRotation();
        this.startAuditProcess();
        return true;
    }

    generateEncryptionKey() {
        return crypto.randomBytes(32).toString('hex');
    }

    async generateApiKey(serviceName, permissions, metadata = {}) {
        const keyId = `key_${Date.now()}_${crypto.randomBytes(8).toString('hex')}`;
        const apiKey = `ak_${crypto.randomBytes(32).toString('hex')}`;
        const secret = `sk_${crypto.randomBytes(64).toString('hex')}`;

        const keyData = {
            id: keyId,
            service: serviceName,
            apiKey: this.encrypt(apiKey),
            secret: this.encrypt(secret),
            permissions: this.validatePermissions(permissions),
            metadata: {
                ...metadata,
                createdBy: 'SYSTEM',
                version: '1.0'
            },
            createdAt: Date.now(),
            lastUsed: null,
            lastRotated: Date.now(),
            rotationDate: Date.now() + this.rotationInterval,
            isActive: true,
            usageCount: 0,
            rateLimit: metadata.rateLimit || 1000 // requests per minute
        };

        this.apiKeys.set(keyId, keyData);
        
        this.metrics.totalKeys++;
        this.metrics.activeKeys++;

        console.log(`âœ… Generated API key for ${serviceName} (${keyId})`);

        // Log the generation
        this.logAccess('KEY_GENERATED', keyId, null, { service: serviceName });

        return {
            keyId,
            apiKey,
            secret,
            permissions: keyData.permissions,
            rotationDate: new Date(keyData.rotationDate).toISOString()
        };
    }

    validatePermissions(permissions) {
        const validPermissions = [
            'READ_TRADES',
            'EXECUTE_TRADES', 
            'READ_BALANCE',
            'WITHDRAW_FUNDS',
            'MANAGE_STRATEGIES',
            'VIEW_ANALYTICS',
            'ADMIN'
        ];

        return permissions.filter(perm => validPermissions.includes(perm));
    }

    async validateApiKey(apiKey, requiredPermission = null) {
        const startTime = Date.now();
        
        try {
            // Find the key
            let keyData = null;
            let keyId = null;

            for (const [id, data] of this.apiKeys.entries()) {
                if (this.decrypt(data.apiKey) === apiKey && data.isActive) {
                    keyData = data;
                    keyId = id;
                    break;
                }
            }

            if (!keyData) {
                this.logAccess('KEY_VALIDATION_FAILED', null, null, { reason: 'Key not found' });
                this.metrics.failedAttempts++;
                return { valid: false, reason: 'Invalid API key' };
            }

            // Check if key is active
            if (!keyData.isActive) {
                this.logAccess('KEY_VALIDATION_FAILED', keyId, null, { reason: 'Key inactive' });
                return { valid: false, reason: 'API key is inactive' };
            }

            // Check rate limiting
            if (!this.checkRateLimit(keyData)) {
                this.logAccess('RATE_LIMIT_EXCEEDED', keyId, null, { rateLimit: keyData.rateLimit });
                return { valid: false, reason: 'Rate limit exceeded' };
            }

            // Check permission if required
            if (requiredPermission && !keyData.permissions.includes(requiredPermission)) {
                this.logAccess('PERMISSION_DENIED', keyId, null, { 
                    required: requiredPermission, 
                    has: keyData.permissions 
                });
                return { valid: false, reason: 'Insufficient permissions' };
            }

            // Update key usage
            keyData.lastUsed = Date.now();
            keyData.usageCount++;
            
            const validationTime = Date.now() - startTime;

            this.logAccess('KEY_VALIDATED', keyId, validationTime, {
                permission: requiredPermission,
                service: keyData.service
            });

            return {
                valid: true,
                keyId,
                permissions: keyData.permissions,
                service: keyData.service,
                validationTime
            };

        } catch (error) {
            this.logAccess('VALIDATION_ERROR', null, null, { error: error.message });
            return { valid: false, reason: 'Validation error' };
        }
    }

    checkRateLimit(keyData) {
        // Simple rate limiting - in production use more sophisticated approach
        const timeWindow = 60 * 1000; // 1 minute
        const recentUsage = this.accessLogs.filter(log => 
            log.keyId === keyData.id && 
            log.timestamp > Date.now() - timeWindow &&
            log.event === 'KEY_VALIDATED'
        ).length;

        return recentUsage < keyData.rateLimit;
    }

    async rotateApiKey(keyId, reason = 'SCHEDULED_ROTATION') {
        const keyData = this.apiKeys.get(keyId);
        if (!keyData) {
            throw new Error('API key not found');
        }

        // Generate new key
        const newApiKey = `ak_${crypto.randomBytes(32).toString('hex')}`;
        const newSecret = `sk_${crypto.randomBytes(64).toString('hex')}`;

        // Keep old key for grace period
        keyData.oldApiKey = keyData.apiKey;
        keyData.oldSecret = keyData.secret;
        keyData.apiKey = this.encrypt(newApiKey);
        keyData.secret = this.encrypt(newSecret);
        keyData.lastRotated = Date.now();
        keyData.rotationDate = Date.now() + this.rotationInterval;
        keyData.rotationReason = reason;

        this.metrics.rotatedKeys++;

        console.log(`í´„ Rotated API key: ${keyId} (${reason})`);
        this.logAccess('KEY_ROTATED', keyId, null, { reason });

        return {
            keyId,
            newApiKey,
            newSecret,
            rotationDate: new Date(keyData.rotationDate).toISOString()
        };
    }

    startAutoRotation() {
        setInterval(() => {
            const now = Date.now();
            let rotated = 0;

            for (const [keyId, keyData] of this.apiKeys.entries()) {
                if (keyData.isActive && keyData.rotationDate <= now) {
                    this.rotateApiKey(keyId, 'AUTO_ROTATION')
                        .then(() => rotated++)
                        .catch(error => console.error(`Failed to rotate key ${keyId}:`, error));
                }
            }

            if (rotated > 0) {
                console.log(`í´„ Auto-rotated ${rotated} API keys`);
            }
        }, 60 * 60 * 1000); // Check every hour
    }

    startAuditProcess() {
        setInterval(() => {
            this.performSecurityAudit();
        }, 24 * 60 * 60 * 1000); // Daily audit
    }

    async performSecurityAudit() {
        console.log('í´ Performing security audit...');
        
        const audit = {
            timestamp: Date.now(),
            totalKeys: this.apiKeys.size,
            activeKeys: Array.from(this.apiKeys.values()).filter(k => k.isActive).length,
            expiredKeys: Array.from(this.apiKeys.values()).filter(k => !k.isActive).length,
            keysNeedingRotation: Array.from(this.apiKeys.values()).filter(k => 
                k.isActive && k.rotationDate < Date.now() + (24 * 60 * 60 * 1000) // 24 hours
            ).length,
            securityIssues: [],
            recommendations: []
        };

        // Check for keys that haven't been used in 30 days
        const staleKeys = Array.from(this.apiKeys.values()).filter(k => 
            k.isActive && k.lastUsed && (Date.now() - k.lastUsed) > (30 * 24 * 60 * 60 * 1000)
        );

        if (staleKeys.length > 0) {
            audit.securityIssues.push({
                level: 'MEDIUM',
                issue: 'STALE_KEYS',
                count: staleKeys.length,
                description: `${staleKeys.length} API keys haven't been used in 30+ days`
            });
            audit.recommendations.push('Consider deactivating unused API keys');
        }

        // Check for keys with excessive permissions
        const highPermissionKeys = Array.from(this.apiKeys.values()).filter(k => 
            k.isActive && k.permissions.includes('ADMIN')
        );

        if (highPermissionKeys.length > 3) {
            audit.securityIssues.push({
                level: 'HIGH',
                issue: 'EXCESSIVE_ADMIN_KEYS',
                count: highPermissionKeys.length,
                description: 'Too many keys with ADMIN permissions'
            });
            audit.recommendations.push('Review and reduce ADMIN key count');
        }

        this.metrics.lastAudit = Date.now();
        this.logAccess('SECURITY_AUDIT', null, null, audit);

        console.log(`âœ… Security audit completed: ${audit.securityIssues.length} issues found`);
        
        return audit;
    }

    encrypt(data) {
        const cipher = crypto.createCipher('aes-256-gcm', this.encryptionKey);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decrypt(encryptedData) {
        const decipher = crypto.createDecipher('aes-256-gcm', this.encryptionKey);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    logAccess(event, keyId, duration = null, metadata = {}) {
        const logEntry = {
            event,
            keyId,
            timestamp: Date.now(),
            duration,
            metadata,
            ip: metadata.ip || 'unknown',
            userAgent: metadata.userAgent || 'unknown'
        };

        this.accessLogs.push(logEntry);

        // Keep only last 10,000 logs
        if (this.accessLogs.length > 10000) {
            this.accessLogs = this.accessLogs.slice(-10000);
        }
    }

    deactivateKey(keyId, reason = 'MANUAL_DEACTIVATION') {
        const keyData = this.apiKeys.get(keyId);
        if (keyData) {
            keyData.isActive = false;
            keyData.deactivatedAt = Date.now();
            keyData.deactivationReason = reason;
            
            this.metrics.activeKeys--;
            
            console.log(`í´’ Deactivated API key: ${keyId} (${reason})`);
            this.logAccess('KEY_DEACTIVATED', keyId, null, { reason });
            
            return true;
        }
        return false;
    }

    getAccessLogs(timeframe = '24h', keyId = null) {
        const now = Date.now();
        const timeWindow = {
            '1h': 60 * 60 * 1000,
            '6h': 6 * 60 * 60 * 1000,
            '24h': 24 * 60 * 60 * 1000,
            '7d': 7 * 24 * 60 * 60 * 1000
        }[timeframe] || 24 * 60 * 60 * 1000;

        let logs = this.accessLogs.filter(log => log.timestamp > now - timeWindow);
        
        if (keyId) {
            logs = logs.filter(log => log.keyId === keyId);
        }

        return logs;
    }

    getKeyStatistics() {
        const keys = Array.from(this.apiKeys.values());
        
        return {
            total: keys.length,
            active: keys.filter(k => k.isActive).length,
            byService: this.groupByService(keys),
            usageStats: this.calculateUsageStats(keys),
            rotationStatus: this.getRotationStatus(keys)
        };
    }

    groupByService(keys) {
        const groups = {};
        keys.forEach(key => {
            if (!groups[key.service]) groups[key.service] = 0;
            groups[key.service]++;
        });
        return groups;
    }

    calculateUsageStats(keys) {
        const activeKeys = keys.filter(k => k.isActive);
        const totalUsage = activeKeys.reduce((sum, k) => sum + k.usageCount, 0);
        const avgUsage = activeKeys.length > 0 ? totalUsage / activeKeys.length : 0;
        
        return {
            totalUsage,
            averageUsage: Math.round(avgUsage),
            mostUsed: activeKeys.sort((a, b) => b.usageCount - a.usageCount)[0]?.usageCount || 0
        };
    }

    getRotationStatus(keys) {
        const now = Date.now();
        const upcomingRotation = keys.filter(k => 
            k.isActive && k.rotationDate < now + (7 * 24 * 60 * 60 * 1000) // 7 days
        ).length;

        return {
            needsRotation: keys.filter(k => k.isActive && k.rotationDate < now).length,
            upcomingRotation,
            onSchedule: keys.filter(k => k.isActive && k.rotationDate > now + (7 * 24 * 60 * 60 * 1000)).length
        };
    }

    getMetrics() {
        return {
            ...this.metrics,
            keyStatistics: this.getKeyStatistics(),
            recentAccess: this.getAccessLogs('1h').length
        };
    }
}

module.exports = ApiKeyManager;
