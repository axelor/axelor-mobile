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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useThemeColor,
  Text,
  Screen,
  KeyboardAvoidingScrollView,
} from '@axelor/aos-mobile-ui';
import {
  ErrorText,
  LoginButton,
  LogoImage,
  PasswordInput,
  UrlInput,
  UsernameInput,
} from '../components';
import {isUrlValid, login} from '../features/authSlice';
import {
  useScannedValueByKey,
  useScannerSelector,
} from '../features/scannerSlice';
import {useCameraScannerValueByKey} from '../features/cameraScannerSlice';
import {
  useScanActivator,
  useScannerDeviceActivator,
} from '../hooks/use-scan-activator';
import {checkNullString} from '../utils';
import {sessionStorage, useSessions, getStorageUrl} from '../sessions';
import DeviceInfo from 'react-native-device-info';

const urlScanKey = 'login_url';

const LoginScreen = ({route}) => {
  const appVersion = route?.params?.version;
  const testInstanceConfig = route?.params?.testInstanceConfig;
  const releaseInstanceConfig = route?.params?.releaseInstanceConfig;
  const logoFile = route?.params?.logoFile;
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {loading, error, baseUrl} = useSelector(state => state.auth);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(urlScanKey);
  const scanData = useCameraScannerValueByKey(urlScanKey);
  const {enable: onScanPress} = useScanActivator(urlScanKey);
  const {enable: enableScanner} = useScannerDeviceActivator(urlScanKey);
  const {sessionActive} = useSessions();

  const urlStorage = useMemo(() => getStorageUrl(), []);

  const modeDebug = useMemo(() => __DEV__, []);

  const showUrlInput = useMemo(() => {
    if (modeDebug) {
      return true;
    } else {
      return releaseInstanceConfig?.showUrlInput || true;
    }
  }, [modeDebug, releaseInstanceConfig?.showUrlInput]);

  const defaultUrl = useMemo(() => {
    if (urlStorage != null) {
      return urlStorage;
    }

    if (baseUrl != null) {
      return baseUrl;
    }

    if (modeDebug) {
      return testInstanceConfig?.defaultUrl;
    }

    return releaseInstanceConfig?.url;
  }, [
    urlStorage,
    baseUrl,
    modeDebug,
    releaseInstanceConfig?.url,
    testInstanceConfig?.defaultUrl,
  ]);

  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const [url, setUrl] = useState(defaultUrl || '');
  const [username, setUsername] = useState(
    modeDebug ? testInstanceConfig?.defaultUsername : '',
  );
  const [password, setPassword] = useState(
    modeDebug ? testInstanceConfig?.defaultPassword : '',
  );
  const [isMounted, setIsMounted] = useState(false);

  const parseQrCode = useCallback(scanValue => {
    if (scanValue.includes('username') === true) {
      const parseScannnedData = JSON.parse(scanValue);
      setUrl(parseScannnedData.url);
      setUsername(parseScannnedData.username);
    } else {
      setUrl(scanValue);
    }
  }, []);

  const disabledLogin = useMemo(
    () =>
      checkNullString(url) ||
      checkNullString(username) ||
      checkNullString(password) ||
      loading,
    [loading, password, url, username],
  );

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (scannedValue) {
      parseQrCode(scannedValue);
    } else if (scanData?.value != null) {
      parseQrCode(scanData?.value);
    }
  }, [parseQrCode, scanData, scannedValue]);

  const onPressLogin = useCallback(() => {
    dispatch(login({url, username, password})).then(res => {
      if (res.error == null && error == null) {
        if (error == null && isMounted) {
          sessionStorage.addSession({
            session: {
              sessionId: `session-${Date.now()}`,
              id: DeviceInfo.getApplicationName(),
              url: url,
              username: username,
              isActive: true,
              isDefault: true,
            },
          });
        }
      }
    });
  }, [dispatch, password, url, username, error, isMounted]);

  const handleTestUrl = useCallback(() => {
    dispatch(isUrlValid({url}));
  }, [dispatch, url]);

  useEffect(() => {
    if (sessionActive != null) {
      setUrl(sessionActive.url);
      setUsername(sessionActive.username);
      setPassword(modeDebug ? testInstanceConfig?.defaultPassword : '');
    }
  }, [modeDebug, sessionActive, testInstanceConfig?.defaultPassword]);

  return (
    <Screen>
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 0, android: 0}}
        style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <LogoImage url={url} logoFile={logoFile} />
          </View>
          <ErrorText error={error} style={styles.card} />
          {showUrlInput && (
            <UrlInput
              value={url}
              onChange={setUrl}
              readOnly={loading}
              onScanPress={onScanPress}
              onSelection={enableScanner}
              onEndFocus={handleTestUrl}
              scanIconColor={
                isEnabled && scanKey === urlScanKey
                  ? Colors.primaryColor.background
                  : Colors.secondaryColor_dark.background
              }
              showRequiredFields={showRequiredFields}
            />
          )}
          <UsernameInput
            value={username}
            onChange={setUsername}
            readOnly={loading}
            showScanIcon={!showUrlInput}
            onScanPress={onScanPress}
            onSelection={enableScanner}
            scanIconColor={
              isEnabled && scanKey === urlScanKey
                ? Colors.primaryColor.background
                : Colors.secondaryColor_dark.background
            }
            showRequiredFields={showRequiredFields}
          />
          <PasswordInput
            value={password}
            onChange={setPassword}
            readOnly={loading}
            showRequiredFields={showRequiredFields}
          />
          <View>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <LoginButton
                onPress={onPressLogin}
                onDisabledPress={() => setShowRequiredFields(true)}
                disabled={disabledLogin}
              />
            )}
          </View>
          <View style={styles.copyright}>
            <Text>{`© 2005 - ${new Date().getFullYear()} Axelor. All rights reserved.`}</Text>
            <Text>{`Version ${appVersion}`}</Text>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.95,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    height: '15%',
    marginTop: Dimensions.get('window').height < 500 ? '10%' : '40%',
    marginBottom: '10%',
  },
  copyright: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
  },
  card: {
    width: '90%',
  },
  scroll: {
    height: null,
  },
});

export default LoginScreen;
