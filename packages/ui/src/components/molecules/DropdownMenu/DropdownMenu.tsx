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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  OUTSIDE_INDICATOR,
  useClickOutside,
} from '../../../hooks/use-click-outside';
import {ThemeColors, useThemeColor} from '../../../theme';
import {Card, Icon} from '../../atoms';

interface DropdownMenuProps {
  style?: any;
  styleMenu?: any;
  children: any;
}

const DropdownMenu = ({style, styleMenu, children}: DropdownMenuProps) => {
  const [visible, setVisible] = useState(false);
  const Colors = useThemeColor();

  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({wrapperRef});

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && visible) {
      setVisible(false);
    }
  }, [clickOutside, visible]);

  return (
    <View style={style} ref={wrapperRef}>
      <TouchableOpacity
        testID="dropdownMenuToggle"
        style={styles.action}
        onPress={() => {
          setVisible(!visible);
        }}>
        <Icon
          name="three-dots-vertical"
          color={Colors.primaryColor.background}
          size={22}
        />
      </TouchableOpacity>
      {visible && (
        <Card
          testID="dropdownMenuContent"
          style={[styles.menuContainer, styleMenu]}>
          {children}
        </Card>
      )}
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    menuContainer: {
      width: 255,
      top: 30,
      right: -12,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      position: 'absolute',
      elevation: 6,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
    action: {padding: 5, paddingLeft: 15},
  });

export default DropdownMenu;
