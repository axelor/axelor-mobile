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
import {View, StyleSheet, Platform} from 'react-native';
import {ThemeColors, useThemeColor} from '../../../theme';

interface DottedLineProps {
  style?: any;
}

function DottedLine({style}: DottedLineProps) {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);
  return <View testID="dottedLine" style={[styles.dottedLine, style]} />;
}

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    dottedLine: {
      borderStyle: Platform.OS === 'ios' ? 'solid' : 'dotted',
      height: 35,
      borderLeftWidth: 2,
      borderColor: Colors.secondaryColor_dark.background,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default DottedLine;
