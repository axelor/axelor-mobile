/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Badge, Card, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {AOSImage, useTranslator} from '@axelor/aos-mobile-core';
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

  const attr1 = attributesList?.attributes[0];
  const attr2 = attributesList?.attributes[1];
  const attr3 = attributesList?.attributes[2];
  const attr4 = attributesList?.attributes[3];
  const attr5 = attributesList?.attributes[4];

  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={style}>
        <View style={styles.content}>
          <AOSImage
            generalStyle={styles.imageStyle}
            imageSize={styles.imageSize}
            resizeMode="contain"
            metaFile={picture}
            defaultIconSize={40}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.code}>{code}</Text>
          </View>
          <Badge
            color={
              stockAvailability > 0 ? Colors.primaryColor : Colors.errorColor
            }
            title={
              stockAvailability > 0
                ? I18n.t('Stock_Available')
                : I18n.t('Stock_Unavailable')
            }
          />
        </View>
        <View style={styles.attrView}>
          {attributesList == null ? (
            <View style={styles.textContainer} />
          ) : (
            <View style={styles.textContainer}>
              {attr1 == null ? null : (
                <View>
                  <Text style={styles.attribute}>
                    {`${attr1.attrName} : ${attr1.attrValue} `}
                    {attr1.priceExtra >= 0 && attr1.priceExtra != null
                      ? `(${Product.getApplicationPriceSelect(
                          attr1.applicationPriceSelect,
                          I18n,
                        )} : +${attr1.priceExtra})`
                      : null}
                  </Text>
                </View>
              )}
              {attr2 == null ? null : (
                <View>
                  <Text style={styles.attribute}>
                    {`${attr2.attrName} : ${attr2.attrValue} `}
                    {attr2.priceExtra >= 0 && attr2.priceExtra != null
                      ? `(${Product.getApplicationPriceSelect(
                          attr2.applicationPriceSelect,
                          I18n,
                        )} : +${attr2.priceExtra})`
                      : null}
                  </Text>
                </View>
              )}
              {attr3 == null ? null : (
                <View>
                  <Text style={styles.attribute}>
                    {`${attr3.attrName} : ${attr3.attrValue} `}
                    {attr3.priceExtra >= 0 && attr3.priceExtra != null
                      ? `(${Product.getApplicationPriceSelect(
                          attr3.applicationPriceSelect,
                          I18n,
                        )} : +${attr3.priceExtra})`
                      : null}
                  </Text>
                </View>
              )}
              {attr4 == null ? null : (
                <View>
                  <Text style={styles.attribute}>
                    {`${attr4.attrName} : ${attr4.attrValue} `}
                    {attr4.priceExtra >= 0 && attr4.priceExtra != null
                      ? `(${Product.getApplicationPriceSelect(
                          attr4.applicationPriceSelect,
                          I18n,
                        )} : +${attr4.priceExtra})`
                      : null}
                  </Text>
                </View>
              )}
              {attr5 == null ? null : (
                <View>
                  <Text style={styles.attribute}>
                    {`${attr5.attrName} : ${attr5.attrValue} `}
                    {attr5.priceExtra >= 0 && attr5.priceExtra != null
                      ? `(${Product.getApplicationPriceSelect(
                          attr5.applicationPriceSelect,
                          I18n,
                        )} : +${attr5.priceExtra})`
                      : null}
                  </Text>
                </View>
              )}
            </View>
          )}
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  attrView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSize: {
    height: 40,
    width: 40,
  },
  imageStyle: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 6,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  attribute: {
    fontSize: 14,
  },
  code: {
    fontSize: 12,
  },
});

export default ProductVariantCard;
