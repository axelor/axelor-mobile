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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {checkNullString} from '../../../utils';
import {Icon, Text} from '../../atoms';

interface CheckboxProps {
  style?: any;
  styleTxt?: any;
  iconColor?: string;
  iconSize?: number;
  disabled?: boolean;
  title?: string;
  isDefaultChecked?: boolean;
  isDefaultPartialChecked?: boolean;
  onChange: (_v: boolean) => void;
}

const Checkbox = ({
  style,
  styleTxt,
  iconColor,
  iconSize = 15,
  disabled = false,
  title,
  isDefaultChecked = false,
  isDefaultPartialChecked = false,
  onChange,
}: CheckboxProps) => {
  const Colors = useThemeColor();

  const [isChecked, setIsChecked] = useState<boolean>(isDefaultChecked);
  const [isPartialChecked, setIsPartialChecked] = useState<boolean>(
    isDefaultPartialChecked,
  );

  const iconName = useMemo(() => {
    if (isChecked) {
      return 'check-square-fill';
    } else if (isPartialChecked) {
      return 'dash-square-fill';
    } else {
      return 'square';
    }
  }, [isChecked, isPartialChecked]);

  const _iconColor = useMemo(() => {
    if (disabled) Colors.secondaryColor.background;

    return iconColor != null ? iconColor : Colors.primaryColor.background;
  }, [Colors, disabled, iconColor]);

  const handleToggle = () => {
    onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsChecked(isDefaultChecked);
  }, [isDefaultChecked]);

  useEffect(() => {
    setIsPartialChecked(isDefaultPartialChecked);
  }, [isDefaultPartialChecked]);

  return (
    <View style={[styles.container, style]} testID="checkboxContainer">
      <Icon
        name={iconName}
        color={_iconColor}
        size={iconSize}
        touchable={!disabled}
        onPress={handleToggle}
      />
      {!checkNullString(title) && (
        <Text style={[styles.title, styleTxt]}>{title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    // fontWeight: '600',
  },
});

export default Checkbox;
