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

interface CustomerDeliveryLineCardProps {
  style?: any;
  productName: string;
  stockLocationName: string;
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
  stockLocationName,
  askedQty,
  pickedQty,
  locker,
  availability,
  trackingNumber,
  onPress,
}: CustomerDeliveryLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {stockConfig} = useSelector((state: any) => state.stockAppConfig);

  const borderColor = useMemo(() => {
    if (pickedQty === 0 || pickedQty == null) {
      return Colors.secondaryColor.background;
    }

    if (pickedQty < askedQty) {
      return Colors.cautionColor.background;
    }

    return Colors.primaryColor.background;
  }, [Colors, askedQty, pickedQty]);

  const borderStyle = useMemo(() => {
    return getStyles(borderColor)?.border;
  }, [borderColor]);

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
          {stockConfig?.isManageStockLocationOnStockMoveLine
            ? checkNullString(stockLocationName) === false && (
                <LabelText
                  title={`${I18n.t('Stock_FromStockLocation')} :`}
                  value={stockLocationName}
                  iconName="warehouse"
                />
              )
            : null}
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
  badgeContainer: {
    marginLeft: 10,
  },
});

export default CustomerDeliveryLineCard;
