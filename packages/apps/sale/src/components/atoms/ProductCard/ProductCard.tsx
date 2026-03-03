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
import {StyleSheet} from 'react-native';
import {
  ObjectCard,
  TextUnit,
  usePriceFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useMetafileUri} from '@axelor/aos-mobile-core';

export interface ProductCardProps {
  style?: any;
  onPress?: () => void;
  picture: any;
  name: string;
  code: string;
  productFamily: string;
  productCategory: string;
  description: string;
  isConfigurator: boolean;
  unit?: string;
  salePrice?: number;
  displayPrice?: boolean;
}

const ProductCard = ({
  style,
  onPress,
  picture,
  name,
  code,
  productFamily,
  productCategory,
  description,
  isConfigurator,
  unit,
  salePrice,
  displayPrice = true,
}: ProductCardProps) => {
  const Colors = useThemeColor();
  const formatMetaFile = useMetafileUri();
  const priceFormat = usePriceFormat();

  const borderStyle = useMemo(() => {
    if (isConfigurator) {
      return getStyles(Colors.progressColor.background)?.border;
    }
    return null;
  }, [Colors.progressColor.background, isConfigurator]);

  return (
    <ObjectCard
      style={[borderStyle, style]}
      onPress={onPress}
      touchable={!!onPress}
      showArrow={!!onPress}
      image={{
        generalStyle: styles.imageSize,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 60,
        source: formatMetaFile(picture?.id),
      }}
      upperTexts={{
        items: [
          {
            displayText: name,
            isTitle: true,
          },
          {displayText: code, style: styles.code},
        ],
      }}
      lowerTexts={{
        items: [
          {
            displayText: productFamily,
            hideIfNull: true,
          },
          {
            displayText: productCategory,
            hideIfNull: true,
          },
          {
            displayText: description,
            hideIfNull: true,
            numberOfLines: 2,
          },
        ],
      }}
      upperBadges={{
        items: [
          displayPrice && {
            customComponent: (
              <TextUnit unit={unit} value={priceFormat(salePrice)} />
            ),
          },
        ],
        fixedOnRightSide: true,
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  imageSize: {
    height: 60,
    width: 60,
  },
  code: {
    fontSize: 12,
  },
});

export default ProductCard;
