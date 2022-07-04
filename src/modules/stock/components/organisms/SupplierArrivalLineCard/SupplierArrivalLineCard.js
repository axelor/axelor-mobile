import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {LabelText} from '@/components/molecules';
import {checkNullString} from '@/modules/stock/utils/strings';
import {ColorHook} from '@/themeStore';

const SupplierArrivalLineCard = ({
  style,
  productName,
  askedQty,
  deliveredQty,
  locker,
  trackingNumber,
  onPress,
}) => {
  const Colors = ColorHook();
  const borderStyle = useMemo(() => {
    if (parseFloat(deliveredQty) === 0) {
      return null;
    } else if (parseFloat(askedQty) === parseFloat(deliveredQty)) {
      return getStyles(Colors.primaryColor);
    } else {
      return getStyles(Colors.cautionColor);
    }
  }, [Colors, askedQty, deliveredQty]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{productName}</Text>
          <LabelText
            title="Asked quantity :"
            value={parseFloat(askedQty).toFixed(2)}
          />
          <LabelText
            title="Delivered quantity :"
            value={parseFloat(deliveredQty).toFixed(2)}
          />
          {checkNullString(locker) === false && (
            <LabelText
              title="Locker :"
              value={locker}
              iconName="map-marker-alt"
            />
          )}
          {trackingNumber != null && (
            <LabelText
              title="Tracking number :"
              value={trackingNumber?.trackingNumberSeq}
              iconName="qrcode"
            />
          )}
        </View>
        <View style={styles.rightContainer}>
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor_light}
            size={20}
          />
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  },
  textContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  txtImportant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightContainer: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SupplierArrivalLineCard;
