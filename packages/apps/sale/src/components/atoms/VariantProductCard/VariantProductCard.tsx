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
import {StyleSheet, View} from 'react-native';
import {
  useMetafileUri,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  ObjectCard,
  TextUnit,
  useDigitFormat,
  usePriceFormat,
} from '@axelor/aos-mobile-ui';
import TaxModeBadge from '../TaxModeBadge/TaxModeBadge';

interface Attribute {
  attrName: string;
  attrValue: string;
  priceExtra: number;
  applicationPriceSelect: number;
}

interface VariantProductCardProps {
  style?: any;
  picture: any;
  name: string;
  code: string;
  price: number;
  unit: string;
  inAti: boolean;
  attributesList: {attributes: Attribute[]};
  onPress: () => void;
}

const VariantProductCard = ({
  style,
  picture,
  name,
  code,
  price,
  unit,
  inAti,
  attributesList,
  onPress,
}: VariantProductCardProps) => {
  const {ProductVariant} = useTypes();
  const {getItemTitle} = useTypeHelpers();
  const formatMetaFile = useMetafileUri();
  const formatPrice = usePriceFormat();
  const formatNumber = useDigitFormat();

  const renderAttributes = useCallback(() => {
    if (
      !Array.isArray(attributesList?.attributes) ||
      attributesList?.attributes.length === 0
    ) {
      return null;
    }

    let items = [];

    for (let index = 0; index < attributesList?.attributes.length; index++) {
      const attr = attributesList?.attributes[index];

      if (attr != null) {
        items.push({
          displayText: `${attr.attrName} : ${attr.attrValue} ${
            attr.priceExtra > 0
              ? `(${getItemTitle(
                  ProductVariant?.applicationPriceSelect,
                  attr.applicationPriceSelect,
                )} : +${formatNumber(attr.priceExtra)}${unit})`
              : ''
          }`,
          numberOfLines: null,
        });
      }
    }

    return items?.length > 0 ? {items} : null;
  }, [
    attributesList?.attributes,
    formatNumber,
    getItemTitle,
    ProductVariant?.applicationPriceSelect,
    unit,
  ]);

  return (
    <View style={style}>
      <ObjectCard
        style={styles.container}
        leftContainerFlex={2}
        iconLeftMargin={5}
        onPress={onPress}
        image={{
          generalStyle: styles.imageSize,
          imageSize: styles.imageSize,
          resizeMode: 'contain',
          defaultIconSize: 50,
          source: formatMetaFile(picture?.id),
        }}
        upperTexts={{
          items: [
            {
              displayText: name,
              isTitle: true,
            },
            {
              displayText: code,
            },
          ],
        }}
        lowerTexts={renderAttributes()}
        sideBadges={{
          style: styles.sideContainer,
          items: [
            {
              customComponent: (
                <TextUnit value={formatPrice(price)} unit={unit} />
              ),
            },
            {
              customComponent: <TaxModeBadge inAti={inAti} />,
            },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '96%',
    alignSelf: 'center',
    marginVertical: 3,
    paddingRight: 5,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
  sideContainer: {
    alignItems: 'flex-end',
  },
});

export default VariantProductCard;
