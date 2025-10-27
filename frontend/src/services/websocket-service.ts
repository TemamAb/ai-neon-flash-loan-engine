import { ref } from 'vue';
import { portDiscovery } from './port-discovery';

class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: Map<string, Function[]> = new Map();
  public isConnected = ref(false);
  private currentPort: number | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  async connect() {
    try {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('âŒ Max reconnection attempts reached');
        return;
      }

      this.currentPort = await portDiscovery.discoverPort();
      const WS_URL = `ws://localhost:${this.currentPort}/ws`;
      
      console.log(`í´Œ Connecting to WebSocket (attempt ${this.reconnectAttempts + 1})...`);
      this.socket = new WebSocket(WS_URL);
      
      this.socket.onopen = () => {
        console.log('âœ… WebSocket connected successfully');
        this.isConnected.value = true;
        this.reconnectAttempts = 0; // Reset on successful connection
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('í³¨ WebSocket message:', data.type);
          this.emit(data.type, data.payload);
        } catch (error) {
          console.error('âŒ WebSocket message parsing error:', error);
        }
      };

      this.socket.onclose = (event) => {
        console.log(`í´Œ WebSocket disconnected: ${event.code} ${event.reason}`);
        this.isConnected.value = false;
        this.socket = null;
        
        // Attempt reconnect with exponential backoff
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
          console.log(`í´„ Reconnecting in ${delay}ms...`);
          setTimeout(() => {
            this.reconnectAttempts++;
            this.connect();
          }, delay);
        }
      };

      this.socket.onerror = (error) => {
        console.error('âŒ WebSocket error:', error);
      };

    } catch (error) {
      console.error('âŒ WebSocket connection failed:', error);
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  emit(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  send(message: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.reconnectAttempts = 0;
  }

  getConnectionStatus() {
    return this.isConnected;
  }

  getCurrentPort() {
    return this.currentPort;
  }
}

export const webSocketService = new WebSocketService();
