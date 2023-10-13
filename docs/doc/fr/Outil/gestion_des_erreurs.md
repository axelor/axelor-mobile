---
id: Gestions des erreurs
sidebar_position: 3
sidebar_class_name: icon gestions des erreurs
---


# Gestion des erreurs

La lib raire ***ERROR*** contient le composant *ErrorBoundary* qui permet d’afficher un écran de secours en cas d’erreur technique lors de l’exécution de l’application mobile. Ce composant détecte les erreurs et envoie un traceback sur l’ERP web.

Afin de réaliser ces actions, le composant a besoin de plusieurs attributs :

```tsx
interface ErrorBoundaryProps {
	children: React.ReactNode;
  errorScreen: ({
    errorMessage,
    onReloadPress,
  }: {
    errorMessage: string;
    onReloadPress: () => any;
  }) => React.ReactNode;
  putMethod: (fetchOptions: {additionalURL: string; data: any}) => Promise<any>;
  userIdfetcher: () => Promise<any>;
  additionalURL: string;
}
```

L’attribut *errorScreen* doit contenir l’écran de secours en cas d’erreur avec un bouton permettant de reload l’application. L’attribut *putMethod* doit fournit un fonction au composant lui permettant de réaliser une requête put. Le composant donne en aguments de cette fonction l’url à ajouter à l’url d’instance pour accéder à l’objet TraceBack ainsi que les données à envoyer à l’ERP. Le dernier attribut *userIdFetcher* permet d’obtenir l’id de l’utilisateur actif. La version 7.0.0 de l’application a ajouté l’attribut *additionalURL* qui permet de venir définir la classe de l’objet Traceback sur l’instance web. En effet, pour permettre la rétrocompatibilité avec les versions inférieures, c’est désormais le router qui transmet la route pour accéder aux Tracebacks.

Ce composant doit être placé autour de l’application afin de détecter les erreurs à l’exécution.

Cette librairie ne dépend pas de React Native et doit pouvoir être utilisée sur des projets React classique.