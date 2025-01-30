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

interface ProductCardProps {
  style?: any;
  name: string;
  code: string;
  picture: any;
  availableStock: number | null | undefined;
  onPress: () => void;
}

const ProductCard = ({
  style,
  name,
  code,
  picture,
  availableStock,
  onPress,
}: ProductCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.content}>
          <AOSImage
            generalStyle={styles.imageStyle}
            imageSize={styles.imageSize}
            resizeMode="contain"
            metaFile={picture}
            defaultIconSize={60}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.code}>{code}</Text>
            <Badge
              color={
                availableStock == null
                  ? Colors.secondaryColor
                  : availableStock > 0
                  ? Colors.primaryColor
                  : Colors.errorColor
              }
              title={
                availableStock == null
                  ? `${I18n.t('Stock_Calculing')}...`
                  : availableStock > 0
                  ? I18n.t('Stock_Available')
                  : I18n.t('Stock_Unavailable')
              }
            />
          </View>
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor.background_light}
          size={20}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  imageSize: {
    height: 60,
    width: 60,
  },
  imageStyle: {
    marginRight: 30,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 14,
  },
});

export default ProductCard;
