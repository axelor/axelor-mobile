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
import {StyleSheet, View} from 'react-native';
import {Color, ThemeColors, useThemeColor} from '../../../theme';
import {Text} from '../../atoms';
import {CircleButton} from '../../molecules';
import {MIN_ACTION_BUTTON_WIDTH} from './types';
import Indicator from './Indicator';

const FloatingActionButton = ({
  title,
  iconName,
  color,
  size,
  margin = 0,
  disabled = false,
  indicator = false,
  onPress,
  translator,
  useCircleStyle = false,
}: {
  title: string;
  iconName: string;
  color: Color;
  size: number;
  margin?: number;
  disabled?: boolean;
  indicator?: boolean;
  onPress: () => void;
  translator: (translationKey: string) => string;
  useCircleStyle?: boolean;
}) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={styles.actionButtonContainer}>
      <CircleButton
        testID={`action-button-${iconName}`}
        iconName={iconName}
        size={size}
        color={color}
        onPress={onPress}
        disabled={disabled}
        square={!useCircleStyle}
        style={styles.button}
      />
      <Indicator show={indicator} color={Colors.errorColor} />
      {title != null ? (
        <View style={[styles.actionTitleContainer, {right: size + margin * 2}]}>
          <View style={styles.actionTitle}>
            <Text
              fontSize={16}
              style={styles.actionTitleText}
              numberOfLines={2}>
              {translator(title)}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    actionButtonContainer: {
      flexDirection: 'row-reverse',
      marginVertical: 2,
    },
    button: {
      marginVertical: 0,
    },
    actionTitleContainer: {
      width: MIN_ACTION_BUTTON_WIDTH,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      position: 'absolute',
    },
    actionTitle: {
      backgroundColor: Colors.backgroundColor,
      borderRadius: 7,
      paddingHorizontal: 10,
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
    actionTitleText: {
      textAlign: 'center',
    },
  });

export default FloatingActionButton;
