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

import React, {ReactElement, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Badge,
  Icon,
  type ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

interface HeaderOptionMenuItemProps {
  icon: string;
  color?: string;
  indicator?: number;
  hideIf: boolean;
  disableIf?: boolean;
  onPress: () => void;
  customComponent?: ReactElement<any>;
}

const BADGE_SIZE = 16;

const HeaderOptionMenuItem = ({
  icon,
  color,
  indicator = 0,
  hideIf = false,
  disableIf = false,
  onPress,
  customComponent,
}: HeaderOptionMenuItemProps) => {
  const Colors = useThemeColor();

  const _color = useMemo(() => {
    if (color != null) {
      return color;
    }

    if (disableIf) {
      return Colors.secondaryColor.background;
    }

    return Colors.primaryColor.background;
  }, [Colors, color, disableIf]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  if (hideIf) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disableIf}
      activeOpacity={0.7}>
      {customComponent != null ? (
        React.cloneElement(customComponent)
      ) : (
        <Icon name={icon} color={_color} size={18} />
      )}
      {indicator > 0 && (
        <Badge
          style={styles.badge}
          txtStyle={styles.badgeText}
          color={{
            background_light: Colors.errorColor.background,
            foreground: Colors.backgroundColor,
            background: Colors.errorColor.background,
          }}
          title={indicator}
        />
      )}
    </TouchableOpacity>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    badge: {
      width: BADGE_SIZE,
      height: BADGE_SIZE,
      borderRadius: Math.ceil(BADGE_SIZE / 2),
      position: 'absolute',
      top: -6,
      right: -4,
      zIndex: 10,
    },
    badgeText: {
      fontSize: Math.ceil(BADGE_SIZE / 1.8),
      fontWeight: 600,
    },
    container: {
      marginLeft: 8,
      padding: 10,
      borderRadius: 10,
      backgroundColor: Colors.backgroundColor,
      flexDirection: 'row',
    },
  });

export default HeaderOptionMenuItem;
