import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon, Text, useThemeColor, getCommonStyles} from '@aos-mobile/ui';
import useTranslator from '@/hooks/use-translator';

const LogoutButton = ({onPress}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const button = useMemo(() => getStyles(Colors), [Colors]);
  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[button, commonStyles.button]} onPress={onPress}>
        <Icon name="power-off" />
        <Text style={styles.text}>{I18n.t('Auth_LOGOUT')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    backgroundColor: Colors.secondaryColor,
  });

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 5,
  },
});

export default LogoutButton;
