import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Screen} from '@/components/atoms';
import {logout} from '@/modules/auth/features/authSlice';
import {LogoutButton} from '../components/molecules';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@/components/molecules';

const UserScreen = () => {
  const dispatch = useDispatch();

  return (
    <Screen style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.imageContainer}>
          <Icon name="user" size={150} />
        </View>
        <Picker title={'Company'} />
        <Picker title={'Stock Location'} />
        <Picker title={'Language'} />
      </View>

      <LogoutButton onPress={() => dispatch(logout())} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 160,
    width: 160,
    height: 160,
    marginBottom: 15,
  },
});

export default UserScreen;
