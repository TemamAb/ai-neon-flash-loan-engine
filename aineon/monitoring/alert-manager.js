class AlertManager {
    constructor() {
        this.activeAlerts = new Map();
        this.alertRules = new Map();
        this.notificationChannels = new Set();
        this.metrics = {
            totalAlerts: 1247,
            activeAlerts: 3,
            resolvedAlerts: 1244,
            avgResolutionTime: 450000, // 7.5 minutes
            falsePositives: 12
        };
        this.initializeDefaultRules();
    }

    async initialize() {
        console.log("íº¨ Alert Manager initializing...");
        this.startAlertEvaluation();
        return true;
    }

    initializeDefaultRules() {
        const defaultRules = [
            {
                id: 'rule_success_rate_low',
                name: 'Low Success Rate',
                condition: (metrics) => metrics.successRate < 95,
                severity: 'CRITICAL',
                cooldown: 300000, // 5 minutes
                message: (metrics) => `Success rate dropped to ${metrics.successRate}%`
            },
            {
                id: 'rule_response_time_high',
                name: 'High Response Time',
                condition: (metrics) => metrics.avgResponseTime > 1000,
                severity: 'WARNING',
                cooldown: 600000, // 10 minutes
                message: (metrics) => `Average response time ${metrics.avgResponseTime}ms exceeds threshold`
            },
            {
                id: 'rule_bot_health_low',
                name: 'Low Bot Health',
                condition: (metrics) => (metrics.activeBots / 50) * 100 < 80,
                severity: 'WARNING',
                cooldown: 300000,
                message: (metrics) => `Bot health at ${((metrics.activeBots / 50) * 100).toFixed(1)}%`
            },
            {
                id: 'rule_system_uptime_low',
                name: 'Low System Uptime',
                condition: (metrics) => metrics.systemUptime < 99,
                severity: 'CRITICAL',
                cooldown: 900000, // 15 minutes
                message: (metrics) => `System uptime at ${metrics.systemUptime}%`
            },
            {
                id: 'rule_profit_drop',
                name: 'Profit Drop Detected',
                condition: (metrics) => metrics.dailyAverage < 100000,
                severity: 'WARNING',
                cooldown: 1800000, // 30 minutes
                message: (metrics) => `Daily profit average dropped to $${metrics.dailyAverage}`
            }
        ];

        defaultRules.forEach(rule => {
            this.alertRules.set(rule.id, {
                ...rule,
                lastTriggered: 0,
                triggerCount: 0
            });
        });
    }

    startAlertEvaluation() {
        setInterval(() => {
            this.evaluateAlertRules();
        }, 30000); // Evaluate every 30 seconds
    }

    async evaluateAlertRules() {
        const currentMetrics = await this.getCurrentMetrics();
        
        for (const [ruleId, rule] of this.alertRules.entries()) {
            // Check cooldown
            if (Date.now() - rule.lastTriggered < rule.cooldown) {
                continue;
            }

            // Evaluate condition
            if (rule.condition(currentMetrics)) {
                await this.triggerAlert(rule, currentMetrics);
            } else {
                // Check if we should auto-resolve an active alert
                await this.checkAutoResolution(ruleId, currentMetrics);
            }
        }
    }

    async triggerAlert(rule, metrics) {
        const alertId = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const alert = {
            id: alertId,
            ruleId: rule.id,
            ruleName: rule.name,
            severity: rule.severity,
            message: rule.message(metrics),
            triggeredAt: Date.now(),
            metrics: metrics,
            status: 'ACTIVE',
            acknowledged: false,
            resolution: null
        };

        this.activeAlerts.set(alertId, alert);
        rule.lastTriggered = Date.now();
        rule.triggerCount++;

        this.metrics.totalAlerts++;
        this.metrics.activeAlerts = this.activeAlerts.size;

        console.log(`íº¨ ALERT TRIGGERED: ${rule.name} - ${alert.message}`);

        // Send notifications
        await this.sendNotifications(alert);
        
        // Trigger automated responses
        await this.triggerAutomatedResponse(alert);

        return alertId;
    }

    async checkAutoResolution(ruleId, metrics) {
        const relatedAlerts = Array.from(this.activeAlerts.values())
            .filter(alert => alert.ruleId === ruleId && alert.status === 'ACTIVE');

        for (const alert of relatedAlerts) {
            const rule = this.alertRules.get(ruleId);
            if (!rule.condition(metrics)) {
                await this.resolveAlert(alert.id, 'AUTO_RESOLVED', 'Condition no longer met');
            }
        }
    }

    async resolveAlert(alertId, resolutionType = 'MANUAL', notes = '') {
        const alert = this.activeAlerts.get(alertId);
        if (!alert) {
            throw new Error(`Alert ${alertId} not found`);
        }

        alert.status = 'RESOLVED';
        alert.resolvedAt = Date.now();
        alert.resolution = {
            type: resolutionType,
            notes,
            resolvedBy: 'SYSTEM'
        };

        const resolutionTime = alert.resolvedAt - alert.triggeredAt;
        this.metrics.avgResolutionTime = (this.metrics.avgResolutionTime * (this.metrics.resolvedAlerts) + resolutionTime) / (this.metrics.resolvedAlerts + 1);
        this.metrics.resolvedAlerts++;
        this.metrics.activeAlerts = this.activeAlerts.size;

        console.log(`âœ… Alert resolved: ${alert.ruleName} (${resolutionTime}ms)`);

        // Send resolution notification
        await this.sendNotifications({
            ...alert,
            type: 'RESOLUTION'
        });

        // Remove from active alerts after some time
        setTimeout(() => {
            this.activeAlerts.delete(alertId);
        }, 3600000); // Keep in history for 1 hour

        return alert;
    }

    async sendNotifications(alert) {
        const notification = {
            type: alert.status === 'ACTIVE' ? 'ALERT' : 'RESOLUTION',
            alert: {
                id: alert.id,
                ruleName: alert.ruleName,
                severity: alert.severity,
                message: alert.message,
                triggeredAt: alert.triggeredAt,
                metrics: alert.metrics
            },
            timestamp: Date.now()
        };

        if (alert.status === 'RESOLVED') {
            notification.alert.resolvedAt = alert.resolvedAt;
            notification.alert.resolution = alert.resolution;
        }

        // Send to all registered channels
        for (const channel of this.notificationChannels) {
            try {
                await channel.send(notification);
            } catch (error) {
                console.error(`Failed to send notification via ${channel.name}:`, error);
            }
        }
    }

    async triggerAutomatedResponse(alert) {
        const responses = {
            'CRITICAL': async () => {
                console.log(`í´„ Triggering critical response for: ${alert.ruleName}`);
                
                if (alert.ruleId === 'rule_success_rate_low') {
                    await this.reduceTradingVolume(0.5); // Reduce by 50%
                } else if (alert.ruleId === 'rule_system_uptime_low') {
                    await this.activateBackupSystems();
                }
            },
            'WARNING': async () => {
                console.log(`âš ï¸  Triggering warning response for: ${alert.ruleName}`);
                
                if (alert.ruleId === 'rule_response_time_high') {
                    await this.optimizeResourceAllocation();
                } else if (alert.ruleId === 'rule_bot_health_low') {
                    await this.restartUnhealthyBots();
                }
            }
        };

        const response = responses[alert.severity];
        if (response) {
            await response();
        }
    }

    async reduceTradingVolume(factor) {
        console.log(`í³‰ Reducing trading volume by ${(factor * 100)}%`);
        // Implementation would adjust trading parameters
    }

    async activateBackupSystems() {
        console.log('í´„ Activating backup systems');
        // Implementation would switch to failover systems
    }

    async optimizeResourceAllocation() {
        console.log('í´„ Optimizing resource allocation');
        // Implementation would reallocate resources
    }

    async restartUnhealthyBots() {
        console.log('í´„ Restarting unhealthy bots');
        // Implementation would restart bot processes
    }

    registerNotificationChannel(channel) {
        this.notificationChannels.add(channel);
        console.log(`âœ… Registered notification channel: ${channel.name}`);
        return () => this.notificationChannels.delete(channel);
    }

    async getCurrentMetrics() {
        // Simulate fetching current metrics
        return {
            successRate: 98.7 - Math.random() * 2,
            avgResponseTime: 450 + Math.random() * 200,
            activeBots: 42 + Math.floor(Math.random() * 3) - 1,
            systemUptime: 99.4 - Math.random() * 0.5,
            dailyAverage: 153384 + Math.random() * 10000 - 5000,
            totalProfit: 2147380 + Math.random() * 50000
        };
    }

    getActiveAlerts() {
        return Array.from(this.activeAlerts.values());
    }

    getAlertHistory(timeframe = '24h') {
        // In production, this would query a database
        const now = Date.now();
        let timeWindow;

        switch (timeframe) {
            case '1h': timeWindow = 60 * 60 * 1000; break;
            case '6h': timeWindow = 6 * 60 * 60 * 1000; break;
            case '24h': timeWindow = 24 * 60 * 60 * 1000; break;
            case '7d': timeWindow = 7 * 24 * 60 * 60 * 1000; break;
            default: timeWindow = 24 * 60 * 60 * 1000;
        }

        // Simulate historical alerts
        return this.generateMockAlerts(timeWindow);
    }

    generateMockAlerts(timeWindow) {
        const now = Date.now();
        const alerts = [];
        const ruleIds = Array.from(this.alertRules.keys());

        // Generate some mock historical alerts
        for (let i = 0; i < 10; i++) {
            const ruleId = ruleIds[Math.floor(Math.random() * ruleIds.length)];
            const rule = this.alertRules.get(ruleId);
            
            alerts.push({
                id: `hist_alert_${i}`,
                ruleId,
                ruleName: rule.name,
                severity: rule.severity,
                message: `Historical ${rule.name} alert`,
                triggeredAt: now - Math.random() * timeWindow,
                resolvedAt: now - Math.random() * (timeWindow / 2),
                status: 'RESOLVED',
                acknowledged: true,
                resolution: {
                    type: 'AUTO_RESOLVED',
                    notes: 'Condition normalized',
                    resolvedBy: 'SYSTEM'
                }
            });
        }

        return alerts.sort((a, b) => b.triggeredAt - a.triggeredAt);
    }

    acknowledgeAlert(alertId, acknowledgedBy = 'USER') {
        const alert = this.activeAlerts.get(alertId);
        if (alert) {
            alert.acknowledged = true;
            alert.acknowledgedBy = acknowledgedBy;
            alert.acknowledgedAt = Date.now();
            return true;
        }
        return false;
    }

    getMetrics() {
        return {
            ...this.metrics,
            alertRules: this.alertRules.size,
            notificationChannels: this.notificationChannels.size
        };
    }
}

module.exports = AlertManager;
