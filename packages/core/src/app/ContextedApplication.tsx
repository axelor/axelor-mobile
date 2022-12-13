import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {
  LoadingIndicator,
  HeaderIndicator,
  ThemeColors,
  useThemeColor,
} from '@aos-mobile/ui';
import {ErrorBoundary} from '@aos-mobile/error';
import RootNavigator from './RootNavigator';
import {Module} from './Module';
import Translator from '../i18n/component/Translator';
import {getActiveUserId} from '../api/login-api';
import ErrorScreen from '../screens/ErrorScreen';
import {Scanner} from '../components';

interface ContextedApplicationProps {
  modules: [Module];
  mainMenu: string;
  version: string;
}

const ContextedApplication = ({
  modules,
  mainMenu,
  version,
}: ContextedApplicationProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

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

  const traceBackPutMethod = useCallback(({additionalURL, data}) => {
    return axios.put(additionalURL, {data: data});
  }, []);

  return (
    <>
      <Scanner />
      <Translator />
      <ErrorBoundary
        errorScreen={ErrorScreen}
        userIdfetcher={getActiveUserId}
        putMethod={traceBackPutMethod}>
        <NavigationContainer>
          <HeaderIndicator />
          <LoadingIndicator />
          <RootNavigator
            modules={modules}
            mainMenu={mainMenu}
            version={version}
          />
        </NavigationContainer>
      </ErrorBoundary>
      <Toast config={toastConfig} />
    </>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    error: {
      borderLeftColor: Colors.errorColor.background,
    },
    success: {
      borderLeftColor: Colors.successColor.background,
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
      color: Colors.text,
      flex: 1,
    },
    detail: {
      fontSize: 16,
      color: Colors.text,
      flex: 3,
    },
  });

export default ContextedApplication;
