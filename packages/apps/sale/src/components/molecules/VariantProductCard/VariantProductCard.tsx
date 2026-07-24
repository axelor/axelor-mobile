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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
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
import {fetchVariantAttributes} from '../../../api/product-api';
import {TaxModeBadge} from '../../atoms';

interface VariantProductCardProps {
  style?: any;
  id: number;
  version: number;
  picture: any;
  name: string;
  code: string;
  price: number;
  unit: string;
  inAti: boolean;
  onPress: () => void;
}

const VariantProductCard = ({
  style,
  id,
  version,
  picture,
  name,
  code,
  price,
  unit,
  inAti,
  onPress,
}: VariantProductCardProps) => {
  const {ProductVariant} = useTypes();
  const {getItemTitle} = useTypeHelpers();
  const formatMetaFile = useMetafileUri();
  const formatPrice = usePriceFormat();
  const formatNumber = useDigitFormat();

  const isMounted = useRef<boolean>(true);

  const [attributesList, setAttributesList] = useState<any[]>([]);

  useEffect(() => {
    isMounted.current = true;
    if (id != null && version != null) {
      fetchVariantAttributes({productVariantId: id, version})
        .then(res => res?.data?.object?.attributes)
        .then(data => {
          if (isMounted.current) {
            setAttributesList(data);
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setAttributesList([]);
          }
        });
    }

    return () => {
      isMounted.current = false;
    };
  }, [id, version]);

  const attributes = useMemo(() => {
    if (!Array.isArray(attributesList) || attributesList?.length === 0)
      return undefined;

    let items = [];

    for (const attr of attributesList) {
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

    return items?.length > 0 ? {items} : undefined;
  }, [
    attributesList,
    formatNumber,
    getItemTitle,
    ProductVariant?.applicationPriceSelect,
    unit,
  ]);

  return (
    <ObjectCard
      style={[styles.container, style]}
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
      lowerTexts={attributes}
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
  );
};

const styles = StyleSheet.create({
  container: {
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
