---
id: API providers
sidebar_position: 4
sidebar_class_name: icon API providers
---

## API provider management

### ***Standard***

To communicate with the ERP web instance, the various modules use *axios* to make API calls. When connecting to the application, axios will retrieve and save the instance's url and the connection tokens sent by the ERP, so that future requests can be made.

The core package provides a provider for any API call. This is *axiosApiProvider*, which has four types of request:

```tsx
export interface ApiProvider {
  post({url, data}): Promise<any>;
  put({url, data}): Promise<any>;
  get({url}): Promise<any>;
  delete({url}): Promise<any>;
}
```

To use it, simply retrieve the provider from the core package and call the appropriate method according to your needs.

There are two other types of provider that allow you to generalize the use of queries, but also to enable a module to modify this provider to use a specific tool. This system has been implemented for model data retrieval queries and for action execution queries. Each provider has a specific interface with the methods required for its operation, as well as a gateway for switching between several providers depending on their availability.

### Model

Specialized data recovery providers must follow the following interface in order to offer the same functionality and avoid errors:

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

The *init* method is used to initialize the provider if it requires certain actions: initialize the storage space, for example, if data will be retrieved locally.

The *isAvailable* function lets you know whether the provider is available for use or not: no Internet connection or other.

The *getAll*, *get*, *fetch* and *search* functions can be used to retrieve data in different ways.

The *insert* function is used to modify stored data for offline use.

The *reset* function can be used to reset saved data for all models, or just for the model specified as an argument.

The core package comes with a default implementation of this interface using AOP web services, the `AopModelApi` class.

A second implementation has been built, which works in a different way: it takes a list of ModelApi as an argument to its constructor. This is the `GatewayModelApi`, which allows you to switch between several implementations of the interface using the first available provider thanks to the *isAvailable* method. Provider priority is defined in the constructor.

In order to standardize the use of all implementations of the *ModelApi* interface, there is a global provider which has the current ModelApi as an attribute, with two methods: one for retrieving the provider and another for modifying it. To facilitate its use, three functions have been created:

- `useModelApi(): ModelApi` and `getModelApi(): ModelApi` retrieve the ModelApi
- `registerModelApi(modelApi: ModelApi)` allows you to modify the currently registered ModelApi.

By default, this provider is set to *AopModelApi*.

So, when using a Gateway, you need to register the new ModelApi.

```tsx
registerModelApi(new GatewayModelApi(modelApi1, modelApi2, ...));
```

### Action

Specialized providers for actions must follow the following interface in order to offer the same functionality and avoid errors:

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

The *isAvailable* function lets you know whether the provider is available for use or not: no Internet connection or other. The *send* function executes the request. The *synchronize* function synchronizes requests with the web.

The core package offers a default implementation of this interface using AOS web services, the `AosActionApi` class.

A second implementation has been built, which works in a different way: it takes a list of *ActionApi* as an argument to its constructor. This is the `GatewayActionApi`, which allows you to switch between several implementations of the interface using the first available provider thanks to the *isAvailable* method. Provider priority is defined in the constructor.

To standardize the use of all implementations of the *ActionApi* interface, there is a global provider which has the current *ActionApi* as an attribute, with two methods: one for retrieving the provider and another for modifying it. To facilitate its use, three functions have been created:

- `useActionApi(): ActionApi` and `getActionApi(): ActionApi` retrieve the *ActionApi*.
- `registerActionApi(actionApi: ActionApi)` allows you to modify the currently registered *ActionApi*.

By default, this provider is set to *AosActionApi*.

So, when using a Gateway, you need to register the new ActionApi.

```tsx
registerActionApi(new GatewayActionApi(actionApi1, actionApi2, ...));
```
