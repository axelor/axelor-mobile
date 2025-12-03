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

import {
  KEEP_ALIVE_INTERVAL_MS,
  MessageType,
  WebSocketListener,
  WEBSOCKET_CHANNEL,
  WebSocketMessage,
} from './types';

const SECURE_PREFIX_REGEX = /^https:\/\//;

class WebSocketProvider {
  private isWebSocketEnabled = false;
  private ws: WebSocket | null = null;
  private intervalId: number | null = null;
  private listeners: WebSocketListener[] = [];

  enableWebSocket(isWebSocketEnabled: boolean) {
    this.isWebSocketEnabled = isWebSocketEnabled;
  }

  initWebSocket({
    baseUrl,
    token,
    jsessionId,
  }: {
    baseUrl: string;
    token: string;
    jsessionId: string;
  }) {
    if (!this.isWebSocketEnabled) {
      return;
    }

    const isSecureInstance = SECURE_PREFIX_REGEX.test(baseUrl);
    const urlWithoutProtocol = baseUrl.replace(/.*\/\//, '');
    this.ws = new WebSocket(
      `${isSecureInstance ? 'wss' : 'ws'}://${urlWithoutProtocol}/websocket`,
      [], // @ts-ignore
      {headers: {Cookie: `CSRF-TOKEN=${token}; ${jsessionId}`}},
    );

    this.ws.onopen = () => {
      this.sendMessage({type: MessageType.SUB, channel: WEBSOCKET_CHANNEL});

      this.sendMessage({
        type: MessageType.MSG,
        channel: WEBSOCKET_CHANNEL,
        data: [],
      });

      this.intervalId = setInterval(() => {
        this.sendMessage({
          type: MessageType.MSG,
          channel: WEBSOCKET_CHANNEL,
          data: [],
        });
      }, KEEP_ALIVE_INTERVAL_MS);
    };

    this.ws.onmessage = event => {
      this.notify(JSON.parse(event.data));
    };

    this.ws.onerror = error => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      this.ws = null;
    };
  }

  private sendMessage(message: WebSocketMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not open. Cannot send message:', message);
    }
  }

  closeWebSocket() {
    if (this.ws) {
      this.sendMessage({type: MessageType.UNS, channel: WEBSOCKET_CHANNEL});
      this.ws.close();
    }
  }

  register(callback: WebSocketListener) {
    this.listeners.push(callback);
  }

  unregister(callback: WebSocketListener) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  private notify(message: WebSocketMessage) {
    this.listeners.forEach(callback => callback?.(message));
  }
}

export const webSocketProvider = new WebSocketProvider();
