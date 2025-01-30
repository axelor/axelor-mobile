/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

interface ErrorBoundaryState {
  hasError: boolean;
  tracing: boolean;
  errorMessage: string;
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
    };
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    const {putMethod, userIdfetcher, additionalURL} = this.props;
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

  render() {
    const {errorScreen} = this.props;
    if (this.state.hasError) {
      return errorScreen({
        errorMessage: this.state.errorMessage,
        onReloadPress: () => this.setState({hasError: false}),
      });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
