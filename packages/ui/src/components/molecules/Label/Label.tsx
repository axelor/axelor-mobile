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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {Icon, Text} from '../../atoms';
import {hexToRgb} from '../../../utils/commons-utlis';

type LabelType = 'info' | 'success' | 'danger' | 'error';

type TypeConfig = {
  color: Color;
  iconName: string;
};

interface LabelProps {
  style?: any;
  message: string;
  type?: LabelType;
  iconName?: string;
  color?: Color;
  visible?: boolean;
  showClose?: boolean;
  onClose?: () => void;
}

const Label = ({
  style,
  message,
  type = 'error',
  iconName,
  color,
  visible = true,
  showClose = false,
  onClose = () => {},
}: LabelProps) => {
  const Colors = useThemeColor();

  const [isVisible, setIsVisible] = useState(visible);

  const typeConfig: TypeConfig = useMemo(() => {
    let config: TypeConfig = null;

    switch (type) {
      case 'error':
        config = {
          color: Colors.errorColor,
          iconName: 'exclamation-triangle-fill',
        };
        break;
      case 'danger':
        config = {
          color: Colors.cautionColor,
          iconName: 'exclamation-circle-fill',
        };
        break;
      case 'info':
        config = {color: Colors.infoColor, iconName: 'info-circle-fill'};
        break;
      case 'success':
        config = {color: Colors.successColor, iconName: 'check-circle-fill'};
        break;
      default:
        config = {color: null, iconName: null};
        break;
    }

    if (color != null) {
      config.color = color;
    }

    if (iconName != null) {
      config.iconName = iconName;
    }

    return {...config};
  }, [Colors, color, iconName, type]);

  const styles = useMemo(() => {
    return getStyles(typeConfig?.color);
  }, [typeConfig]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    setIsVisible(_current => {
      if (visible == null || _current === visible) {
        return _current;
      }

      return visible;
    });
  }, [visible]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={[styles.container, style]} testID="labelContainer">
      <Icon name={typeConfig?.iconName} color={typeConfig?.color?.foreground} />
      <Text style={styles.text}>{message}</Text>
      {showClose && (
        <Icon
          name="x-lg"
          color={typeConfig?.color?.foreground}
          touchable={true}
          onPress={handleClose}
        />
      )}
    </View>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      width: '100%',
      borderColor: color?.background_light,
      borderWidth: 1,
      borderRadius: 7,
      backgroundColor: `rgba(${hexToRgb(color?.background_light)}, 0.4)`,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 10,
      marginHorizontal: 0,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    text: {
      marginLeft: 10,
      color: color?.foreground,
      alignSelf: 'center',
      flex: 1,
    },
  });

export default Label;
