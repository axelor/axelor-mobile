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

import React from 'react';
import {StyleSheet} from 'react-native';
import {ObjectCard, TextUnit, usePriceFormat} from '@axelor/aos-mobile-ui';
import {useMetafileUri} from '@axelor/aos-mobile-core';

interface CartLineCardProps {
  style?: any;
  product: any;
  qty: number;
  unit: string;
}

const CartLineCard = ({style, product, qty, unit}: CartLineCardProps) => {
  const formatMetaFile = useMetafileUri();
  const priceFormat = usePriceFormat();

  return (
    <ObjectCard
      style={[styles.container, style]}
      touchable={false}
      showArrow={false}
      image={{
        generalStyle: styles.imageSize,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 50,
        source: formatMetaFile(product?.picture?.id),
      }}
      upperTexts={{
        items: [
          {
            displayText: product?.name,
            isTitle: true,
          },
          {
            displayText: product?.code,
            hideIfNull: true,
          },
        ],
      }}
      sideBadges={{
        items: [
          {
            style: styles.badges,
            customComponent: (
              <>
                <TextUnit
                  unit={product?.saleCurrency?.symbol}
                  value={priceFormat(product?.salePrice)}
                />
                <TextUnit unit={unit} value={qty} />
              </>
            ),
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    marginVertical: 2,
  },
  badges: {
    alignItems: 'flex-end',
  },
  imageSize: {
    height: 50,
    width: 50,
  },
});

export default CartLineCard;
