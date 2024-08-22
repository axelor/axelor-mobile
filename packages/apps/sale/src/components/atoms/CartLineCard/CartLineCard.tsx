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
import {StyleSheet, View} from 'react-native';
import {
  InfoBubble,
  ObjectCard,
  Text,
  TextUnit,
  usePriceFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useMetafileUri, useTranslator} from '@axelor/aos-mobile-core';

interface CartLineCardProps {
  style?: any;
  product: any;
  qty: number;
  unit: string;
}

const CartLineCard = ({style, product, qty, unit}: CartLineCardProps) => {
  const formatMetaFile = useMetafileUri();
  const priceFormat = usePriceFormat();
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <ObjectCard
      style={[styles.container, style]}
      touchable={false}
      showArrow={false}
      leftContainerFlex={2}
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
            customComponent: (
              <View style={styles.title}>
                {product.unvailable && (
                  <InfoBubble
                    iconName="exclamation-triangle-fill"
                    badgeColor={Colors.errorColor}
                    indication={I18n.t('Sale_ProductUnavailable')}
                  />
                )}
                <Text writingType="title">{product?.name}</Text>
              </View>
            ),
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
                  numberOfLines={1}
                />
                <TextUnit unit={unit} value={qty} numberOfLines={1} />
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
  title: {
    flexDirection: 'row',
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
