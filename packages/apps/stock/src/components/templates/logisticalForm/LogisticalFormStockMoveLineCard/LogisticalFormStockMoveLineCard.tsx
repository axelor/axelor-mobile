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
import {StyleSheet, View} from 'react-native';
import {
  Icon,
  ObjectCard,
  Text,
  ThemeColors,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface LogisticalFormStockMoveLineCardProps {
  line: any;
  remainingQty: number;
  statusColor: string;
}

const LogisticalFormStockMoveLineCard = ({
  line,
  remainingQty,
  statusColor,
}: LogisticalFormStockMoveLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const productName = line?.product?.fullName ?? line?.product?.name;
  const productCode = line?.product?.code;
  const trackingNumber = line?.trackingNumber?.trackingNumberSeq;
  const sequence = line?.sequence;
  const saleOrder = line?.saleOrderLine?.saleOrder?.saleOrderSeq;
  const unitName = line?.unit?.name;
  const totalNetMass = line?.totalNetMass;

  const sequenceLabel = useMemo(() => {
    if (sequence == null && saleOrder == null) {
      return null;
    }

    if (sequence == null) {
      return `(${saleOrder})`;
    }

    return saleOrder != null ? `${sequence} (${saleOrder})` : `${sequence}`;
  }, [saleOrder, sequence]);

  const formattedRemainingQty = useMemo(
    () => formatNumber(remainingQty),
    [formatNumber, remainingQty],
  );

  const formattedMass = useMemo(() => {
    if (totalNetMass == null) {
      return null;
    }

    return formatNumber(totalNetMass);
  }, [formatNumber, totalNetMass]);

  return (
    <ObjectCard
      touchable={false}
      showArrow={false}
      style={[styles.card, {borderLeftColor: statusColor}]}
      upperTexts={{
        items: [
          {
            order: 0,
            customComponent: (
              <Text
                writingType="title"
                fontSize={18}
                style={[
                  styles.remainingQty,
                  {color: statusColor},
                ]}>
                {formattedRemainingQty} {unitName ?? ''}
              </Text>
            ),
          },
        ],
      }}
      lowerTexts={{
        items: [
          {
            order: 0,
            customComponent: (
              <View style={styles.titleRow}>
                <View style={styles.thumbnail}>
                  <Icon
                    name="box-seam"
                    size={28}
                    color={Colors.secondaryColor.foreground}
                  />
                </View>
                <Text
                  writingType="title"
                  fontSize={16}
                  numberOfLines={2}
                  style={styles.titleText}>
                  {productName ?? I18n.t('Base_NoData')}
                </Text>
              </View>
            ),
          },
          {
            order: 10,
            displayText: productCode,
            indicatorText: `${I18n.t('Stock_Code')} :`,
            iconName: 'hash',
            hideIfNull: true,
            style: styles.textSpacing,
          },
          {
            order: 20,
            displayText: trackingNumber,
            indicatorText: `${I18n.t('Stock_TrackingNumber')} :`,
            iconName: 'qr-code',
            hideIfNull: true,
            style: styles.textSpacing,
          },
          {
            order: 30,
            displayText: sequenceLabel,
            iconName: 'tag-fill',
            hideIfNull: true,
            style: styles.textSpacing,
          },
          {
            order: 40,
            displayText: formattedMass,
            indicatorText: `${I18n.t('Stock_TotalMass')} :`,
            iconName: 'box-seam-fill',
            hideIfNull: true,
            style: styles.textSpacing,
          },
        ],
      }}
    />
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 12,
      marginTop: 10,
      borderLeftWidth: 4,
    },
    remainingQty: {
      fontWeight: '600',
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
    },
    thumbnail: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: Colors.secondaryColor.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    titleText: {
      flex: 1,
    },
    textSpacing: {
      marginTop: 4,
    },
  });

export default LogisticalFormStockMoveLineCard;
