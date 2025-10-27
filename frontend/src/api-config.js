// AINEON API Configuration
export const AINEON_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    HEALTH: '/api/health',
    ENGINE_STATUS: '/api/engine/status',
    MODULES_STATUS: '/api/modules/status',
    BLOCKCHAIN_STATUS: '/api/blockchain/status',
    WALLET_STATUS: '/api/wallet/status',
    TRADING_PERFORMANCE: '/api/trading/performance',
    RISK_PARAMETERS: '/api/risk/parameters',
    FLASHLOANS_ANALYTICS: '/api/flashloans/analytics'
  },
  WS_URL: 'ws://localhost:8000'
};

// API Service Functions
export class AINEONAPI {
  static async getHealth() {
    const response = await fetch(`${AINEON_CONFIG.BASE_URL}${AINEON_CONFIG.ENDPOINTS.HEALTH}`);
    return response.json();
  }

  static async getEngineStatus() {
    const response = await fetch(`${AINEON_CONFIG.BASE_URL}${AINEON_CONFIG.ENDPOINTS.ENGINE_STATUS}`);
    return response.json();
  }

  static async getModulesStatus() {
    const response = await fetch(`${AINEON_CONFIG.BASE_URL}${AINEON_CONFIG.ENDPOINTS.MODULES_STATUS}`);
    return response.json();
  }

  static async getBlockchainStatus() {
    const response = await fetch(`${AINEON_CONFIG.BASE_URL}${AINEON_CONFIG.ENDPOINTS.BLOCKCHAIN_STATUS}`);
    return response.json();
  }

  static async getWalletStatus() {
    const response = await fetch(`${AINEON_CONFIG.BASE_URL}${AINEON_CONFIG.ENDPOINTS.WALLET_STATUS}`);
    return response.json();
  }

  static async getTradingPerformance() {
    const response = await fetch(`${AINEON_CONFIG.BASE_URL}${AINEON_CONFIG.ENDPOINTS.TRADING_PERFORMANCE}`);
    return response.json();
  }

  static async getRiskParameters() {
    const response = await fetch(`${AINEON_CONFIG.BASE_URL}${AINEON_CONFIG.ENDPOINTS.RISK_PARAMETERS}`);
    return response.json();
  }

  static async getFlashLoansAnalytics() {
    const response = await fetch(`${AINEON_CONFIG.BASE_URL}${AINEON_CONFIG.ENDPOINTS.FLASHLOANS_ANALYTICS}`);
    return response.json();
  }
}

// WebSocket Service for Real-time Updates
export class AINEONWebSocket {
  constructor(onMessage) {
    this.ws = new WebSocket(AINEON_CONFIG.WS_URL);
    this.onMessage = onMessage;
    
    this.ws.onopen = () => {
      console.log('í´Œ Connected to AINEON WebSocket');
    };
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.onMessage(data);
    };
    
    this.ws.onclose = () => {
      console.log('í´Œ Disconnected from AINEON WebSocket');
    };
  }
  
  close() {
    this.ws.close();
  }
}
