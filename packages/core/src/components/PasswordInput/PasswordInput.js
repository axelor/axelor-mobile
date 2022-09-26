import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Input, useThemeColor} from '@aos-mobile/ui';
import useTranslator from '../../i18n/hooks/use-translator';

const PasswordInput = ({style, value, onChange, readOnly}) => {
  const [visible, setVisible] = useState(false);
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const container = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={container}>
      <Input
        style={[styles.input, style]}
        value={value}
        onChange={onChange}
        placeholder={I18n.t('Auth_Password')}
        secureTextEntry={!visible}
        readOnly={readOnly}
      />
      <Icon
        name={visible ? 'eye' : 'eye-slash'}
        size={15}
        touchable={true}
        onPress={() => setVisible(!visible)}
        style={styles.action}
      />
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    borderColor: Colors.secondaryColor,
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginHorizontal: 20,
    marginVertical: 6,
  });

const styles = StyleSheet.create({
  input: {
    width: '90%',
  },
  action: {
    width: '10%',
    margin: 3,
  },
});

export default PasswordInput;
