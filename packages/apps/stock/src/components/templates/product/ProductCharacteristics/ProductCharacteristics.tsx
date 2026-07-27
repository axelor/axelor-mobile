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
import {StyleSheet} from 'react-native';
import {ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useMetafileUri,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface ProductCharacteristicsProps {
  style?: any;
  name: string;
  code: string;
  picture?: any;
  productCategory?: any;
  procurementMethodSelect?: string;
  isPrototype?: boolean;
  isUnrenewed?: boolean;
}

const ProductCharacteristics = ({
  style,
  name,
  code,
  picture,
  productCategory,
  procurementMethodSelect,
  isPrototype,
  isUnrenewed,
}: ProductCharacteristicsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatMetaFile = useMetafileUri();
  const {Product} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  return (
    <ObjectCard
      style={style}
      touchable={false}
      showArrow={false}
      image={{
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 80,
        source: formatMetaFile(picture?.id),
      }}
      upperTexts={{
        items: [{displayText: name, isTitle: true}, {displayText: code}],
      }}
      lowerBadges={{
        style: styles.badgeContainer,
        items: [
          {
            showIf: productCategory != null,
            displayText: productCategory?.name,
            color: Colors.primaryColor,
          },
          {
            showIf: procurementMethodSelect != null,
            displayText: getItemTitle(
              Product?.procurementMethodSelect,
              procurementMethodSelect,
            ),
            color: Colors.plannedColor,
          },
          {
            showIf: isPrototype,
            displayText: I18n.t('Stock_Prototype'),
            color: Colors.priorityColor,
          },
          {
            showIf: isUnrenewed,
            displayText: I18n.t('Stock_Unrenewed'),
            color: Colors.cautionColor,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  imageSize: {
    height: 80,
    width: 80,
  },
  badgeContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ProductCharacteristics;
