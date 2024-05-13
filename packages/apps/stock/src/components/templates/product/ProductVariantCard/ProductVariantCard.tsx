/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {ObjectCard, useDigitFormat, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useMetafileUri,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface ProductAttribut {
  attrName: string;
  attrValue: string;
  priceExtra: number;
  applicationPriceSelect: number;
}

interface ProductVariantCardProps {
  style?: any;
  name: string;
  code: string;
  attributesList: {attributes: ProductAttribut[]};
  picture?: any;
  stockAvailability: number;
  onPress: () => void;
}

const ProductVariantCard = ({
  style,
  name,
  code,
  attributesList,
  picture,
  stockAvailability,
  onPress,
}: ProductVariantCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatMetaFile = useMetafileUri();
  const formatNumber = useDigitFormat();
  const {ProductVariantValue} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const renderAttrItems = useCallback(() => {
    if (!Array.isArray(attributesList?.attributes)) {
      return null;
    }

    let items = [];

    for (let index = 0; index < attributesList?.attributes.length; index++) {
      const attr = attributesList?.attributes[index];

      if (attr != null) {
        items.push({
          numberOfLines: null,
          style: styles.attr,
          displayText: `${attr.attrName} : ${attr.attrValue} ${
            attr.priceExtra >= 0
              ? `(${getItemTitle(
                  ProductVariantValue?.applicationPriceSelect,
                  attr.applicationPriceSelect,
                )} : +${formatNumber(attr.priceExtra)})`
              : ''
          }`,
        });
      }
    }

    return items?.length > 0 ? {items} : null;
  }, [
    ProductVariantValue?.applicationPriceSelect,
    attributesList?.attributes,
    formatNumber,
    getItemTitle,
  ]);

  return (
    <ObjectCard
      onPress={onPress}
      style={style}
      showArrow={true}
      image={{
        defaultIconSize: 40,
        imageSize: styles.imageSize,
        generalStyle: styles.imageStyle,
        resizeMode: 'contain',
        source: formatMetaFile(picture?.id),
      }}
      upperTexts={{
        items: [
          {displayText: name, isTitle: true, numberOfLines: null},
          {displayText: code, style: styles.code},
        ],
      }}
      sideBadges={{
        items: [
          {
            displayText:
              stockAvailability > 0
                ? I18n.t('Stock_Available')
                : I18n.t('Stock_Unavailable'),
            color:
              stockAvailability > 0 ? Colors.successColor : Colors.errorColor,
          },
        ],
      }}
      lowerTexts={renderAttrItems()}
    />
  );
};

const styles = StyleSheet.create({
  imageSize: {
    height: 40,
    width: 40,
  },
  imageStyle: {
    marginRight: 15,
  },
  code: {
    fontSize: 12,
  },
  attr: {
    fontStyle: 'italic',
  },
});

export default ProductVariantCard;
