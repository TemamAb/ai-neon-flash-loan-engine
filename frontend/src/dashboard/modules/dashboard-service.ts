import { ref } from 'vue';

export interface DashboardMetrics {
  system: any;
  wallet: any;
  trading: any;
  optimization: any;
  monitoring: any;
  ai: any;
  profit: any;
  flashloan: any;
  security: any;
  health: any;
}

class DashboardService {
  private baseUrl = 'http://localhost:5000/api';
  private currentMetrics = ref<DashboardMetrics | null>(null);

  async getMetrics(): Promise<DashboardMetrics> {
    try {
      console.log('Ì≥ä Fetching metrics from:', `${this.baseUrl}/metrics`);
      const response = await fetch(`${this.baseUrl}/metrics`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('‚úÖ Received metrics:', data);
      this.currentMetrics.value = data;
      return data;
    } catch (error) {
      console.error('‚ùå Failed to fetch dashboard metrics:', error);
      // Return mock data as fallback
      return this.getMockData();
    }
  }

  async enableFullAutonomy(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/ai/autonomy/enable`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'AUTONOMOUS' })
      });
      
      if (response.ok) {
        console.log('‚úÖ AI autonomy enabled');
      }
    } catch (error) {
      console.error('Failed to enable autonomy:', error);
    }
  }

  getMockData(): DashboardMetrics {
    return {
      system: { status: "Ìø¢ OPERATIONAL", aiMode: "AUTONOMOUS" },
      wallet: { totalBalance: 12847290, status: "SECURE" },
      trading: { successRate: 98.7, latency: 450 },
      optimization: { activeStrategies: 15, pipelineHealth: "Optimal" },
      monitoring: { botArmy: { seekers: { active: 42, total: 50 } } },
      ai: { patternAccuracy: 96.2, confidenceScore: 94.8 },
      profit: { totalProfits: 2147380, taxSaved: 12400 },
      flashloan: { utilization: 68, currentROI: 3.2 },
      security: { activeThreats: 0, threatLevel: "LOW" },
      health: { systemHealth: "Optimal", uptime: 99.4 }
    };
  }

  getCurrentMetrics() {
    return this.currentMetrics;
  }
}

export const dashboardService = new DashboardService();
