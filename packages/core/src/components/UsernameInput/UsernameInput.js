import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon, IconInput} from '@aos-mobile/ui';
import useTranslator from '../../i18n/hooks/use-translator';

const UsernameInput = ({value, onChange, readOnly}) => {
  const I18n = useTranslator();

  return (
    <IconInput
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={I18n.t('Auth_Username')}
      leftIconsList={[<Icon name="user" size={17} style={styles.icon} />]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '7%',
    margin: 3,
  },
});

export default UsernameInput;
