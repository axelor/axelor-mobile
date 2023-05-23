/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {Text, ThemeColors, useThemeColor} from '@axelor/aos-mobile-ui';

const SessionNumberIndicator = ({number}) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={styles.bubble}>
      <Text>{number}</Text>
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    bubble: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.secondaryColor_dark.foreground,
      borderWidth: 2,
      borderColor: Colors.infoColor.background_light,
      borderRadius: Dimensions.get('window').width * 0.07,
      width: Dimensions.get('window').width * 0.07,
      height: Dimensions.get('window').width * 0.07,
      position: 'absolute',
      left: '-10%',
    },
  });

export default SessionNumberIndicator;
