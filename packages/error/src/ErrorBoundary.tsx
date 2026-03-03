/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React from 'react';

const TECHNICAL_ABNORMALITY = 0;
const CONFIGURATION_PROBLEM = 4;

export class MaintenanceError extends Error {
  constructor(message = 'The server is under maintenance.') {
    super(message);
    this.name = 'MaintenanceError';
  }
}

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

interface ErrorBoundaryState {
  hasError: boolean;
  tracing: boolean;
  errorMessage: string;
  maintenance: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      tracing: false,
      errorMessage: '',
      maintenance: false,
    };
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: any, errorInfo: any) {
    const {putMethod, userIdfetcher, additionalURL} = this.props;

    if (error instanceof MaintenanceError) {
      this.setState(state => ({
        ...state,
        hasError: true,
        maintenance: true,
        errorMessage: error.message,
      }));
      return;
    }

    userIdfetcher().then(userId => {
      this.setState(state => ({
        ...state,
        tracing: true,
        errorMessage: error.message,
      }));

      putMethod({
        additionalURL,
        data: {
          origin: 'mobile app',
          typeSelect: TECHNICAL_ABNORMALITY,
          categorySelect: CONFIGURATION_PROBLEM,
          date: new Date(),
          exception: error.message,
          message: error.message,
          cause: JSON.stringify(errorInfo.componentStack),
          internalUser: {id: userId},
        },
      }).finally(() => this.setState(state => ({...state, tracing: false})));
    });
  }

  reloadApp() {
    (window as any).location.reload();
  }

  resetState() {
    this.setState({hasError: false});
  }

  render() {
    const {children, ErrorScreen} = this.props;
    const {hasError, errorMessage, maintenance} = this.state;

    if (hasError) {
      return (
        <ErrorScreen
          errorMessage={errorMessage}
          handleReload={() => this.resetState()}
          isMaintenance={maintenance}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
