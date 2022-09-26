import React, {useMemo} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Icon, Input, useThemeColor} from '@aos-mobile/ui';
import useTranslator from '../../i18n/hooks/use-translator';

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

  const container = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={container}>
      <Input
        style={[styles.input, style]}
        value={value}
        onChange={onChange}
        placeholder={I18n.t('Auth_URL')}
        readOnly={readOnly}
        onSelection={onSelection}
      />
      <Icon
        name="qrcode"
        size={Dimensions.get('window').width * 0.06}
        color={
          scanIconColor == null ? Colors.secondaryColor_dark : scanIconColor
        }
        touchable={true}
        onPress={onScanPress}
        style={styles.action}
        FontAwesome5={false}
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

export default UrlInput;
