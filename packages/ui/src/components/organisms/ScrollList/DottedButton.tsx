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
import {StyleSheet, TouchableOpacity} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon, Text} from '../../atoms';
import {Color} from '../../../theme/themes';

export interface DottedButtonProps {
  iconName: string;
  title: string;
  color?: Color;
  vertical?: boolean;
  onPress: () => void;
}

const DottedButton = ({
  iconName,
  title,
  color,
  vertical = false,
  onPress = () => {},
}: DottedButtonProps) => {
  const Colors = useThemeColor();

  const buttonColor = useMemo(
    () => (color != null ? color : Colors.secondaryColor),
    [color, Colors],
  );

  const styles = useMemo(() => {
    return getStyles(buttonColor, vertical);
  }, [buttonColor, vertical]);

  const commonStyles = useMemo(() => {
    return getCommonStyles(Colors);
  }, [Colors]);

  return (
    <TouchableOpacity
      style={[commonStyles.button, styles.button]}
      onPress={onPress}>
      <Icon
        style={styles.icon}
        name={iconName}
        size={28}
        color={buttonColor.background}
      />
      <Text
        style={styles.text}
        fontSize={18}
        textColor={buttonColor.background}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (color: Color, vertical: boolean) =>
  StyleSheet.create({
    button: {
      flexDirection: vertical ? 'column' : 'row',
      width: vertical ? '49%' : '100%',
      height: 'auto',
      justifyContent: 'flex-start',
      alignSelf: 'stretch',
      marginBottom: 0,
      borderStyle: 'dotted',
      borderColor: color.background,
    },
    icon: {
      flex: 0,
      marginHorizontal: vertical ? 0 : 5,
    },
    text: {
      flex: vertical ? 0 : 1,
      marginLeft: vertical ? 0 : 15,
      marginTop: vertical ? 5 : 0,
    },
  });

export default DottedButton;
