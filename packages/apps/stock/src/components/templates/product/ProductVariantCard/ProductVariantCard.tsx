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

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ObjectCard, useDigitFormat, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useMetafileUri,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  getProductStockIndicators,
  fetchVariantAttributes,
} from '../../../../api/product-api';

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
  productId: number;
  productVersion: number;
  availabiltyData: {stockLocationId: number; companyId: number};
  picture?: any;
  onPress: () => void;
}

const ProductVariantCard = ({
  style,
  name,
  code,
  productId,
  productVersion,
  availabiltyData,
  picture,
  onPress,
}: ProductVariantCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatMetaFile = useMetafileUri();
  const formatNumber = useDigitFormat();
  const {ProductVariantValue} = useTypes();
  const {getItemTitle} = useTypeHelpers();
  const isMounted = useRef(true);

  const [attributes, setAttributesList] = useState<
    ProductAttribut[] | undefined
  >();
  const [qty, setAvailableQty] = useState<number | undefined>();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (productId != null) {
      fetchVariantAttributes({
        productVariantId: productId,
        version: productVersion,
      })
        .then((res: any) => {
          if (isMounted.current) {
            setAttributesList(res?.data?.object?.attributes);
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setAttributesList(undefined);
          }
        });
    }
  }, [availabiltyData, productId, productVersion]);

  useEffect(() => {
    if (productId != null) {
      getProductStockIndicators({
        productId: productId,
        version: productVersion,
        ...availabiltyData,
      })
        .then((res: any) => {
          if (isMounted.current) {
            setAvailableQty(res?.data?.object?.availableStock);
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setAvailableQty(undefined);
          }
        });
    }
  }, [availabiltyData, productId, productVersion]);

  const renderAttrItems = useCallback(() => {
    if (!Array.isArray(attributes)) return undefined;

    let items = [];

    for (let index = 0; index < attributes.length; index++) {
      const attr = attributes[index];

      if (attr != null) {
        items.push({
          numberOfLines: null,
          style: styles.attr,
          displayText: `${attr.attrName} : ${attr.attrValue} ${
            attr.priceExtra > 0
              ? `(${getItemTitle(
                  ProductVariantValue?.applicationPriceSelect,
                  attr.applicationPriceSelect,
                )} : +${formatNumber(attr.priceExtra)})`
              : ''
          }`,
        });
      }
    }

    return items?.length > 0 ? {items} : undefined;
  }, [
    ProductVariantValue?.applicationPriceSelect,
    attributes,
    formatNumber,
    getItemTitle,
  ]);

  return (
    <ObjectCard
      onPress={onPress}
      style={style}
      showArrow={false}
      leftContainerFlex={2}
      image={{
        defaultIconSize: 50,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        source: formatMetaFile(picture?.id),
      }}
      upperTexts={{
        items: [{displayText: name, isTitle: true}, {displayText: code}],
      }}
      sideBadges={{
        style: styles.badgeContainer,
        items: [
          {
            showIf: qty != null,
            displayText: I18n.t(
              qty! > 0 ? 'Stock_Available' : 'Stock_Unavailable',
            ),
            color: qty! > 0 ? Colors.successColor : Colors.errorColor,
          },
        ],
      }}
      lowerTexts={renderAttrItems()}
    />
  );
};

const styles = StyleSheet.create({
  imageSize: {
    height: 50,
    width: 50,
  },
  badgeContainer: {
    alignItems: 'flex-end',
  },
  attr: {
    fontStyle: 'italic',
  },
});

export default ProductVariantCard;
