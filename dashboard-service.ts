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
  private baseUrl = 'http://localhost:4000/api'; // Port 4000
  private currentMetrics = ref<DashboardMetrics | null>(null);

  async getMetrics(): Promise<DashboardMetrics> {
    try {
      const response = await fetch(`${this.baseUrl}/metrics`);
      const data = await response.json();
      this.currentMetrics.value = data;
      return data;
    } catch (error) {
      console.error('Failed to fetch dashboard metrics:', error);
      throw error;
    }
  }

  async enableFullAutonomy(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/ai/autonomy/enable`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'AUTONOMOUS' })
    });
    return response.json();
  }

  getCurrentMetrics() {
    return this.currentMetrics;
  }
}

export const dashboardService = new DashboardService();
