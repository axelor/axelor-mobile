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
import {Text} from '../../atoms';
import {Color, useThemeColor} from '../../../theme';

export interface BottomIndicator {
  text: string;
}
export interface BottomSeparatorProps extends BottomIndicator {}

const BottomSeparator = ({text}: BottomSeparatorProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors.secondaryColor), [Colors]);

  return (
    <View style={styles.separatorContainer} testID="bottomSeparatorContainer">
      <Text>{text}</Text>
    </View>
  );
};

const getStyles = (color: Color) =>
  StyleSheet.create({
    separatorContainer: {
      width: '90%',
      height: 30,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: color.background,
      backgroundColor: color.background_light,
    },
  });

export default BottomSeparator;
