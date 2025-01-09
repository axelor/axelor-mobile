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

import React, {useMemo, useCallback} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import {useThemeColor} from '../../../theme/ThemeContext';
import BootstrapIcon from '../BootstrapIcon/BootstrapIcon';

interface IconProps {
  style?: any;
  name: string;
  /**
   * @deprecated The prop should not be used anymore. FontAwesome icons will be removed in next version.
   */
  isFontAwesome4?: boolean;
  /**
   * @deprecated The prop should not be used anymore. FontAwesome icons will be removed in next version.
   */
  isFontAwesome5?: boolean;
  color?: string;
  size?: number;
  touchable?: boolean;
  visible?: boolean;
  onPress?: () => void;
}

const Icon = ({
  style,
  name,
  isFontAwesome4 = false,
  isFontAwesome5 = false,
  color,
  size = 18,
  touchable = false,
  visible = true,
  onPress = () => {},
}: IconProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(
      color == null ? Colors.secondaryColor_dark.background : color,
      size,
    );
  }, [Colors, color, size]);

  const renderIcon = useCallback(() => {
    if (isFontAwesome5 && Platform.OS !== 'web') {
      return <Icon5 name={name} style={styles.icon} />;
    } else if (isFontAwesome4) {
      return <Icon4 name={name} style={styles.icon} />;
    } else {
      return <BootstrapIcon name={name} size={size} color={color} />;
    }
  }, [color, isFontAwesome4, isFontAwesome5, name, size, styles]);

  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!touchable}>
      {renderIcon()}
    </TouchableOpacity>
  );
};

const getStyles = (color, size) =>
  StyleSheet.create({
    icon: {
      color: color,
      fontSize: size,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Icon;
