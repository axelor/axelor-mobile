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
import {ObjectCard, Text, useThemeColor} from '@axelor/aos-mobile-ui';

interface EquipmentLineCardProps {
  style?: any;
  productName: string;
  productCode: string;
  trackingNumber: string;
  comments: string;
  quantity: string;
  unit: string;
}

const EquipmentLineCard = ({
  style,
  productName,
  productCode,
  trackingNumber,
  comments,
  quantity,
  unit,
}: EquipmentLineCardProps) => {
  const Colors = useThemeColor();

  return (
    <ObjectCard
      style={style}
      showArrow={false}
      sideBadges={{
        items: [
          {
            customComponent: (
              <Text
                writingType="important"
                textColor={
                  Colors.successColor.background
                }>{`${quantity} ${unit}`}</Text>
            ),
          },
        ],
      }}
      upperTexts={{
        items: [
          {isTitle: true, displayText: productName},
          {displayText: productCode},
          {
            iconName: 'qr-code',
            indicatorText: trackingNumber,
            hideIfNull: true,
          },
          {displayText: comments, numberOfLines: 2, hideIfNull: true},
        ],
      }}
    />
  );
};

export default EquipmentLineCard;
