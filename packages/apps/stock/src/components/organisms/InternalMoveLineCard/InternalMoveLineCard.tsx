import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Badge,
  Card,
  Icon,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {checkNullString, useTranslator} from '@axelor/aos-mobile-core';
import StockMove from '../../../types/stock-move';

interface InternalMoveLineCardProps {
  style?: any;
  internalMoveStatus: number;
  productName: string;
  availability: number;
  trackingNumber: string;
  locker: string;
  expectedQty: number;
  movedQty: number;
  onPress: () => void;
}

const InternalMoveLineCard = ({
  style,
  internalMoveStatus = StockMove.status.Planned,
  productName,
  availability,
  trackingNumber,
  locker,
  expectedQty,
  movedQty,
  onPress,
}: InternalMoveLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    if (expectedQty <= movedQty) {
      return getStyles(Colors.primaryColor.background).border;
    } else {
      return getStyles(Colors.cautionColor.background).border;
    }
  }, [Colors, expectedQty, movedQty]);

  const rightStyle = useMemo(() => {
    return internalMoveStatus === StockMove.status.Realized
      ? styles.noBadge
      : styles.badge;
  }, [internalMoveStatus]);

  const leftStyle = useMemo(() => {
    return internalMoveStatus === StockMove.status.Realized
      ? styles.textContainerNoBadge
      : styles.textContainer;
  }, [internalMoveStatus]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={leftStyle}>
          <Text style={styles.txtImportant}>{productName}</Text>
          <LabelText
            title={`${I18n.t('Stock_AskedQty')} :`}
            value={parseFloat(expectedQty.toString()).toFixed(2)}
          />
          <LabelText
            title={`${I18n.t('Stock_MovedQty')} :`}
            value={parseFloat(movedQty.toString()).toFixed(2)}
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
              value={trackingNumber}
              iconName="qrcode"
              FontAwesome5={false}
            />
          )}
        </View>
        <View style={rightStyle}>
          {availability == null ||
          internalMoveStatus === StockMove.status.Realized ? null : (
            <Badge
              color={StockMove.getAvailabilityColor(availability, Colors)}
              title={StockMove.getAvailability(availability, I18n)}
            />
          )}
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
          />
        </View>
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
  txtImportant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textContainerNoBadge: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  badge: {
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  noBadge: {
    width: '10%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default InternalMoveLineCard;
