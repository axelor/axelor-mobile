---
sidebar_position: 30
description: ''
---

# Gestion des erreurs

La bibliothèque **_error_** fournit un composant `ErrorBoundary` conçu pour intercepter et gérer les erreurs d'exécution dans votre application React ou React Native. Lorsqu'une erreur survient, elle affiche un écran de secours et envoie les détails de l’erreur à l’ERP web.

## Vue d’ensemble

`ErrorBoundary` est un composant React qui :

- Intercepte les erreurs d’exécution dans l’arbre de composants enfants.
- Affiche un écran d’erreur personnalisable pour les utilisateurs.
- Envoie les détails de l’erreur, y compris la stack trace et les informations de l’utilisateur, au système ERP via une méthode PUT fournie.
- Gère les erreurs liées au mode maintenance via une classe `MaintenanceError` dédiée.

```tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  ErrorScreen: React.ComponentType<{
    errorMessage: string;
    handleReload: () => void;
    isMaintenance?: boolean;
  }>;
  putMethod: (fetchOptions: {additionalURL: string; data: any}) => Promise<any>;
  userIdfetcher: () => Promise<any>;
  additionalURL: string;
}
```

Ce composant attend les attributs suivants :

- `children` : la partie de l’application à encapsuler dans le composant `ErrorBoundary`.
- `ErrorScreen` : un composant React qui affiche un écran de secours lorsqu'une erreur est interceptée. Il reçoit les props suivantes :

  - `errorMessage` : le message d’erreur à afficher.
  - `handleReload` : une fonction qui déclenche un rechargement ou une logique de récupération.
  - `isMaintenance` : un booléen indiquant si l’erreur est due à un mode maintenance (`MaintenanceError`).

- `putMethod` : fonction utilisée pour envoyer les détails de l’erreur au système ERP. Elle reçoit :

  - `additionalURL` : le chemin d’endpoint spécifique pour l’envoi du traceback.
  - `data` : une charge utile contenant les informations sur l’erreur, l’utilisateur, et le contexte.

- `userIdfetcher` : fonction asynchrone qui retourne l’ID de l’utilisateur actif. Cet ID est inclus dans le rapport d’erreur.
- `additionalURL` : chaîne de caractères définissant l’endpoint de soumission du traceback dans l’ERP.

## Utilisation

Encapsulez la racine ou les composants de haut niveau de votre application avec `ErrorBoundary` :

```tsx
<ErrorBoundary
  ErrorScreen={MyErrorScreen}
  putMethod={sendErrorToERP}
  userIdfetcher={fetchUserId}
  additionalURL="/api/tracebacks">
  <App />
</ErrorBoundary>
```

## Gestion du mode maintenance

La bibliothèque fournit un mécanisme dédié pour détecter et gérer les périodes de maintenance du serveur. Cela garantit que les utilisateurs voient un message approprié lorsque l'application est temporairement indisponible.

```ts
throw new MaintenanceError('Maintenance planifiée en cours');
```

Lancez cette erreur pour activer une interface utilisateur spécifique à la maintenance via le composant `ErrorScreen`.

Les outils suivants du package core permettent de gérer et de surveiller le mode maintenance de manière déclarative :

- `maintenanceMiddleware`

Un middleware conçu pour intercepter les erreurs des appels API :

```ts
export const maintenanceMiddleware = (error: any): any => {
  if (error?.response?.status === 503) {
    maintenanceManager.trigger();
  }

  return Promise.reject(error);
};
```

Ajoutez ce middleware à votre client API (par exemple, Axios) pour activer automatiquement le mode maintenance lors de la réception d’une erreur 503. Cet intercepteur est automatiquement ajouté au fournisseur Axios après la connexion de l’utilisateur.

- `useMaintenance`

Un hook React permettant de suivre l’état de maintenance :

```ts
const {isMaintenance} = useMaintenance();
```

Utilisez ce hook dans vos composants pour accéder à l’état de maintenance en temps réel et adapter votre logique en conséquence.

- `MaintenanceTrigger`

Un composant qui déclenche une `MaintenanceError` lorsqu’un état de maintenance est détecté. Placez ce composant au sommet de votre application (par exemple, dans un layout ou un wrapper de navigation). Lorsque la maintenance est activée, il lance automatiquement une `MaintenanceError`, ce qui permet à `ErrorBoundary` d’afficher l’interface de maintenance.

```tsx
<ErrorBoundary
  ErrorScreen={MyErrorScreen}
  putMethod={sendErrorToERP}
  userIdfetcher={fetchUserId}
  additionalURL="/api/tracebacks">
  <MaintenanceTrigger />
  <App />
</ErrorBoundary>
```
