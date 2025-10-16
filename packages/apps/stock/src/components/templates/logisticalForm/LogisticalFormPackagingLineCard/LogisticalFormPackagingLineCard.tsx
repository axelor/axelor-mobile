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
import {ObjectCard, TextUnit, useDigitFormat} from '@axelor/aos-mobile-ui';
import {useMetafileUri} from '@axelor/aos-mobile-core';
import {StyleSheet} from 'react-native';

interface LogisticalFormPackagingLineCardProps {
  packagingLine: any;
}

const LogisticalFormPackagingLineCard = ({
  packagingLine,
}: LogisticalFormPackagingLineCardProps) => {
  const formatNumber = useDigitFormat();
  const formatMetaFile = useMetafileUri();

  return (
    <ObjectCard
      showArrow={false}
      image={{
        generalStyle: styles.imageSize,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 50,
        source: formatMetaFile(
          packagingLine?.stockMoveLine?.product?.picture?.id,
        ),
      }}
      upperTexts={{
        items: [
          {
            displayText: packagingLine?.stockMoveLine?.product?.name,
            isTitle: true,
          },
          {
            displayText: packagingLine?.stockMoveLine?.product?.code,
            hideIfNull: true,
          },
          {
            displayText: packagingLine?.trackingNumberSet,
            iconName: 'qr-code',
            hideIfNull: true,
          },
        ],
      }}
      lowerTexts={{
        items: [
          {
            displayText: packagingLine?.saleOrderLine?.sequence,
            iconName: 'tag-fill',
            hideIfNull: true,
          },
          {
            displayText: formatNumber(
              packagingLine?.stockMoveLine?.totalNetMass,
            ),
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
                unit={packagingLine?.stockMoveLine?.unit?.name}
                value={formatNumber(packagingLine?.qty)}
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
});

export default LogisticalFormPackagingLineCard;
