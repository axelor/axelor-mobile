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
    const {putMethod, userIdfetcher} = this.props;
    userIdfetcher().then(userId => {
      this.setState(state => ({
        ...state,
        tracing: true,
        errorMessage: error.message,
      }));

      putMethod({
        additionalURL: '/ws/rest/com.axelor.exception.db.TraceBack',
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
