---
sidebar_position: 30
description: ''
---

# Error Handling

The **_error_** library provides an `ErrorBoundary` component designed to catch and manage runtime errors in your React or React Native application. When an error occurs, it displays a fallback screen and reports the error to the web ERP.

## Overview

`ErrorBoundary` is a React component that:

- Catches runtime errors within its child component tree.
- Displays a customizable error screen to users.
- Sends error details, including stack trace and user information, to the ERP system via a provided PUT method.
- Handles maintenance-mode errors separately via a custom `MaintenanceError` class.

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

This component is waiting for a few attributes :

- `children`: the part of the application to be wrapped by the `ErrorBoundary` component.
- `ErrorScreen`: a React component that renders a fallback screen when an error is caught. It receives the following props:

  - `errorMessage`: the error message to display.
  - `handleReload`: function that should trigger a reload or recovery logic.
  - `isMaintenance`: boolean indicating whether the error was caused by a maintenance mode (`MaintenanceError`).

- `putMethod`: function used to send error details to the ERP system. It receives:

  - `additionalURL`: The specific endpoint path for submitting the traceback.
  - `data`: A payload containing information about the error, user, and context.

- `userIdfetcher`: asynchronous function that returns the active user's ID. This ID is included in the error report.
- `additionalURL`: string that defines the endpoint for the traceback submission on the ERP system.

## Usage

Wrap your application's root or high-level components with `ErrorBoundary`:

```tsx
<ErrorBoundary
  ErrorScreen={MyErrorScreen}
  putMethod={sendErrorToERP}
  userIdfetcher={fetchUserId}
  additionalURL="/api/tracebacks">
  <App />
</ErrorBoundary>
```

## Maintenance Error Handling

The library provides a dedicated mechanism to detect and handle server maintenance mode. This ensures that users see an appropriate message when the application is temporarily unavailable.

```ts
throw new MaintenanceError('Scheduled maintenance in progress');
```

Throw this error to activate maintenance-specific UI in the `ErrorScreen` component.

The following tools from core package can be used to handle and monitor maintenance mode in a declarative way.

- `maintenanceMiddleware`

A middleware function designed for API error interception:

```ts
export const maintenanceMiddleware = (error: any): any => {
  if (error?.response?.status === 503) {
    maintenanceManager.trigger();
  }

  return Promise.reject(error);
};
```

Attach this middleware to your API client (e.g., Axios) to trigger maintenance mode automatically on receiving a 503 error. This interceptor is automatically added to the axios provider after user connection.

- `useMaintenance`

A React hook that tracks maintenance state:

```ts
const {isMaintenance} = useMaintenance();
```

Use this hook inside components to access live maintenance status and respond accordingly.

- `MaintenanceTrigger`

A component that throws a `MaintenanceError` when maintenance is detected. Include this component near the top of your app (e.g., inside a layout or navigation wrapper). When maintenance is triggered, it automatically throws a `MaintenanceError`, allowing the `ErrorBoundary` to display the maintenance UI.

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
