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

import React from 'react';
import {StyleSheet} from 'react-native';
import {ObjectCard, TextUnit, useDigitFormat} from '@axelor/aos-mobile-ui';
import {useMetafileUri, useTranslator} from '@axelor/aos-mobile-core';

interface LogisticalFormStockMoveLineCardProps {
  line: any;
  statusColor: string;
}

const LogisticalFormStockMoveLineCard = ({
  line,
  statusColor,
}: LogisticalFormStockMoveLineCardProps) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const formatMetaFile = useMetafileUri();

  return (
    <ObjectCard
      touchable={false}
      showArrow={false}
      style={[styles.card, {borderLeftColor: statusColor}]}
      image={{
        generalStyle: styles.imageSize,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 50,
        source: formatMetaFile(line?.product?.picture?.id),
      }}
      upperTexts={{
        items: [
          {displayText: line?.product?.name, isTitle: true},
          {
            displayText: line?.product?.code,
            hideIfNull: true,
          },
          {
            displayText: line?.trackingNumber?.trackingNumberSeq,
            indicatorText: `${I18n.t('Stock_TrackingNumber')} :`,
            iconName: 'qr-code',
            hideIf: line?.trackingNumber == null,
          },
        ],
      }}
      lowerTexts={{
        items: [
          {
            displayText: line?.saleOrderLine?.sequence,
            iconName: 'tag-fill',
            hideIfNull: true,
          },
          {
            displayText: formatNumber(line?.totalNetMass),
            indicatorText: `${I18n.t('Stock_TotalMass')} :`,
            iconName: 'box-seam-fill',
            hideIfNull: true,
          },
        ],
      }}
      upperBadges={{
        items: [
          {
            customComponent: (
              <TextUnit
                unit={line?.unit?.name}
                value={formatNumber(line?.qtyRemainingToPackage)}
              />
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
  card: {
    borderLeftWidth: 7,
  },
});

export default LogisticalFormStockMoveLineCard;
