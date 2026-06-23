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
import {ObjectCard, useDigitFormat, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface ProducedProductCardProps {
  style?: any;
  productName: string;
  plannedQty: number;
  producedQty?: number;
  unitName?: string;
  trackingNumberSeq?: string;
  onPress: () => void;
}

const ProducedProductCard = ({
  style,
  productName,
  plannedQty,
  producedQty,
  unitName,
  trackingNumberSeq = null,
  onPress,
}: ProducedProductCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();

  const cardColor = useMemo(() => {
    if (plannedQty > producedQty) {
      return Colors.plannedColor.background;
    }
    return Colors.successColor.background;
  }, [Colors, plannedQty, producedQty]);

  return (
    <ObjectCard
      onPress={onPress}
      borderLeftColor={cardColor}
      style={style}
      upperTexts={{
        items: [
          {isTitle: true, displayText: productName},
          {
            indicatorText: `${I18n.t('Manufacturing_PlannedQty')}:`,
            displayText: `${formatNumber(plannedQty)} ${
              unitName != null ? unitName : ''
            }`,
          },
          {
            indicatorText: `${I18n.t('Manufacturing_ProducedQty')}:`,
            displayText: `${formatNumber(producedQty)} ${
              unitName != null ? unitName : ''
            }`,
          },
          {
            indicatorText: `${I18n.t('Manufacturing_TrackingNumber')}:`,
            displayText: trackingNumberSeq,
            iconName: 'qr-code',
            hideIf: trackingNumberSeq == null,
          },
        ],
      }}
    />
  );
};

export default ProducedProductCard;
