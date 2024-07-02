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
import {FloatingButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

const ProductFloatingButton = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <FloatingButton
      style={styles.floatingButton}
      translator={I18n.t}
      actions={[
        {
          key: 1,
          title: 'Sale_SeeComplementaryProducts',
          onPress: () => {},
          iconName: 'diagram-3-fill',
          color: Colors.plannedColor,
        },
        {
          key: 2,
          title: 'Sale_SeeVariantProducts',
          onPress: () => {},
          iconName: 'palette2',
          color: Colors.priorityColor,
        },
        {
          key: 3,
          title: 'Sale_SeePriceLists',
          onPress: () => {},
          iconName: 'currency-dollar',
          color: Colors.progressColor,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    zIndex: 40,
  },
});

export default ProductFloatingButton;
