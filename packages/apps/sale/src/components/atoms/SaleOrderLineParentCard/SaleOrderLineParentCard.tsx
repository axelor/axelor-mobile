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
  Icon,
  Image,
  LabelText,
  Text,
  TextUnit,
  useDigitFormat,
  usePriceFormat,
} from '@axelor/aos-mobile-ui';

interface SaleOrderLineCardProps {
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

const SaleOrderLineParentCard = ({
  typeSelect,
  product,
  productName,
  price,
  unit,
  qty,
  SOinAti,
  inTaxTotal,
  exTaxTotal,
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
      <>
        <View style={styles.row}>
          <Image
            generalStyle={styles.imageSize}
            imageSize={styles.imageSize}
            resizeMode={'contain'}
            source={formatMetaFile(product.picture?.id)}
          />
          <View style={styles.textContainer}>
            <Text writingType="title">{product.name}</Text>
            <Text writingType="title">{productName}</Text>
          </View>
        </View>
        <LabelText
          title={I18n.t('Sale_UnitPrice')}
          value={formatPrice(price)}
        />
        <View style={styles.row}>
          <View>
            <TextUnit
              style={styles.sideText}
              value={formatNumber(qty)}
              unit={unit}
            />
            <TextUnit
              style={styles.sideText}
              value={formatPrice(total)}
              unit={currencySymbol}
            />
          </View>
          <Icon
            onPress={onPress}
            style={styles.icon}
            name="box-arrow-right"
            touchable={true}
            size={26}
          />
        </View>
      </>
    );
  }

  if (typeSelect === SaleOrderLine?.typeSelect.Title) {
    return (
      <View style={styles.htmlInputContainer}>
        <HtmlInput defaultInput={description} readonly={true} />
      </View>
    );
  }

  if (
    typeSelect === SaleOrderLine?.typeSelect.StartOfPack ||
    typeSelect === SaleOrderLine?.typeSelect.EndOfPack
  ) {
    const isStartOfPack = typeSelect === SaleOrderLine?.typeSelect.StartOfPack;

    return (
      <>
        <LabelText
          title={I18n.t(
            isStartOfPack
              ? 'Sale_SOLineType_StartOfPack'
              : 'Sale_SOLineType_EndOfPack',
          )}
          value={productName}
        />
        <TextUnit
          style={styles.sideText}
          value={formatPrice(total)}
          unit={currencySymbol}
          defaultColor
        />
      </>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    marginLeft: '5%',
  },
  cardPadding: {
    paddingRight: 5,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
  icon: {
    marginRight: '15%',
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

export default SaleOrderLineParentCard;
