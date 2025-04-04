/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {useEffect} from 'react';

class WebSocketProvider {
  private isWebSocketEnabled = false;
  private ws: WebSocket | null = null;
  private intervalId: number | null = null;
  private listeners: Function[] = [];

  enableWebSocket(isWebSocketEnabled) {
    this.isWebSocketEnabled = isWebSocketEnabled;
  }

  initWebSocket({baseUrl, token, jsessionId}) {
    if (!this.isWebSocketEnabled) {
      return;
    }

    // @ts-ignore
    this.ws = new WebSocket(`wss://${baseUrl}/websocket`, [], {
      headers: {
        Cookie: `CSRF-TOKEN=${token}; ${jsessionId}`,
      },
    });

    this.ws.onopen = () => {
      this.sendMessage({type: 'SUB', channel: 'tags'});

      this.sendMessage({type: 'MSG', channel: 'tags', data: []});
      this.intervalId = setInterval(() => {
        this.sendMessage({type: 'MSG', channel: 'tags', data: []});
      }, 5000);
    };

    this.ws.onmessage = event => {
      this.notify(event.data);
    };

    this.ws.onclose = () => {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.ws = null;
    };
  }

  private sendMessage(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not open. Cannot send message:', message);
    }
  }

  closeWebSocket() {
    if (this.ws) {
      this.sendMessage({type: 'UNS', channel: 'tags'});
      this.ws.close();
    }
  }

  register(callback: Function) {
    this.listeners.push(callback);
  }

  unregister(callback: Function) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  private notify(message: any) {
    this.listeners.forEach(callback => callback?.(message));
  }
}

export const webSocketProvider = new WebSocketProvider();

interface useWebSocketProps {
  listener: (message: any) => void;
}

export const useWebSocket = ({listener}: useWebSocketProps) => {
  useEffect(() => {
    webSocketProvider.register(listener);

    return () => webSocketProvider.unregister(listener);
  }, [listener]);
};
