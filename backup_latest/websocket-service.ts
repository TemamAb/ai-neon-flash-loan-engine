import { ref } from 'vue';

class WebSocketService {
  private ws: WebSocket | null = null;
  private isConnected = ref(false);

  connect(url: string = 'ws://localhost:4001') { // Port 4001
    try {
      this.ws = new WebSocket(url);
      this.ws.onopen = () => {
        console.log('í´Œ Master Dashboard WebSocket connected');
        this.isConnected.value = true;
      };
      this.ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('WebSocket message:', message);
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

export const webSocketService = new WebSocketService();
