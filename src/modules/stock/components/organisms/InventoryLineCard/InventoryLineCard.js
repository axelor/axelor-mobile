import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {LabelText} from '@/components/molecules';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';

const InventoryLineCard = ({
  style,
  productName,
  currentQty,
  realQty,
  unit,
  trackingNumber,
  locker,
  onPress,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    if (realQty == null) {
      return getStyles(Colors.secondaryColor);
    } else if (parseFloat(currentQty) === parseFloat(realQty)) {
      return getStyles(Colors.primaryColor);
    } else {
      return getStyles(Colors.cautionColor);
    }
  }, [Colors, currentQty, realQty]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{productName}</Text>
          <LabelText
            title={`${I18n.t('Stock_DatabaseQty')} :`}
            value={`${parseFloat(currentQty).toFixed(2)} ${unit}`}
          />
          {realQty && (
            <LabelText
              title={`${I18n.t('Stock_PhysicalQty')} :`}
              value={`${parseFloat(realQty).toFixed(2)} ${unit}`}
            />
          )}
          {locker != null && (
            <LabelText
              title={`${I18n.t('Stock_Locker')} :`}
              value={locker}
              iconName="map-marker-alt"
            />
          )}
          {trackingNumber != null && (
            <LabelText
              title={`${I18n.t('Stock_TrackingNumber')} :`}
              value={trackingNumber?.trackingNumberSeq}
              iconName="qrcode"
              FontAwesome5={false}
            />
          )}
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor_light}
          size={20}
        />
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    borderWidth: 1.5,
    borderColor: color,
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: '2%',
    paddingRight: 8,
  },
  textContainer: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  txtImportant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InventoryLineCard;
