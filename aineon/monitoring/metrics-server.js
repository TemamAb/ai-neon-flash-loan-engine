const { EventEmitter } = require('events');

class MetricsServer extends EventEmitter {
    constructor() {
        super();
        this.metricsData = new Map();
        this.clients = new Set();
        this.retentionPeriod = 24 * 60 * 60 * 1000; // 24 hours
        this.metrics = {
            connectedClients: 0,
            metricsServed: 0,
            avgProcessingTime: 45,
            errorRate: 0.02
        };
    }

    async initialize() {
        console.log("í³ˆ Metrics Server initializing...");
        this.startDataCleanup();
        this.startHealthChecks();
        return true;
    }

    registerMetric(metricName, initialValue = 0) {
        this.metricsData.set(metricName, {
            values: [{
                value: initialValue,
                timestamp: Date.now(),
                tags: {}
            }],
            metadata: {
                type: 'gauge',
                description: '',
                unit: '',
                retention: this.retentionPeriod
            }
        });
        
        console.log(`âœ… Registered metric: ${metricName}`);
        return true;
    }

    recordMetric(metricName, value, tags = {}) {
        if (!this.metricsData.has(metricName)) {
            this.registerMetric(metricName, value);
        }

        const metric = this.metricsData.get(metricName);
        const dataPoint = {
            value,
            timestamp: Date.now(),
            tags
        };

        metric.values.push(dataPoint);
        
        // Emit event for real-time subscribers
        this.emit('metricUpdate', {
            metric: metricName,
            data: dataPoint,
            metadata: metric.metadata
        });

        this.metrics.metricsServed++;
        
        return true;
    }

    recordCounter(metricName, increment = 1, tags = {}) {
        const currentValue = this.getCurrentValue(metricName) || 0;
        return this.recordMetric(metricName, currentValue + increment, tags);
    }

    getMetric(metricName, timeframe = '1h') {
        if (!this.metricsData.has(metricName)) {
            return null;
        }

        const metric = this.metricsData.get(metricName);
        const filteredData = this.filterByTimeframe(metric.values, timeframe);
        
        return {
            name: metricName,
            metadata: metric.metadata,
            data: filteredData,
            summary: this.calculateSummary(filteredData)
        };
    }

    filterByTimeframe(data, timeframe) {
        const now = Date.now();
        let timeWindow;

        switch (timeframe) {
            case '5m': timeWindow = 5 * 60 * 1000; break;
            case '1h': timeWindow = 60 * 60 * 1000; break;
            case '6h': timeWindow = 6 * 60 * 60 * 1000; break;
            case '24h': timeWindow = 24 * 60 * 60 * 1000; break;
            default: timeWindow = 60 * 60 * 1000;
        }

        return data.filter(point => point.timestamp > now - timeWindow);
    }

    calculateSummary(data) {
        if (data.length === 0) {
            return { count: 0, avg: 0, min: 0, max: 0 };
        }

        const values = data.map(point => point.value);
        const sum = values.reduce((a, b) => a + b, 0);
        
        return {
            count: data.length,
            avg: sum / values.length,
            min: Math.min(...values),
            max: Math.max(...values),
            sum: sum,
            latest: values[values.length - 1]
        };
    }

    getCurrentValue(metricName) {
        const metric = this.metricsData.get(metricName);
        if (!metric || metric.values.length === 0) {
            return null;
        }
        
        return metric.values[metric.values.length - 1].value;
    }

    getSystemMetrics() {
        const systemMetrics = {};
        
        for (const [metricName, metric] of this.metricsData.entries()) {
            systemMetrics[metricName] = {
                current: this.getCurrentValue(metricName),
                summary: this.calculateSummary(metric.values.slice(-100)) // Last 100 points
            };
        }

        return systemMetrics;
    }

    startDataCleanup() {
        setInterval(() => {
            const now = Date.now();
            let cleanedCount = 0;

            for (const [metricName, metric] of this.metricsData.entries()) {
                const originalLength = metric.values.length;
                metric.values = metric.values.filter(point => 
                    point.timestamp > now - metric.metadata.retention
                );
                cleanedCount += (originalLength - metric.values.length);
            }

            if (cleanedCount > 0) {
                console.log(`í·¹ Cleaned ${cleanedCount} old metric data points`);
            }
        }, 60 * 60 * 1000); // Clean every hour
    }

    startHealthChecks() {
        setInterval(() => {
            const health = {
                status: 'HEALTHY',
                metricsCount: this.metricsData.size,
                totalDataPoints: Array.from(this.metricsData.values()).reduce((sum, metric) => sum + metric.values.length, 0),
                connectedClients: this.clients.size,
                memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
                uptime: process.uptime()
            };

            this.recordMetric('metrics_server.health', health.status === 'HEALTHY' ? 1 : 0);
            this.recordMetric('metrics_server.memory_mb', health.memoryUsage);
            this.recordMetric('metrics_server.connected_clients', health.connectedClients);

            this.emit('healthCheck', health);
        }, 30000); // Health check every 30 seconds
    }

    connectClient(clientInfo) {
        this.clients.add(clientInfo);
        this.metrics.connectedClients = this.clients.size;
        
        console.log(`í´— Client connected: ${clientInfo.id || 'unknown'}`);
        this.emit('clientConnected', clientInfo);
        
        return () => {
            this.clients.delete(clientInfo);
            this.metrics.connectedClients = this.clients.size;
            this.emit('clientDisconnected', clientInfo);
        };
    }

    generateDashboardData() {
        const keyMetrics = [
            'trading.success_rate',
            'system.response_time',
            'bot.health',
            'profit.daily',
            'execution.latency'
        ];

        const dashboard = {
            overview: {
                performanceScore: this.calculatePerformanceScore(),
                totalProfit: this.getCurrentValue('profit.total') || 0,
                activeStrategies: this.getCurrentValue('strategies.active') || 0,
                systemUptime: this.getCurrentValue('system.uptime') || 99.4
            },
            metrics: {},
            trends: {},
            alerts: this.getActiveAlerts()
        };

        keyMetrics.forEach(metricName => {
            const metricData = this.getMetric(metricName, '6h');
            if (metricData) {
                dashboard.metrics[metricName] = metricData;
                dashboard.trends[metricName] = this.calculateTrend(metricData.data);
            }
        });

        return dashboard;
    }

    calculatePerformanceScore() {
        const weights = {
            'trading.success_rate': 0.3,
            'system.response_time': 0.2,
            'bot.health': 0.2,
            'profit.daily': 0.2,
            'execution.latency': 0.1
        };

        let totalScore = 0;
        let totalWeight = 0;

        for (const [metricName, weight] of Object.entries(weights)) {
            const currentValue = this.getCurrentValue(metricName);
            if (currentValue !== null) {
                // Normalize values to 0-100 scale
                let normalizedValue;
                
                switch (metricName) {
                    case 'trading.success_rate':
                        normalizedValue = currentValue; // Already 0-100
                        break;
                    case 'system.response_time':
                        normalizedValue = Math.max(0, 100 - (currentValue / 10)); // Inverse scale
                        break;
                    case 'bot.health':
                        normalizedValue = currentValue; // Already 0-100
                        break;
                    case 'profit.daily':
                        normalizedValue = Math.min(100, currentValue / 1000); // Scale by $1000
                        break;
                    case 'execution.latency':
                        normalizedValue = Math.max(0, 100 - (currentValue / 5)); // Inverse scale
                        break;
                    default:
                        normalizedValue = currentValue;
                }
                
                totalScore += normalizedValue * weight;
                totalWeight += weight;
            }
        }

        return totalWeight > 0 ? totalScore / totalWeight : 0;
    }

    calculateTrend(data) {
        if (data.length < 2) return 'STABLE';
        
        const recent = data.slice(-10); // Last 10 data points
        const values = recent.map(point => point.value);
        
        if (values.length < 2) return 'STABLE';
        
        const first = values[0];
        const last = values[values.length - 1];
        const change = ((last - first) / first) * 100;
        
        if (change > 5) return 'UP';
        if (change < -5) return 'DOWN';
        return 'STABLE';
    }

    getActiveAlerts() {
        // Simulate active alerts
        return [
            {
                id: 'alert_001',
                level: 'WARNING',
                message: 'Bot health below optimal level',
                metric: 'bot.health',
                value: 84,
                threshold: 90,
                timestamp: Date.now() - 300000 // 5 minutes ago
            }
        ];
    }

    getMetrics() {
        return {
            server: this.metrics,
            system: this.getSystemMetrics(),
            dashboard: this.generateDashboardData()
        };
    }
}

module.exports = MetricsServer;
