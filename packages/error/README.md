<h1 align="center">@axelor/aos-mobile-error</h1>

<div align="center">
    <img src="https://i.imgur.com/KJAAFlT.png" width="30%"/>
</div>

## Presentation

This package was developed for the [Axelor Open Mobile](https://github.com/axelor/axelor-mobile) application.

It only contains an ErrorBoundary component compatible with all React v18.2.x projects linked to an ERP based on [Axelor Open Platform](https://github.com/axelor/axelor-open-platform).

## Usage

Install the library :

```bash
yarn add @axelor/aos-mobile-error
```

All you have to do here is to wrap your application component with the ErrorBoundary component. It will catch all render errors and display the errorScreen provided to allow user to reload the application.

The component needs the following props: 
* errorScreen : screen to be displayed when an error is detected
```typescript
errorScreen: ({errorMessage, onReloadPress}) => React.ReactNode;
```
* userIdfetcher : function to fetch user information
```typescript
userIdfetcher: () => Promise<any>;
```
* putMethod : function to perform a PUT request to the server in order to inform it of the error
```typescript
putMethod: (fetchOptions: {additionalURL: string; data: any}) => Promise<any>;
```

## Developpment

This package is developed as part of the Axelor Open Mobile application. To contribute, please go to the [Github project](https://github.com/axelor/axelor-mobile) and follow the guidelines. You will also find an installation guide to help you configure your environment.