import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {Badge, LabelText} from '@/components/molecules';
import StockMove from '@/modules/stock/types/stock-move';
import {checkNullString} from '@/modules/stock/utils/strings';
import {useThemeColor} from '@aos-mobile/ui';
import useTranslator from '@/hooks/use-translator';

const CustomerDeliveryLineCard = ({
  style,
  productName,
  askedQty,
  pickedQty,
  locker,
  availability,
  trackingNumber,
  onPress,
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    if (parseFloat(askedQty) <= parseFloat(pickedQty)) {
      return getStyles(Colors.primaryColor);
    } else {
      return getStyles(Colors.cautionColor);
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
              color={
                StockMove.getAvailabilityColor(availability, Colors)
                  .backgroundColor
              }
              title={StockMove.getAvailability(availability, I18n)}
            />
          )}
          <LabelText
            title={`${I18n.t('Stock_AskedQty')} :`}
            value={parseFloat(askedQty).toFixed(2)}
          />
          <LabelText
            title={`${I18n.t('Stock_PickedQty')} :`}
            value={parseFloat(pickedQty).toFixed(2)}
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
