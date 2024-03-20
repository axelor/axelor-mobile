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

import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Color, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {HeaderBandHelper} from '../../../header';

interface HeaderBandProps {
  color: Color;
  text: string;
  showIf: boolean;
}

const HeaderBand = ({color, text, showIf}: HeaderBandProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(
    () => getStyles(color || Colors.secondaryColor),
    [Colors, color],
  );

  if (!showIf) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.text}>
        {text}
      </Text>
    </View>
  );
};

const getStyles = (color: Color) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('screen').width,
      backgroundColor: color.background_light,
      justifyContent: 'center',
      alignItems: 'center',
      height: HeaderBandHelper.bandHeight,
    },
    text: {
      maxWidth: '80%',
      textAlign: 'center',
      fontSize: 12,
      paddingVertical: 3,
      color: color.foreground,
    },
  });

export default HeaderBand;
