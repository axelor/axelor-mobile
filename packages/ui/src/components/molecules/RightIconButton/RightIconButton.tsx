/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Text} from '../../atoms';
import {ThemeColors, useThemeColor} from '../../../theme';
import {checkNullString} from '../../../utils';

interface RightIconProps {
  style?: any;
  styleText?: any;
  onPress: (any) => void;
  title?: string;
  icon: React.ReactNode;
  placeholder?: string;
}

const RightIconButton = ({
  style,
  styleText,
  onPress = () => {},
  title = null,
  icon,
  placeholder,
}: RightIconProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const displayPlaceholder = useMemo(() => {
    return checkNullString(title) && !checkNullString(placeholder);
  }, [placeholder, title]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <Text
          style={[
            styleText,
            styles.text,
            displayPlaceholder && styles.placeholder,
          ]}
          numberOfLines={2}>
          {!checkNullString(title) ? title : displayPlaceholder && placeholder}
        </Text>
        {icon}
      </Card>
    </TouchableOpacity>
  );
};
const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width * 0.35,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 15,
      paddingVertical: 5,
      marginVertical: 4,
      marginRight: 16,
      borderRadius: 7,
    },
    text: {
      textAlign: 'center',
    },
    placeholder: {
      color: Colors.placeholderTextColor,
    },
  });

export default RightIconButton;
