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

import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Card, Icon} from '../../atoms';

interface Anchor {
  top: number;
  left: number;
  width: number;
  height: number;
}

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
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  const wrapperRef = useRef<View>(null);

  const closeMenu = useCallback(() => {
    setVisible(false);
    setAnchor(null);
  }, []);

  const openMenu = useCallback(() => {
    wrapperRef.current?.measureInWindow?.((left, top, width, height) =>
      setAnchor({left, top, width, height}),
    );
    setVisible(true);
  }, []);

  const menuItems = useMemo(
    () =>
      React.Children.map(children, child => {
        if (!React.isValidElement<any>(child)) return child;

        const onPress = child.props?.onPress;

        if (typeof onPress !== 'function') return child;

        return React.cloneElement(child, {
          onPress: () => {
            closeMenu();
            requestAnimationFrame(onPress);
          },
        });
      }),
    [children, closeMenu],
  );

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
        onPress={visible ? closeMenu : openMenu}
        testID="dropdownMenuTouchable"
        activeOpacity={0.9}>
        {iconWrapper != null ? iconWrapper(icon) : icon}
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent={true}
        animationType="none"
        onRequestClose={closeMenu}>
        <Pressable
          style={styles.backdrop}
          onPress={closeMenu}
          testID="dropdownMenuBackdrop"
        />
        <View
          pointerEvents="box-none"
          style={[
            styles.anchor,
            anchor,
            anchor == null && styles.notPositioned,
          ]}>
          <Card style={[styles.menuContainer, styleMenu]}>{menuItems}</Card>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  anchor: {
    position: 'absolute',
  },
  notPositioned: {
    opacity: 0,
  },
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
