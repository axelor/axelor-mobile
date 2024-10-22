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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useMetafileUri, useTranslator, useTypes} from '@axelor/aos-mobile-core';
import {
  HtmlInput,
  ObjectCard,
  TextUnit,
  useDigitFormat,
  usePriceFormat,
} from '@axelor/aos-mobile-ui';

interface SaleOrderLineCardProps {
  style?: any;
  typeSelect: number;
  product?: any;
  productName: string;
  price?: number;
  unit?: string;
  qty?: number;
  SOinAti?: boolean;
  inTaxTotal?: number;
  exTaxTotal?: number;
  isShowEndOfPackTotal?: boolean;
  currencySymbol?: string;
  description?: string;
  onPress?: () => void;
}

const SaleOrderLineCard = ({
  style,
  typeSelect,
  product,
  productName,
  price,
  unit,
  qty,
  SOinAti,
  inTaxTotal,
  exTaxTotal,
  isShowEndOfPackTotal,
  currencySymbol,
  description,
  onPress,
}: SaleOrderLineCardProps) => {
  const I18n = useTranslator();
  const {SaleOrderLine} = useTypes();
  const formatMetaFile = useMetafileUri();
  const formatNumber = useDigitFormat();
  const formatPrice = usePriceFormat();

  const total = useMemo(
    () => (SOinAti ? inTaxTotal : exTaxTotal),
    [SOinAti, exTaxTotal, inTaxTotal],
  );

  if (typeSelect === SaleOrderLine?.typeSelect.Standard) {
    return (
      <ObjectCard
        style={[styles.card, styles.cardPadding, style]}
        iconLeftMargin={5}
        onPress={onPress}
        image={{
          generalStyle: styles.imageSize,
          imageSize: styles.imageSize,
          resizeMode: 'contain',
          defaultIconSize: 50,
          source: formatMetaFile(product.picture?.id),
        }}
        upperTexts={{
          items: [
            {
              displayText: product.name,
              isTitle: true,
            },
            {
              displayText: productName,
              hideIfNull: true,
            },
          ],
        }}
        lowerTexts={{
          items: [
            {
              indicatorText: I18n.t('Sale_UnitPrice'),
              displayText: formatPrice(price),
              style: styles.noBold,
            },
          ],
        }}
        sideBadges={{
          style: styles.sideContainer,
          items: [
            {
              customComponent: (
                <TextUnit
                  style={styles.sideText}
                  value={formatNumber(qty)}
                  unit={unit}
                />
              ),
            },
            {
              customComponent: (
                <TextUnit
                  style={styles.sideText}
                  value={formatPrice(total)}
                  unit={currencySymbol}
                />
              ),
            },
          ],
        }}
      />
    );
  }

  if (typeSelect === SaleOrderLine?.typeSelect.Title) {
    return (
      <ObjectCard
        style={[styles.card, style]}
        showArrow={false}
        touchable={false}
        upperTexts={{
          items: [
            {
              displayText: productName,
              isTitle: true,
            },
            {
              customComponent: (
                <View style={styles.htmlInputContainer}>
                  <HtmlInput defaultInput={description} readonly={true} />
                </View>
              ),
            },
          ],
        }}
      />
    );
  }

  if (
    typeSelect === SaleOrderLine?.typeSelect.StartOfPack ||
    typeSelect === SaleOrderLine?.typeSelect.EndOfPack
  ) {
    const isStartOfPack = typeSelect === SaleOrderLine?.typeSelect.StartOfPack;

    return (
      <ObjectCard
        style={[styles.card, style]}
        leftContainerFlex={2}
        showArrow={false}
        touchable={false}
        upperTexts={{
          items: [
            {
              displayText: I18n.t(
                isStartOfPack
                  ? 'Sale_SOLineType_StartOfPack'
                  : 'Sale_SOLineType_EndOfPack',
              ),
            },
            {
              displayText: productName,
              isTitle: true,
            },
          ],
        }}
        sideBadges={{
          style: styles.sideContainer,
          items: [
            !isStartOfPack &&
              isShowEndOfPackTotal && {
                customComponent: (
                  <TextUnit
                    style={styles.sideText}
                    value={formatPrice(total)}
                    unit={currencySymbol}
                    defaultColor
                  />
                ),
              },
          ],
        }}
      />
    );
  }

  return null;
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
  },
  cardPadding: {
    paddingRight: 5,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
  noBold: {
    fontWeight: 'normal',
  },
  sideContainer: {
    alignItems: 'flex-end',
  },
  sideText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  htmlInputContainer: {
    width: '100%',
    marginLeft: -10,
  },
});

export default SaleOrderLineCard;
