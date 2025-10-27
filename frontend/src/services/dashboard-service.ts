import axios from 'axios';
import { portDiscovery } from './port-discovery';

const BASE_URL = 'http://localhost';

export const dashboardService = {
  async getBaseURL() {
    const port = await portDiscovery.discoverPort();
    return `${BASE_URL}:${port}`;
  },

  async getMetrics() {
    try {
      const baseURL = await this.getBaseURL();
      console.log('Ì≥ä Fetching metrics from backend...');
      const response = await axios.get(`${baseURL}/dashboard/metrics`);
      console.log('‚úÖ Metrics received');
      return response.data;
    } catch (error) {
      console.error('‚ùå Failed to fetch metrics:', error);
      throw new Error('Unable to connect to backend services');
    }
  },

  async optimizeParameters() {
    try {
      const baseURL = await this.getBaseURL();
      console.log('ÌæØ Optimizing trading parameters...');
      const response = await axios.post(`${baseURL}/strategy/optimize`);
      return response.data;
    } catch (error) {
      console.error('‚ùå Parameter optimization failed:', error);
      throw error;
    }
  },

  async getAIDecisions() {
    try {
      const baseURL = await this.getBaseURL();
      const response = await axios.get(`${baseURL}/ai/decisions`);
      return response.data;
    } catch (error) {
      console.error('‚ùå Failed to fetch AI decisions:', error);
      throw error;
    }
  },

  async getSystemHealth() {
    try {
      const baseURL = await this.getBaseURL();
      const response = await axios.get(`${baseURL}/health`);
      return response.data;
    } catch (error) {
      console.error('‚ùå Failed to fetch system health:', error);
      throw error;
    }
  },

  async findActivePort() {
    return await portDiscovery.discoverPort();
  }
};
