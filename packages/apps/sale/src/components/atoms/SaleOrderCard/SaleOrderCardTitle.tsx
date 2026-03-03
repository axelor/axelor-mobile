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
import {useTranslator} from '@axelor/aos-mobile-core';
import {InfoBubble, Text, useThemeColor} from '@axelor/aos-mobile-ui';

interface SaleOrderCardTitleProps {
  title: string;
  isIconVisible: boolean;
}

const SaleOrderCardTitle = ({
  title,
  isIconVisible,
}: SaleOrderCardTitleProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      {isIconVisible && (
        <InfoBubble
          style={styles.infoBubble}
          iconName="exclamation-triangle-fill"
          badgeColor={Colors.warningColor}
          indication={I18n.t('Sale_OrderBeingEdited')}
          coloredBubble={false}
        />
      )}
      <Text writingType="title">{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  infoBubble: {
    marginRight: 8,
  },
});

export default SaleOrderCardTitle;
