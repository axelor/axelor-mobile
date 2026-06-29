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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ToastConfigParams} from 'react-native-toast-message';
import {
  addOpacityToHex,
  BorderBar,
  IconTile,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

const ToastDisplay = ({
  type,
  text1,
  text2,
  text1Style,
  text2Style,
  onPress,
}: ToastConfigParams<any>) => {
  const Colors = useThemeColor();

  const typeColor = useMemo(() => {
    switch (type) {
      case 'error':
        return Colors.errorColor;
      case 'success':
        return Colors.successColor;
      default:
        return Colors.secondaryColor;
    }
  }, [Colors, type]);

  const iconName = useMemo(() => {
    switch (type) {
      case 'error':
        return 'exclamation-lg';
      case 'success':
        return 'check-lg';
      default:
        return 'info-lg';
    }
  }, [type]);

  const styles = useMemo(
    () => getStyles(typeColor.background_light, typeColor.background),
    [typeColor],
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.container}>
        <BorderBar style={styles.border} color={typeColor.background} />
        <IconTile
          icon={iconName}
          iconSize={20}
          size={40}
          color={typeColor}
          backgroundColor={addOpacityToHex(typeColor.background, 0.4)}
        />
        <View style={styles.textContainer}>
          <Text
            writingType="title"
            textColor={typeColor.background}
            numberOfLines={1}
            style={text1Style}>
            {text1}
          </Text>
          {text2 != null && (
            <Text writingType="subtitle" numberOfLines={3} style={text2Style}>
              {text2}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (backgroundColor: string, borderColor: string) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      minHeight: 70,
      borderRadius: 12,
      backgroundColor,
      borderWidth: 0.5,
      borderColor,
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 10,
      elevation: 5,
    },
    border: {
      alignSelf: 'stretch',
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
  });

export default ToastDisplay;
