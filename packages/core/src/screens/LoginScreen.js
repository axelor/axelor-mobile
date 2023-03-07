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

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useThemeColor, Text, Screen} from '@axelor/aos-mobile-ui';
import {
  ErrorText,
  LoginButton,
  LogoImage,
  PasswordInput,
  UrlInput,
  UsernameInput,
} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../features/authSlice';
import {
  enableScan,
  useScannedValueByKey,
  useScannerSelector,
} from '../features/scannerSlice';
import {
  enableCameraScanner,
  useCameraScannerValueByKey,
} from '../features/cameraScannerSlice';

const urlScanKey = 'login_url';

const LoginScreen = ({route}) => {
  const {loading, error} = useSelector(state => state.auth);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(urlScanKey);
  const scanData = useCameraScannerValueByKey(urlScanKey);
  const appVersion = route?.params?.version;
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [url, setUrl] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (scannedValue) {
      if (scannedValue.includes('username') === true) {
        const parseScannnedData = JSON.parse(scannedValue);
        setUrl(parseScannnedData.url);
        setUsername(parseScannnedData.username);
      } else {
        setUrl(scannedValue);
      }
    } else if (scanData?.value != null) {
      if (scanData.value.includes('username') === true) {
        const parseScannnedData = JSON.parse(scanData.value);
        setUrl(parseScannnedData.url);
        setUsername(parseScannnedData.username);
      } else {
        setUrl(scanData.value);
      }
    }
  }, [scanData, scannedValue]);

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <LogoImage url={url} />
            </View>
            <UrlInput
              value={url}
              onChange={setUrl}
              readOnly={loading}
              onScanPress={() => dispatch(enableCameraScanner(urlScanKey))}
              onSelection={() => {
                dispatch(enableScan(urlScanKey));
              }}
              scanIconColor={
                isEnabled && scanKey === urlScanKey
                  ? Colors.primaryColor.background
                  : Colors.secondaryColor_dark.background
              }
            />
            <UsernameInput
              value={username}
              onChange={setUsername}
              readOnly={loading}
            />
            <PasswordInput
              value={password}
              onChange={setPassword}
              readOnly={loading}
            />
            <View>
              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <LoginButton
                  onPress={() => dispatch(login({url, username, password}))}
                  disabled={loading}
                />
              )}
            </View>
            <View>{error && <ErrorText message={error.message} />}</View>
            <View style={styles.copyright}>
              <Text>{`© 2005 - ${new Date().getFullYear()} Axelor. All rights reserved.`}</Text>
              <Text>{`Version ${appVersion}`}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    height: '15%',
    marginTop: Dimensions.get('window').height < 500 ? '15%' : '40%',
    marginBottom: '10%',
  },
  copyright: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
  },
});

export default LoginScreen;
