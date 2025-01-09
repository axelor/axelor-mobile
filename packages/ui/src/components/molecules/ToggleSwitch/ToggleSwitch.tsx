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

import React, {useMemo, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Text} from '../../atoms';

interface ToggleSwitchProps {
  styleContainer?: any;
  styleToogle?: any;
  leftTitle: string;
  rightTitle: string;
  onSwitch: () => void;
}

const ToggleSwitch = ({
  styleContainer,
  styleToogle,
  leftTitle,
  rightTitle,
  onSwitch = () => {},
}: ToggleSwitchProps) => {
  const Colors = useThemeColor();
  const [active, setActive] = useState(true);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const onLeftPress = () => {
    setActive(true);
    onSwitch();
  };

  const onRightPress = () => {
    setActive(false);
    onSwitch();
  };

  return (
    <View style={[styles.container, styleContainer]}>
      <TouchableOpacity
        style={[styles.toggle, active && styles.active, styleToogle]}
        disabled={active}
        onPress={onLeftPress}>
        <Text>{leftTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggle, !active && styles.active, styleToogle]}
        disabled={!active}
        onPress={onRightPress}>
        <Text>{rightTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      borderColor: Colors.secondaryColor.background_light,
      borderWidth: 2,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      padding: 2,
    },
    toggle: {
      width: Dimensions.get('window').width * 0.47,
      padding: 5,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundColor: Colors.primaryColor.background_light,
    },
  });
export default ToggleSwitch;
