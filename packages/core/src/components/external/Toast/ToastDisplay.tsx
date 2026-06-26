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
import {ToastConfigParams} from 'react-native-toast-message';
import {BorderBar, IconTile, Text, useThemeColor} from '@axelor/aos-mobile-ui';

const ToastDisplay = ({type, text1, text2}: ToastConfigParams<any>) => {
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
    <View style={styles.container}>
      <BorderBar style={styles.border} color={typeColor.background} />
      <IconTile
        icon={iconName}
        iconSize={20}
        size={40}
        borderRadius={12}
        backgroundColor={`${typeColor.background}25`}
        iconColor={typeColor.background}
      />
      <View style={styles.textContainer}>
        <Text
          writingType="title"
          textColor={typeColor.background}
          numberOfLines={1}>
          {text1}
        </Text>
        {text2 != null && (
          <Text writingType="subtitle" numberOfLines={3}>
            {text2}
          </Text>
        )}
      </View>
    </View>
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
      borderWidth: 1,
      borderColor,
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.15,
      shadowRadius: 8,
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
