import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from '@/store';
import Scanner from '@/components/molecules/Scanner/Scanner';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '@/navigators/RootNavigator';
import ErrorBoundary from './ErrorBoundary';
import Toast, {ErrorToast} from 'react-native-toast-message';
import Colors from '@/types/colors';
import {ThemeProvider} from './themeStore';

const App = () => {
  const toastConfig = {
    error: props => (
      <ErrorToast
        {...props}
        style={[styles.error, styles.toast]}
        text1Style={styles.title}
        text2Style={styles.detail}
      />
    ),
  };

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Scanner />
        <ErrorBoundary>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ErrorBoundary>
        <Toast config={toastConfig} />
      </ThemeProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  error: {
    borderLeftColor: Colors.ligthTheme.errorColor,
    width: '90%',
  },
  title: {
    fontSize: 18,
    color: Colors.ligthTheme.text,
  },
  detail: {
    fontSize: 16,
    color: Colors.ligthTheme.text,
  },
});

export default App;
