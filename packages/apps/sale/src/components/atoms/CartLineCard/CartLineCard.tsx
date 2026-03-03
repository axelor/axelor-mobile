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
  isAvailable?: boolean;
  qty?: number;
  unit?: string;
  hideBadgeInformation?: boolean;
  onPress?: () => void;
}

const CartLineCard = ({
  style,
  product,
  isAvailable = true,
  qty,
  unit,
  hideBadgeInformation,
  onPress,
}: CartLineCardProps) => {
  const formatMetaFile = useMetafileUri();
  const priceFormat = usePriceFormat();
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <ObjectCard
      style={[styles.container, style]}
      touchable={onPress != null}
      showArrow={onPress != null}
      onPress={onPress}
      leftContainerFlex={2}
      iconLeftMargin={5}
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
                {!isAvailable && (
                  <InfoBubble
                    iconName="exclamation-triangle-fill"
                    badgeColor={Colors.errorColor}
                    indication={I18n.t('Sale_ProductUnavailable')}
                  />
                )}
                <Text writingType="title">{product?.name}</Text>
              </View>
            ),
          },
          {
            displayText: product?.code,
            hideIfNull: true,
          },
        ],
      }}
      sideBadges={
        !hideBadgeInformation && {
          style: styles.badges,
          items: [
            {
              customComponent: (
                <TextUnit
                  unit={product?.saleCurrency?.symbol}
                  value={priceFormat(product?.salePrice)}
                  fontSize={20}
                  numberOfLines={1}
                />
              ),
            },
            {
              customComponent: (
                <TextUnit
                  unit={unit}
                  value={qty}
                  fontSize={20}
                  numberOfLines={1}
                />
              ),
            },
          ],
        }
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    marginVertical: 2,
    paddingRight: 5,
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
