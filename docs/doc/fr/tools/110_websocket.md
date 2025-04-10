---
sidebar_position: 110
description: ''
---

# Gestion du websocket

L'utilisation d’un WebSocket dans une application mobile pour communiquer avec un ERP permet d’établir une connexion en temps réel, bidirectionnelle et persistante. Cela facilite la transmission instantanée des données entre l’application et le système ERP, sans avoir à multiplier les requêtes HTTP. Ainsi, les notifications par exemple sont reçues immédiatement, améliorant la réactivité de l’application et l’expérience utilisateur tout en optimisant les ressources réseau.

Le noyau de l'application propose un outil pour permettre de recevoir les informations du websocket en temps réel. Il s'agit du hook _useWebSocket_ qui prend en argument la fonction à exécuter dès que l'application reçoit un message de l'ERP.

Voici un exemple d'utilisation de cet outil :

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

Les messages seront reçus au format :

```tsx
interface WebSocketMessage {
  type: MessageType;
  channel: string;
  data?: any;
}
```
