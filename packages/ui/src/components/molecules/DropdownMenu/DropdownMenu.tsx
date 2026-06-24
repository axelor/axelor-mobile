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

import React, {ReactElement, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useOutsideClickHandler} from '../../../hooks';
import {useThemeColor} from '../../../theme';
import {Card, Icon} from '../../atoms';

interface DropdownMenuProps {
  style?: any;
  styleMenu?: any;
  iconWrapper?: (icon: ReactElement) => ReactElement;
  children: any;
}

const DropdownMenu = ({
  style,
  styleMenu,
  iconWrapper,
  children,
}: DropdownMenuProps) => {
  const Colors = useThemeColor();

  const [visible, setVisible] = useState(false);

  const wrapperRef = useRef(null);
  const dropdownWrapperRef = useRef(null);
  useOutsideClickHandler({
    wrapperRef: [wrapperRef, dropdownWrapperRef],
    handleOutsideClick: () => setVisible(false),
    activationCondition: visible,
  });

  const icon = (
    <Icon
      name="three-dots-vertical"
      color={Colors.primaryColor.background}
      size={18}
    />
  );

  return (
    <View style={style} ref={wrapperRef} testID="dropdownMenuContainer">
      <TouchableOpacity
        style={iconWrapper == null ? styles.action : undefined}
        onPress={() => setVisible(!visible)}
        testID="dropdownMenuTouchable"
        activeOpacity={0.9}>
        {iconWrapper != null ? iconWrapper(icon) : icon}
      </TouchableOpacity>
      {visible && (
        <Card
          wrapperRef={dropdownWrapperRef}
          style={[styles.menuContainer, styleMenu]}>
          {children}
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: 255,
    top: 45,
    right: 0,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingRight: 10,
    paddingVertical: 5,
    position: 'absolute',
  },
  action: {
    padding: 5,
    paddingLeft: 15,
  },
});

export default DropdownMenu;
