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
import {ActivityIndicator, StyleSheet, View, Dimensions} from 'react-native';
import {useThemeColor, Text, Screen, ScrollView} from '@axelor/aos-mobile-ui';
import {
  CameraScanner,
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

const urlScanKey = 'login_url';

const LoginScreen = ({route}) => {
  const {loading, error} = useSelector(state => state.auth);
  const [camScan, setCamScan] = useState(false);
  const [scanData, setScanData] = useState(null);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(urlScanKey);
  const appVersion = route?.params?.version;
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [url, setUrl] = useState(
    'http://wip-api-mobile-preview.cloud-sw1.axelor.io/',
  );
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');

  useEffect(() => {
    if (scannedValue) {
      if (scannedValue.includes('username') === true) {
        const parseScannnedData = JSON.parse(scannedValue);
        setUrl(parseScannnedData.url);
        setUsername(parseScannnedData.username);
      } else {
        setUrl(scannedValue);
      }
    } else if (scanData != null && scanData.value != null) {
      if (scanData.value.includes('username') === true) {
        const parseScannnedData = JSON.parse(scanData.value);
        setUrl(parseScannnedData.url);
        setUsername(parseScannnedData.username);
        setCamScan(false);
      } else {
        setUrl(scanData.value);
        setCamScan(false);
      }
    }
  }, [scanData, scannedValue]);

  return (
    <Screen
      style={styles.container}
      fixedItems={
        <View style={styles.copyright}>
          <Text>{`© 2005 - ${new Date().getFullYear()} Axelor. All rights reserved.`}</Text>
          <Text>{`Version ${appVersion}`}</Text>
        </View>
      }>
      <CameraScanner
        isActive={camScan}
        onScan={setScanData}
        onClose={() => setCamScan(false)}
      />
      <ScrollView>
        <View style={styles.imageContainer}>
          <LogoImage url={url} />
        </View>
        <UrlInput
          value={url}
          onChange={setUrl}
          readOnly={loading}
          onScanPress={() => setCamScan(true)}
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
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <LoginButton
              onPress={() => dispatch(login({url, username, password}))}
              disabled={loading}
            />
          )}
        </View>
        <View style={styles.errorContainer}>
          {error && <ErrorText message={error.message} />}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    height: '15%',
    marginTop: Dimensions.get('window').height < 500 ? '25%' : '50%',
    marginBottom: '10%',
  },
  imageSize: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
  },
  copyright: {
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
});

export default LoginScreen;
