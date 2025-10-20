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
import {StyleSheet} from 'react-native';
import {ObjectCard, TextUnit, useDigitFormat} from '@axelor/aos-mobile-ui';
import {useMetafileUri, useTranslator} from '@axelor/aos-mobile-core';
import {useMassIndicatorChecker} from '../../../../providers';

interface LogisticalFormPackagingLineCardProps {
  style?: any;
  stockMoveLine: any;
  saleOrderLine: any;
  qty: number;
}

const LogisticalFormPackagingLineCard = ({
  style,
  stockMoveLine,
  saleOrderLine: _saleOrderLine,
  qty,
}: LogisticalFormPackagingLineCardProps) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const formatMetaFile = useMetafileUri();
  const {getMassIndicator, massUnitLabel} = useMassIndicatorChecker();

  const {
    netMass,
    product,
    saleOrderLine: _stockMoveSaleOrderLine,
    trackingNumber,
    unit,
  } = useMemo(() => stockMoveLine ?? {}, [stockMoveLine]);

  const totalNetMass = useMemo(
    () => parseFloat(netMass ?? '0') * qty,
    [netMass, qty],
  );

  const massIndicator = useMemo(
    () => getMassIndicator(totalNetMass),
    [getMassIndicator, totalNetMass],
  );

  const saleOrderLine = useMemo(
    () => _saleOrderLine ?? _stockMoveSaleOrderLine,
    [_stockMoveSaleOrderLine, _saleOrderLine],
  );

  return (
    <ObjectCard
      showArrow={false}
      touchable={false}
      style={style}
      image={{
        generalStyle: styles.imageSize,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 50,
        source: formatMetaFile(product?.picture?.id),
      }}
      upperTexts={{
        items: [
          {displayText: product?.name, isTitle: true},
          {displayText: product?.code},
          {
            displayText: trackingNumber?.trackingNumberSeq,
            iconName: 'qr-code',
            hideIfNull: true,
          },
        ],
      }}
      lowerTexts={{
        items: [
          {
            indicatorText: `${stockMoveLine?.name}${saleOrderLine ? ` (${saleOrderLine?.saleOrder?.fullName})` : ''}`,
            iconName: 'tag-fill',
          },
          {
            indicatorText: `${I18n.t('Stock_TotalMass')} :`,
            displayText: `${formatNumber(totalNetMass)} ${massUnitLabel ?? ''}`,
            iconName: massIndicator?.icon ?? 'box-seam-fill',
            hideIf: totalNetMass === 0,
            color: massIndicator?.color?.background,
          },
        ],
      }}
      upperBadges={{
        items: [
          {
            customComponent: (
              <TextUnit unit={unit?.name} value={formatNumber(qty)} />
            ),
          },
        ],
        fixedOnRightSide: true,
      }}
    />
  );
};

const styles = StyleSheet.create({
  imageSize: {
    height: 50,
    width: 50,
  },
});

export default LogisticalFormPackagingLineCard;
