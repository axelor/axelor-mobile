import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Badge,
  Card,
  Icon,
  LabelText,
  Text,
  useThemeColor,
} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';
import StockMove from '../../../types/stock-move';
import {checkNullString} from '../../../utils/strings';

interface CustomerDeliveryLineCardProps {
  style?: any;
  productName: string;
  askedQty: number;
  pickedQty: number;
  locker?: string;
  availability: number;
  trackingNumber?: {trackingNumberSeq: string};
  onPress: () => void;
}

const CustomerDeliveryLineCard = ({
  style,
  productName,
  askedQty,
  pickedQty,
  locker,
  availability,
  trackingNumber,
  onPress,
}: CustomerDeliveryLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    if (askedQty <= pickedQty) {
      return getStyles(Colors.primaryColor.background)?.border;
    } else {
      return getStyles(Colors.cautionColor.background)?.border;
    }
  }, [askedQty, pickedQty, Colors]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.leftContainer}>
          <Text style={styles.txtImportant}>{productName}</Text>
          {availability != null && (
            <Badge
              style={styles.badgeContainer}
              color={StockMove.getAvailabilityColor(availability, Colors)}
              title={StockMove.getAvailability(availability, I18n)}
            />
          )}
          <LabelText
            title={`${I18n.t('Stock_AskedQty')} :`}
            value={parseFloat(askedQty.toString()).toFixed(2)}
          />
          <LabelText
            title={`${I18n.t('Stock_PickedQty')} :`}
            value={parseFloat(pickedQty.toString()).toFixed(2)}
          />
          {checkNullString(locker) === false && (
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
          color={Colors.secondaryColor.background_light}
          size={20}
        />
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderWidth: 1.5,
      borderColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: '2%',
    paddingRight: 8,
  },
  leftContainer: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: '1%',
  },
  txtImportant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightContainer: {
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  badgeContainer: {
    marginLeft: 10,
  },
});

export default CustomerDeliveryLineCard;
