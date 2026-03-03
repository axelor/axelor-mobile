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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Badge, Card, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  AOSImage,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface ProductCharacteristicsProps {
  style?: any;
  picture?: any;
  onPressImage: () => void;
  name: string;
  code: string;
  category: string;
  procurMethod: string;
  prototype: boolean;
  unrenewed: boolean;
}

const ProductCharacteristics = ({
  style,
  picture,
  onPressImage,
  name,
  code,
  category,
  procurMethod,
  prototype,
  unrenewed,
}: ProductCharacteristicsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {Product} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onPressImage}>
          <AOSImage
            generalStyle={styles.imageStyle}
            imageSize={styles.imageSize}
            resizeMode="contain"
            metaFile={picture}
            defaultIconSize={120}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.code}>{code}</Text>
        </View>
      </View>
      <View style={styles.states}>
        {category && <Badge color={Colors.primaryColor} title={category} />}
        {procurMethod && (
          <Badge
            color={Colors.plannedColor}
            title={getItemTitle(Product?.procurementMethodSelect, procurMethod)}
          />
        )}
        {prototype && (
          <Badge
            color={Colors.priorityColor}
            title={I18n.t('Stock_Prototype')}
          />
        )}
        {unrenewed && (
          <Badge
            color={Colors.cautionColor}
            title={I18n.t('Stock_Unrenewed')}
          />
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: null,
  },
  content: {
    flexDirection: 'row',
  },
  states: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageSize: {
    height: 120,
    width: 120,
  },
  imageStyle: {
    marginRight: 32,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 14,
  },
});

export default ProductCharacteristics;
