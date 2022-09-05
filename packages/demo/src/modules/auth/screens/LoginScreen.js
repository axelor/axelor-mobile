import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ErrorText,
  LoginButton,
  PasswordInput,
  UrlInput,
  UsernameInput,
} from '@/modules/auth/components/molecules';
import {
  enableScan,
  useScannedValueByKey,
  useScannerSelector,
} from '@/features/scannerSlice';
import {login} from '@/modules/auth/features/authSlice';
import {CameraScanner, Screen, Text} from '@/components/atoms';
import {useThemeColor} from '@/features/themeSlice';
import {Image} from '@/components/molecules';

const urlScanKey = 'login_url';

const LoginScreen = () => {
  const {loading, error} = useSelector(state => state.auth);
  const [camScan, setCamScan] = useState(false);
  const [scanData, setScanData] = useState(null);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(urlScanKey);
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [url, setUrl] = useState(
    'http://wip-api-mobile-preview.cloud-sw1.axelor.io/',
  );
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');

  useEffect(() => {
    if (scannedValue) {
      setUrl(scannedValue);
    } else if (scanData != null && scanData.value != null) {
      setCamScan(false);
      setUrl(scanData.value);
    }
  }, [scanData, scannedValue]);

  return (
    <Screen style={styles.container}>
      <CameraScanner
        isActive={camScan}
        onScan={setScanData}
        onClose={() => setCamScan(false)}
      />
      {!camScan && (
        <View>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={require('../assets/Logo_Axelor.png')}
              imageSize={styles.imageSize}
              defaultIconSize={80}
            />
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
                ? Colors.primaryColor
                : Colors.secondaryColor_dark
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
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <LoginButton
              onPress={() => dispatch(login({url, username, password}))}
              disabled={loading}
            />
          )}
          {error && <ErrorText message={error.message} />}
          <View style={styles.copyright}>
            <Text>{`© 2005 - ${new Date().getFullYear()} Axelor. All Rights Reserved.`}</Text>
          </View>
        </View>
      )}
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
    marginVertical: '15%',
  },
  imageSize: {
    flex: 1,
  },
  copyright: {
    alignSelf: 'center',
    marginTop: '10%',
  },
});

export default LoginScreen;
