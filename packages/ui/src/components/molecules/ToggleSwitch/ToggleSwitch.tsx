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

import React, {ReactElement, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ThemeColors, useThemeColor} from '../../../theme';
import {Text} from '../../atoms';
import {getCommonStyles} from '../../../utils';

interface ToggleSwitchProps {
  styleContainer?: any;
  styleToogle?: any;
  leftTitle: string;
  leftElement?: ReactElement | React.JSX.Element;
  rightTitle: string;
  rigthElement?: ReactElement | React.JSX.Element;
  onSwitch: () => void;
}

const ToggleSwitch = ({
  styleContainer,
  styleToogle,
  leftTitle,
  leftElement,
  rightTitle,
  rigthElement,
  onSwitch = () => {},
}: ToggleSwitchProps) => {
  const Colors = useThemeColor();

  const [active, setActive] = useState(true);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const onLeftPress = () => {
    setActive(true);
    onSwitch();
  };

  const onRightPress = () => {
    setActive(false);
    onSwitch();
  };

  return (
    <View
      style={[
        commonStyles.filter,
        commonStyles.filterSize,
        styles.container,
        styleContainer,
      ]}
      testID="toggleSwitchContainer">
      <TouchableOpacity
        style={[styles.toggle, active && styles.active, styleToogle]}
        disabled={active}
        onPress={onLeftPress}
        testID="toggleSwitchLeftButton">
        <Text>{leftTitle}</Text>
        {leftElement != null && React.cloneElement(leftElement)}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggle, !active && styles.active, styleToogle]}
        disabled={!active}
        onPress={onRightPress}
        testID="toggleSwitchRightButton">
        <Text>{rightTitle}</Text>
        {rigthElement != null && React.cloneElement(rigthElement)}
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderColor: Colors.secondaryColor.background_light,
      borderWidth: 2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      margin: 5,
      padding: 2,
    },
    toggle: {
      width: '54%',
      height: 40,
      borderRadius: 7,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    active: {
      backgroundColor: Colors.primaryColor.background_light,
    },
  });

export default ToggleSwitch;
