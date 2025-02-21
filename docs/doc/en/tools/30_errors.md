---
sidebar_position: 30
description: ''
---

# Error handling

The **_ERROR_** library contains the _ErrorBoundary_ component, which displays an emergency screen in the event of a technical error during execution of the mobile application. This component detects errors and sends a traceback to the web ERP.

In order to perform these actions, the component needs several attributes:

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

The _errorScreen_ attribute must contain the emergency screen in the event of an error, with a button to reload the application. The _putMethod_ attribute must provide a function for the component to perform a put request. The component gives the url to be added to the instance url to access the TraceBack object, as well as the data to be sent to the ERP. The last _userIdFetcher_ attribute is used to obtain the id of the active user. Version 7.0.0 of the application adds the _additionalURL_ attribute, which defines the Traceback object class on the web instance. Indeed, to enable backward compatibility with earlier versions, it is now the router that transmits the route to access Tracebacks.

This component must be placed around the application to detect runtime errors.

This library does not depend on React Native and should be able to be used on classic React projects.
