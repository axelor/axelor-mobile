import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, IconInput} from '@aos-mobile/ui';
import useTranslator from '../../i18n/hooks/use-translator';

const PasswordInput = ({style, value, onChange, readOnly}) => {
  const [visible, setVisible] = useState(false);
  const I18n = useTranslator();

  return (
    <IconInput
      style={style}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      secureTextEntry={!visible}
      placeholder={I18n.t('Auth_Password')}
      leftIconsList={[<Icon name="key" size={15} style={styles.icon} />]}
      rightIconsList={[
        <Icon
          name={visible ? 'eye' : 'eye-slash'}
          size={15}
          touchable={true}
          onPress={() => setVisible(!visible)}
          style={styles.icon}
        />,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '7%',
    margin: 3,
  },
});

export default PasswordInput;
