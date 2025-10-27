import { dashboardService } from './dashboard-service';

export class AIAutonomyService {
  private isAutonomous = false;

  async enableFullAutonomy(): Promise<void> {
    try {
      console.log('Ì∫Ä Enabling full AI autonomy...');
      
      // 1. Enable AI control in main-orchestrator
      await dashboardService.enableFullAutonomy();
      
      // 2. Auto-optimize parameters using strategy-selector
      await dashboardService.optimizeParameters();
      
      // 3. Set up autonomous profit management
      await this.setupAutonomousProfitManagement();
      
      this.isAutonomous = true;
      console.log('‚úÖ Full AI autonomy enabled successfully');
      
    } catch (error) {
      console.error('‚ùå Failed to enable full AI autonomy:', error);
      throw error;
    }
  }

  async getAIDecisionLogs(): Promise<any[]> {
    try {
      return await dashboardService.getAIDecisions();
    } catch (error) {
      console.error('Failed to get AI decision logs:', error);
      return [];
    }
  }

  async setupAutonomousProfitManagement(): Promise<void> {
    console.log('Ì≤∞ Setting up autonomous profit management...');
    // This would integrate with profit-withdrawal service
    // for automatic profit distribution and tax optimization
  }

  async executeTradingCycle(): Promise<void> {
    if (!this.isAutonomous) {
      throw new Error('AI autonomy not enabled');
    }
    
    console.log('Ì¥Å Executing autonomous trading cycle...');
    // This would coordinate the full trading cycle across all services
  }

  getAutonomyStatus(): boolean {
    return this.isAutonomous;
  }
}

export const aiAutonomyService = new AIAutonomyService();
