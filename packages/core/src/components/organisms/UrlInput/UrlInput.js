import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon, IconInput, useThemeColor} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';

const UrlInput = ({
  style,
  value,
  onChange,
  readOnly,
  onScanPress,
  onSelection = () => {},
  scanIconColor,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <IconInput
      style={style}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      onSelection={onSelection}
      placeholder={I18n.t('Auth_URL')}
      leftIconsList={[<Icon name="link" size={17} style={styles.icon} />]}
      rightIconsList={[
        <Icon
          name="qrcode"
          size={20}
          color={
            scanIconColor == null
              ? Colors.secondaryColor_dark.background
              : scanIconColor
          }
          touchable={true}
          style={styles.icon}
          onPress={onScanPress}
          FontAwesome5={false}
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

export default UrlInput;
