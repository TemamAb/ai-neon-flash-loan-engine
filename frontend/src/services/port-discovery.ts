import axios from 'axios';

const PORTS = [5000, 5001, 5002, 5003, 5004, 5005];
const BASE_URL = 'http://localhost';

export class PortDiscoveryService {
  private cachedPort: number | null = null;

  async discoverPort(): Promise<number> {
    // Return cached port if available
    if (this.cachedPort) {
      return this.cachedPort;
    }

    console.log('Ì¥ç Discovering backend port...');
    
    for (const port of PORTS) {
      try {
        const response = await axios.get(`${BASE_URL}:${port}/health`, { 
          timeout: 1000 
        });
        
        if (response.data.status === 'healthy') {
          console.log(`‚úÖ Found backend on port ${port}`);
          this.cachedPort = port;
          return port;
        }
      } catch (error) {
        // Port not available, continue to next
        console.log(`‚ùå Port ${port} not available`);
      }
    }

    throw new Error(`No backend found on ports ${PORTS.join(', ')}`);
  }

  getCachedPort(): number | null {
    return this.cachedPort;
  }

  clearCache() {
    this.cachedPort = null;
  }
}

export const portDiscovery = new PortDiscoveryService();
