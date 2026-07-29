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

import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {Color, useThemeColor} from '../../../theme';
import {Icon, Text} from '../../atoms';

export interface DottedButtonProps {
  iconName: string;
  title: string;
  color?: Color;
  horizontal?: boolean;
  onPress: () => void;
}

const DottedButton = ({
  iconName,
  title,
  color,
  horizontal = false,
  onPress,
}: DottedButtonProps) => {
  const Colors = useThemeColor();

  const buttonColor = useMemo(
    () => (color != null ? color : Colors.secondaryColor),
    [color, Colors],
  );

  const styles = useMemo(
    () => getStyles(buttonColor, horizontal),
    [buttonColor, horizontal],
  );
  const commonStyles = useMemo(() => getCommonStyles(), []);

  return (
    <TouchableOpacity
      style={[commonStyles.button, styles.button]}
      onPress={onPress}
      activeOpacity={0.9}
      testID="dottedButtonContainer">
      <Icon name={iconName} size={20} color={buttonColor.background} />
      <Text
        style={styles.text}
        fontSize={16}
        textColor={buttonColor.background}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (color: Color, horizontal: boolean) =>
  StyleSheet.create({
    button: {
      flexDirection: horizontal ? 'row' : 'column',
      width: horizontal ? '100%' : '49%',
      height: 'auto',
      justifyContent: 'flex-start',
      alignSelf: 'stretch',
      borderStyle: 'dotted',
      borderColor: color.background,
      paddingVertical: 10,
      gap: 5,
      marginVertical: 0,
    },
    text: {
      flex: 1,
    },
  });

export default DottedButton;
