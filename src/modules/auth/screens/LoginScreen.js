import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ErrorText,
  LoginButton,
  PasswordInput,
  UrlInput,
  UsernameInput,
} from '@/modules/auth/components/molecules';
import {login} from '@/modules/auth/features/authSlice';
import {Screen, Text} from '@/components/atoms';

const LoginScreen = () => {
  const {loading, error, logged} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [url, setUrl] = useState('https://test.axelor.com/open-suite-wip/');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('@axadmin');

  return (
    <Screen style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../Logo_Axelor.png')} style={styles.image} />
      </View>
      <UrlInput
        style={[styles.inputContainer]}
        value={url}
        onChange={setUrl}
        readOnly={loading}
      />
      <UsernameInput
        style={[styles.inputContainer]}
        value={username}
        onChange={setUsername}
        readOnly={loading}
      />
      <PasswordInput
        style={[styles.inputContainer]}
        value={password}
        onChange={setPassword}
        readOnly={loading}
      />
      <LoginButton
        onPress={() => dispatch(login({url, username, password}))}
        disabled={loading}
      />
      {error && <ErrorText message={error.message} />}
      {loading && <ActivityIndicator size="large" />}
      {logged && <Text>Success login :)</Text>}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    height: '15%',
    marginBottom: '25%',
  },
  image: {
    width: '80%',
    height: '100%',
  },
});

export default LoginScreen;
