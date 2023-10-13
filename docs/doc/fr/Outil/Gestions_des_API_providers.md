---
id: API providers
sidebar_position: 4
sidebar_class_name: icon API providers
---

# Gestion des API providers

##  Standard

Afin de communiquer avec l’instance web de l’ERP, les différents modules utilisent *axios* ****qui permet de réaliser des appels API. Lors de la connexion sur l’application, axios va récupérer et sauvegarder l’url de l’instance et les tokens de connexion envoyés par l’ERP afin de pouvoir réaliser les futures requêtes.

Le package core fournit un provider afin de réaliser n’importe quel appel API. Il s’agit de *axiosApiProvider* qui possède quatre types de requêtes :

```tsx
export interface ApiProvider {
  post({url, data}): Promise<any>;
  put({url, data}): Promise<any>;
  get({url}): Promise<any>;
  delete({url}): Promise<any>;
}
```

Pour l’utiliser il suffit de récupérer le provider du package core puis d’appeler la méthode adéquate en fonction du besoin.

Il existe deux autres types de providers qui permettent de généraliser l’utilisation des requêtes mais également permettre à un module de venir modifier ce provider pour utiliser un outil spécifique. Ce système a été mis en place pour les requêtes concernant la récupération de données sur les modèles et pour les requêtes concernant la réalisation d’actions. Chaque provider possède un interface spécifique avec les méthodes nécessaires à son fonctionnement mais également d’un Gateway permettant de switcher entre plusieurs providers en fonction de leur disponibilité.

## Model

Les providers spécialisés pour la récupération de données doivent suivre l’interface suivante afin d’offrir les mêmes fonctionnalités et éviter les erreurs :

```tsx
export interface ModelApi {
	init(data?: any): void;
  isAvailable(): Promise<boolean>;
  getAll({
    modelName,
    page,
  }: {
    modelName: string;
    page: number;
  }): Promise<RequestResponse>;
  get({
    modelName,
    id,
  }: {
    modelName: string;
    id: number;
  }): Promise<RequestResponse>;
  fetch({
    modelName,
    id,
    query,
  }: {
    modelName: string;
    id: number;
    query: ReadOptions;
  }): Promise<RequestResponse>;
  search({
    modelName,
    query,
  }: {
    modelName: string;
    query: Query;
  }): Promise<RequestResponse>;
  insert({
    modelName,
    id,
    data,
  }: {
    modelName: string;
    id: number;
    data: any;
  }): Promise<any>;
  reset(modelName?: string): void;
}
```

La méthode *init* doit permettre d’initialiser le provider si ce dernier nécessite certaines actions : initialiser l’espace de stockage par exemple si les données seront récupérées en local.

La fonction *isAvailable* permet de savoir si le provider est disponible pour utilisation ou non : aucune connexion internet ou autre.

Les fonctions *getAll*, *get*, *fetch* et *search* permettent de récupérer les données sous différentes manières.

La fonction *insert* permet de venir modifier les données enregistrées pour l’utilisation hors-ligne.

La fonction *reset* permet de venir réinitialiser les données enregistrées pour tous les modèles ou bien seulement pour le modèle renseigné en argument.

Le package core propose par défaut une implémentation de cette interface qui utilise les web services AOP, il s’agit de la classe `AopModelApi`.

Une deuxième implémentation a été construite avec un fonctionnement différent puisque cette dernière prend en argument une liste de ModelApi en argument de son constructeur. Il s’agit du `GatewayModelApi` qui permet de switcher entre plusieurs implémentations de l’interface en utilisant le premier provider disponible grâce à la méthode *isAvailable*. L’ordre de priorité des provider est celui de sa définition dans le constructeur.

Afin d’uniformiser l’utilisation de toutes les implémentations de l’interface *ModelApi*, il existe un provideur global qui possède en attribut le ModelApi courant avec deux méthodes : une pour récupérer le provider et une autre pour venir le modifier. Dans le but de faciliter son utilisation, trois fonctions ont été créées :

- `useModelApi(): ModelApi` et `getModelApi(): ModelApi` permettent de récupérer le ModelApi
- `registerModelApi(modelApi: ModelApi)` permet de venit modifier le ModelApi actuellement enregistré.

Par défaut, ce provider est paramétré avec le *AopModelApi*.

Ainsi, lors de l’utilisation d’un Gateway, il faut venir enregistrer le nouveau ModelApi.

```tsx
registerModelApi(new GatewayModelApi(modelApi1, modelApi2, ...));
```

## Action

Les providers spécialisés pour la réalisation d’actions doivent suivre l’interface suivante afin d’offrir les mêmes fonctionnalités et éviter les erreurs :

```tsx
type Method = 'put' | 'post';

export type ActionRequest = {
  url: string;
  method: Method;
  body: any;
  description: string;
};

export interface ActionApi {
	isAvailable(): Promise<boolean>;
  send(request: ActionRequest): Promise<void>;
  synchronize(): Promise<void>;
}
```

La fonction *isAvailable* permet de savoir si le provider est disponible pour utilisation ou non : aucune connexion internet ou autre. La fonction *send* permet de réaliser la requête. La fonction *synchronize* permet de synchroniser les requêtes avec le web.

Le package core propose par défaut une implémentation de cette interface qui utilise les web services AOS, il s’agit de la classe `AosActionApi`.

Une deuxième implémentation a été construite avec un fonctionnement différent puisque cette dernière prend en argument une liste de *ActionApi* en argument de son constructeur. Il s’agit du `GatewayActionApi` qui permet de switcher entre plusieurs implémentations de l’interface en utilisant le premier provider disponible grâce à la méthode *isAvailable*. L’ordre de priorité des provider est celui de sa définition dans le constructeur.

Afin d’uniformiser l’utilisation de toutes les implémentations de l’interface *ActionApi*, il existe un provideur global qui possède en attribut le *ActionApi* courant avec deux méthodes : une pour récupérer le provider et une autre pour venir le modifier. Dans le but de faciliter son utilisation, trois fonctions ont été créées :

- `useActionApi(): ActionApi` et `getActionApi(): ActionApi` permettent de récupérer le *ActionApi*
- `registerActionApi(actionApi: ActionApi)` permet de venit modifier le *ActionApi* actuellement enregistré.

Par défaut, ce provider est paramétré avec le *AosActionApi*.

Ainsi, lors de l’utilisation d’un Gateway, il faut venir enregistrer le nouveau ModelApi.

```tsx
registerActionApi(new GatewayActionApi(actionApi1, actionApi2, ...));
```
