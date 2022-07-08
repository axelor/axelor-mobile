import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon, Text} from '@/components/atoms';
import {useThemeColor} from '@/features/themeSlice';

const LogoutButton = ({onPress}) => {
  const Colors = useThemeColor();
  const button = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={button} onPress={onPress}>
        <Icon name="power-off" />
        <Text style={styles.text}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 5,
    marginVertical: 10,
    elevation: 2,
    width: '40%',
    height: 40,
    backgroundColor: Colors.secondaryColor,
    borderRadius: 35,
  });

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15%',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 5,
  },
});

export default LogoutButton;
