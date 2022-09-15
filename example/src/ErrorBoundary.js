import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Button, Screen, Text} from './components/atoms';
import {Image} from './components/molecules';
import {traceError} from './api/traceback-api';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      tracing: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    this.setState(state => ({
      ...state,
      tracing: true,
      errorMessage: error.message,
    }));
    traceError({
      message: error.message,
      cause: errorInfo.componentStack,
      userId: this.props.userId,
    }).finally(() => {
      this.setState(state => ({...state, tracing: false}));
    });
  }

  reloadApp() {
    window.location.reload();
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
            <Image
              resizeMode="contain"
              source={require('./modules/auth/assets/Logo_Axelor.png')}
              generalStyle={styles.imageStyle}
              imageSize={styles.imageSize}
              defaultIconSize={80}
            />
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

const mapStateToProps = state => ({
  userId: state.user?.user?.id,
});

export default connect(mapStateToProps, undefined)(ErrorBoundary);
