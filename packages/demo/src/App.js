import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from '@/store';
import Scanner from '@/components/molecules/Scanner/Scanner';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from '@/navigators/RootNavigator';
import ErrorBoundary from './ErrorBoundary';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Colors from '@/types/colors';
import Translator from '@/components/molecules/Translator/Translator';
import {ThemeProvider} from '@aos-mobile/ui';

const App = () => {
  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={[styles.success, styles.toast]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        style={[styles.error, styles.toast]}
        contentContainerStyle={styles.toastContent}
        text1Style={styles.title}
        text2Style={styles.detail}
        text2NumberOfLines={3}
      />
    ),
  };

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Scanner />
        <Translator />
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
  },
  success: {
    borderLeftColor: Colors.ligthTheme.primaryColor,
  },
  toast: {
    width: '90%',
    height: 90,
  },
  toastContent: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 18,
    color: Colors.ligthTheme.text,
    flex: 1,
  },
  detail: {
    fontSize: 16,
    color: Colors.ligthTheme.text,
    flex: 3,
  },
});

export default App;
