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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ThemeColors, useThemeColor} from '../../../theme';

interface CardProps {
  style?: any;
  children: any;
}

const Card = ({style, children}: CardProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View testID="cardContainer" style={[styles.container, style]}>
      {children}
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 24,
      paddingRight: 32,
      paddingVertical: 16,
      borderRadius: 14,
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
      backgroundColor: Colors.backgroundColor,
    },
  });

export default Card;
