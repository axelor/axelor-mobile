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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  ObjectCard,
  TextUnit,
  usePriceFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useNavigation} from '@axelor/aos-mobile-core';

interface RequestLineCardProps {
  style?: any;
  productName?: string;
  unit?: string;
  qty?: string;
  newProduct?: boolean;
  id: number;
}

const RequestLineCard = ({
  style,
  productName,
  unit,
  qty,
  newProduct,
  id,
}: RequestLineCardProps) => {
  const priceFormat = usePriceFormat();
  const navigation = useNavigation();
  const Colors = useThemeColor();

  const borderStyle = useMemo(() => {
    if (newProduct) {
      return getStyles(Colors.plannedColor.background)?.border;
    }
  }, [Colors.plannedColor.background, newProduct]);

  return (
    <ObjectCard
      onPress={() => {
        navigation.navigate('RequestLineFormScreen', {
          purchaseRequestLineId: id,
        });
      }}
      style={[borderStyle, style]}
      leftContainerFlex={3}
      iconLeftMargin={5}
      upperTexts={{
        items: [{isTitle: true, displayText: productName}],
      }}
      sideBadges={{
        items: [
          {
            customComponent: (
              <TextUnit unit={unit} value={priceFormat(qty)} fontSize={20} />
            ),
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    border: {borderLeftWidth: 7, borderLeftColor: color},
  });

export default RequestLineCard;
