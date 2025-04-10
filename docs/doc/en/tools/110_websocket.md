---
sidebar_position: 110
description: ''
---

# Websocket management

Using a WebSocket in a mobile application to communicate with an ERP system enables a real-time, bidirectional and persistent connection to be established. This facilitates the instantaneous transmission of data between the application and the ERP system, without the need for multiple HTTP requests. Notifications, for example, are received immediately, improving application responsiveness and user experience while optimizing network resources.

The application kernel provides a tool for receiving websocket information in real time. This is the _useWebSocket_ hook, which takes as its argument the function to be executed as soon as the application receives a message from the ERP.

Here's an example of how to use this tool:

```tsx
import React, {useCallback} from 'react';
import {useWebSocket} from '@axelor/aos-mobile-core';

const Screen = ({}) => {
  const processMessage = useCallback(message => {
    console.log('Websocket message :', message);
  }, []);

  useWebSocket(processMessage);

  return (...);
};

export default Screen;
```

Messages will be received in :

```tsx
interface WebSocketMessage {
  type: MessageType;
  channel: string;
  data?: any;
}
```
