/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {useMetafileUri, useTranslator} from '@axelor/aos-mobile-core';
import Product from '../../../../types/product';

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

  const attr1 = attributesList?.attributes[0];
  const attr2 = attributesList?.attributes[1];
  const attr3 = attributesList?.attributes[2];
  const attr4 = attributesList?.attributes[3];
  const attr5 = attributesList?.attributes[4];

  const renderAttrItems = () => {
    if (attributesList == null) {
      return null;
    }

    let items = [];

    if (attr1 != null) {
      items.push({
        numberOfLines: null,
        style: styles.attr,
        displayText: `${attr1.attrName} : ${attr1.attrValue} ${
          attr1.priceExtra >= 0
            ? `(${Product.getApplicationPriceSelect(
                attr1.applicationPriceSelect,
                I18n,
              )} : +${parseFloat(attr1.priceExtra.toString()).toFixed(2)})`
            : ''
        }`,
      });
    }

    if (attr2 != null) {
      items.push({
        numberOfLines: null,
        style: styles.attr,
        displayText: `${attr2.attrName} : ${attr2.attrValue} ${
          attr2.priceExtra >= 0
            ? `(${Product.getApplicationPriceSelect(
                attr2.applicationPriceSelect,
                I18n,
              )} : +${parseFloat(attr2.priceExtra.toString()).toFixed(2)})`
            : ''
        }`,
      });
    }

    if (attr3 != null) {
      items.push({
        numberOfLines: null,
        style: styles.attr,
        displayText: `${attr3.attrName} : ${attr3.attrValue} ${
          attr3.priceExtra >= 0
            ? `(${Product.getApplicationPriceSelect(
                attr3.applicationPriceSelect,
                I18n,
              )} : +${parseFloat(attr3.priceExtra.toString()).toFixed(2)})`
            : ''
        }`,
      });
    }

    if (attr4 != null) {
      items.push({
        numberOfLines: null,
        style: styles.attr,
        displayText: `${attr4.attrName} : ${attr4.attrValue} ${
          attr4.priceExtra >= 0
            ? `(${Product.getApplicationPriceSelect(
                attr4.applicationPriceSelect,
                I18n,
              )} : +${parseFloat(attr4.priceExtra.toString()).toFixed(2)})`
            : ''
        }`,
      });
    }

    if (attr5 != null) {
      items.push({
        numberOfLines: null,
        style: styles.attr,
        displayText: `${attr5.attrName} : ${attr5.attrValue} ${
          attr5.priceExtra >= 0
            ? `(${Product.getApplicationPriceSelect(
                attr5.applicationPriceSelect,
                I18n,
              )} : +${parseFloat(attr5.priceExtra.toString()).toFixed(2)})`
            : ''
        }`,
      });
    }

    return items?.length > 0 ? {items} : null;
  };

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
              stockAvailability > 0 ? Colors.primaryColor : Colors.errorColor,
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
