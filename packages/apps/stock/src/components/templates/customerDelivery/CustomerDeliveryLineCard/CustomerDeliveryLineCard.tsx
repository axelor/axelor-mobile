/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {Dimensions, StyleSheet} from 'react-native';
import {
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  checkNullString,
  ObjectCard,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useStockLinesCheckQty} from '../../../../hooks';
import {useMassIndicatorChecker} from '../../../../providers';

interface CustomerDeliveryLineCardProps {
  style?: any;
  productName: string;
  stockLocationName: string;
  askedQty: number;
  pickedQty: number;
  locker?: string;
  availability: number;
  stockMoveLineId: number;
  trackingNumber?: {trackingNumberSeq: string};
  totalNetMass?: string;
  saleOrderLine?: any;
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
  stockMoveLineId,
  trackingNumber,
  totalNetMass,
  saleOrderLine,
  onPress,
}: CustomerDeliveryLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const {StockMove} = useTypes();
  const {getItemColor} = useTypeHelpers();
  const {getMassIndicator, massUnitLabel} = useMassIndicatorChecker();

  const {stock: stockConfig} = useSelector((state: any) => state.appConfig);

  const checkQtyObject = useStockLinesCheckQty(stockMoveLineId);

  const borderColor = useMemo(() => {
    if (pickedQty === 0 || pickedQty == null) {
      return Colors.secondaryColor.background;
    }

    if (pickedQty < askedQty) {
      return Colors.cautionColor.background;
    }

    return Colors.successColor.background;
  }, [Colors, askedQty, pickedQty]);

  const styles = useMemo(() => {
    return getStyles(borderColor);
  }, [borderColor]);

  const massIndicator = useMemo(
    () => getMassIndicator(totalNetMass),
    [getMassIndicator, totalNetMass],
  );

  return (
    <ObjectCard
      onPress={onPress}
      showArrow={true}
      style={[styles.container, style]}
      lowerTexts={{
        items: [
          {displayText: productName, isTitle: true, fontSize: 16},
          {
            displayText: formatNumber(askedQty),
            indicatorText: `${I18n.t('Stock_AskedQty')} :`,
          },
          {
            displayText: formatNumber(pickedQty),
            indicatorText: `${I18n.t('Stock_PickedQty')} :`,
          },
          {
            displayText: stockLocationName,
            indicatorText: `${I18n.t('Stock_FromStockLocation')} :`,
            hideIf: !stockConfig?.isManageStockLocationOnStockMoveLine,
            iconName: 'house-down',
            style:
              Dimensions.get('window').width < 350 ? styles.textWidth : null,
            numberOfLines: 2,
          },
          {
            displayText: locker,
            indicatorText: `${I18n.t('Stock_Locker')} :`,
            hideIf: checkNullString(locker),
            iconName: 'geo-alt-fill',
          },
          {
            displayText: trackingNumber?.trackingNumberSeq,
            indicatorText: `${I18n.t('Stock_TrackingNumber')} :`,
            hideIf: trackingNumber?.trackingNumberSeq == null,
            iconName: 'qr-code',
          },
          {
            displayText: `${totalNetMass} ${massUnitLabel ?? ''}`,
            indicatorText: `${I18n.t('Stock_TotalMass')} :`,
            iconName: massIndicator?.icon ?? 'box-seam-fill',
            hideIf: totalNetMass == null,
            color: massIndicator?.color?.background,
          },
          {
            displayText: `${saleOrderLine?.saleOrder?.saleOrderSeq}-${saleOrderLine?.sequence} (${saleOrderLine?.saleOrder?.clientPartner.fullName ?? ''})`,
            indicatorText: `${I18n.t('Stock_SaleOrder')} :`,
            hideIf: saleOrderLine?.saleOrder == null,
            numberOfLines: 2,
          },
        ],
      }}
      upperBadges={{
        fixedOnRightSide: true,
        items: [
          {
            displayText: checkQtyObject?.availability,
            color: getItemColor(StockMove?.availableStatusSelect, availability),
            showIf:
              checkQtyObject?.availability &&
              availability != null &&
              availability > 0,
          },
          {
            displayText: formatNumber(checkQtyObject?.missingQty),
            color: Colors.errorColor,
            showIf: Number(checkQtyObject?.missingQty ?? 0) !== 0,
          },
        ],
        style: styles.badgesContainer,
      }}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    container: {
      borderWidth: 1.5,
      borderColor: color,
      paddingRight: 5,
      paddingTop: 5,
      marginVertical: 2,
      marginHorizontal: 2,
    },
    textWidth: {
      width: '85%',
    },
    badgesContainer: {
      marginRight: 10,
    },
  });

export default CustomerDeliveryLineCard;
