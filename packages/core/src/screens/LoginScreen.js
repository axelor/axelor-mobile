import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useThemeColor, Text, Screen, Image} from '@aos-mobile/ui';
import {
  ErrorText,
  LoginButton,
  PasswordInput,
  UrlInput,
  UsernameInput,
} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../features/authSlice';

const urlScanKey = 'login_url';

const LoginScreen = () => {
  const {loading, error} = useSelector(state => state.auth);
  const isEnabled = false;
  const scanKey = 'login_url';
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [url, setUrl] = useState(
    'http://wip-api-mobile-preview.cloud-sw1.axelor.io/',
  );
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');

  return (
    <Screen style={styles.container}>
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
          onScanPress={() => console.log('setCamScan(true)')}
          onSelection={() => {
            console.log('dispatch(enableScan(urlScanKey))');
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
