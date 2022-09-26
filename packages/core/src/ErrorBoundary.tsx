import React from 'react';
//import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Button, Screen, Text} from '@aos-mobile/ui';
import {traceError} from './api/traceback-api';
import {createSelector} from '@reduxjs/toolkit';

export const selectUserId = createSelector(
  state => state?.user,
  userState => userState.user.id,
);

interface ErrorBoundaryProps {
  children: React.ReactNode;
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
    const userId = 1; //useSelector(selectUserId);
    this.setState(state => ({
      ...state,
      tracing: true,
      errorMessage: error.message,
    }));
    traceError({
      message: error.message,
      cause: errorInfo.componentStack,
      userId: userId,
    }).finally(() => {
      this.setState(state => ({...state, tracing: false}));
    });
  }

  reloadApp() {
    (window as any).location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Screen
          fixedItems={
            <Button
              title="RELOAD SCREEN"
              onPress={() => this.setState({hasError: false})}
            />
          }>
          <View style={styles.container}>
            <Text style={styles.text}>{this.state.errorMessage}</Text>
          </View>
        </Screen>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '92%',
  },
  imageSize: {
    height: 100,
    width: '100%',
  },
  imageStyle: {
    marginHorizontal: 50,
    marginVertical: '10%',
  },
  text: {
    marginHorizontal: 10,
  },
});

export default ErrorBoundary;
