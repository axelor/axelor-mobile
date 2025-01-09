/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
import {
  checkNullString,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import StockMove from '../../../../types/stock-move';

interface InternalMoveLineCardProps {
  style?: any;
  internalMoveStatus: number;
  productName: string;
  availability: number;
  trackingNumber: string;
  fromStockLocation: string;
  toStockLocation: string;
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
  fromStockLocation,
  toStockLocation,
  locker,
  expectedQty,
  movedQty,
  onPress,
}: InternalMoveLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {stockConfig} = useSelector((state: any) => state.stockAppConfig);

  const borderColor = useMemo(() => {
    if (movedQty === 0 || movedQty == null) {
      return Colors.secondaryColor.background;
    }

    if (movedQty < expectedQty) {
      return Colors.cautionColor.background;
    }

    return Colors.primaryColor.background;
  }, [Colors, expectedQty, movedQty]);

  const borderStyle = useMemo(() => {
    return getStyles(borderColor)?.border;
  }, [borderColor]);

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
          {stockConfig?.isManageStockLocationOnStockMoveLine ? (
            <View style={styles.locations}>
              <Text numberOfLines={1}>{fromStockLocation ?? '-'}</Text>
              <Icon name="arrow-right" size={14} style={styles.icon} />
              <Text numberOfLines={1}>{toStockLocation ?? '-'}</Text>
            </View>
          ) : null}
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
          availability === 0 ||
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
  locations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  icon: {
    marginHorizontal: 2,
  },
});

export default InternalMoveLineCard;
