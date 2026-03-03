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

import React from 'react';
import {StyleSheet} from 'react-native';
import {
  DateDisplay,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ObjectCard, useDigitFormat} from '@axelor/aos-mobile-ui';

interface ManufacturingQtyIndicatorCardProps {
  style?: any;
  refMO?: string;
  refIM?: string;
  date: string;
  realQty: number;
  unitName: string;
  trackingNumber: string;
  statusSelect: number;
}

const ManufacturingQtyIndicatorCard = ({
  style,
  refMO,
  refIM,
  date,
  realQty,
  unitName,
  trackingNumber,
  statusSelect,
}: ManufacturingQtyIndicatorCardProps) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();
  const formatNumber = useDigitFormat();

  return (
    <ObjectCard
      style={style}
      leftContainerFlex={2}
      showArrow={false}
      touchable={false}
      upperTexts={{
        items: [
          {
            displayText: refMO,
            isTitle: true,
          },
          {
            displayText: refIM,
            isTitle: true,
          },
          {
            customComponent: <DateDisplay date={date} size={14} />,
          },
          {
            displayText: `${formatNumber(realQty)} ${unitName}`,
            indicatorText: `${I18n.t('Stock_RealQty')} :`,
          },
          {
            iconName: 'qr-code',
            displayText: trackingNumber,
            indicatorText: `${I18n.t('Manufacturing_TrackingNumber')}:`,
            hideIf: trackingNumber == null,
          },
        ],
      }}
      sideBadges={{
        style: styles.badgeContainer,
        items: [
          {
            displayText: getItemTitle(StockMove?.statusSelect, statusSelect),
            color: getItemColor(StockMove?.statusSelect, statusSelect),
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: 'flex-end',
  },
});

export default ManufacturingQtyIndicatorCard;
