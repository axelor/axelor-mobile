import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ErrorText,
  LoginButton,
  PasswordInput,
  UrlInput,
  UsernameInput,
} from '@/modules/auth/components/molecules';
import {login} from '@/modules/auth/features/authSlice';
import {Text} from '@/components/atoms';

const LoginScreen = () => {
  const {loading, error, logged} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <UrlInput value={url} onChange={setUrl} readOnly={loading} />
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
      <LoginButton
        onPress={() => dispatch(login({url, username, password}))}
        disabled={loading}
      />
      {error && <ErrorText message={error.message} />}
      {loading && <ActivityIndicator size="large" />}
      {logged && <Text>Success login :)</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoginScreen;
