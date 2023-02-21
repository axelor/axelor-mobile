/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import {
  LoadingIndicator,
  HeaderIndicator,
  ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {ErrorBoundary} from '@axelor/aos-mobile-error';
import RootNavigator from './RootNavigator';
import {Module} from './Module';
import Translator from '../i18n/component/Translator';
import {getActiveUserId} from '../api/login-api';
import ErrorScreen from '../screens/ErrorScreen';
import {Camera, CameraScanner, Scanner} from '../components';

interface proxy {
  defaultUrl: string;
  defaultUsername: string;
  defaultPassword: string;
}

interface releaseConfig {
  url: string;
  showUrlInput: boolean;
}

interface instanceConfig {
  testInstanceConfig: proxy;
  releaseInstanceConfig: releaseConfig;
}

interface ContextedApplicationProps {
  modules: Module[];
  mainMenu?: string;
  version: string;
  showModulesSubtitle: boolean;
  configuration?: instanceConfig;
}

const ContextedApplication = ({
  modules,
  mainMenu,
  version,
  showModulesSubtitle = false,
  configuration,
}: ContextedApplicationProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const [, setRefresh] = useState(false);

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
      <Camera />
      <CameraScanner />
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
            showModulesSubtitle={showModulesSubtitle}
            onRefresh={() => setRefresh(_current => !_current)}
            configuration={configuration}
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
