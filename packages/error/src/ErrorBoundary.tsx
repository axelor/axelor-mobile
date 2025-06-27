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
import axios from 'axios';

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
  errorScreen: ({
    errorMessage,
    onReloadPress,
  }: {
    errorMessage: string;
    onReloadPress: () => any;
  }) => React.ReactNode;

  maintenanceScreen?: React.ComponentType<{onCheckStatus: () => void}>;

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
      this.setState({
        hasError: true,
        maintenance: true,
        errorMessage: error.message,
      });
      return;
    }

    userIdfetcher().then(userId => {
      this.setState({
        tracing: true,
        errorMessage: error.message,
        maintenance: false,
      });

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
      }).finally(() => this.setState({tracing: false}));
    });
  }

  handleCheckStatus = () => {
    axios
      .get('/ws/public/app/info/')
      .then(() => {
        this.setState({
          hasError: false,
          maintenance: false,
          errorMessage: '',
        });
      })
      .catch(e => {
        console.log('Still under maintenance', e?.response?.status);
      });
  };

  render() {
    const {children, errorScreen, maintenanceScreen} = this.props;
    const {hasError, errorMessage, maintenance} = this.state;

    if (hasError) {
      if (maintenance && maintenanceScreen) {
        const MaintenanceScreen = maintenanceScreen;
        return <MaintenanceScreen onCheckStatus={this.handleCheckStatus} />;
      }

      return errorScreen({
        errorMessage,
        onReloadPress: () => this.setState({hasError: false}),
      });
    }

    return children;
  }
}

export default ErrorBoundary;
