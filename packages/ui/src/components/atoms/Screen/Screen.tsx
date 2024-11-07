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

import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, Keyboard, StyleSheet, View} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {ThemeColors, useThemeColor} from '../../../theme';
import {useConfig} from '../../../config/ConfigContext';

interface ScreenProps {
  style?: any;
  children: any;
  fixedItems?: any;
  removeSpaceOnTop?: boolean;
  loading?: boolean;
}

const immersiveMode = async () => {
  await SystemNavigationBar.navigationHide();
};

const Screen = ({
  style,
  children,
  fixedItems,
  removeSpaceOnTop = false,
  loading = false,
}: ScreenProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const {showActivityIndicator} = useConfig();

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      immersiveMode,
    );

    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  useEffect(() => {
    immersiveMode();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View
      pointerEvents={showActivityIndicator === true ? 'none' : 'auto'}
      style={[
        styles.container,
        removeSpaceOnTop ? null : styles.marginTop,
        style,
      ]}>
      {children}
      {React.Children.count(fixedItems) > 0 && (
        <View style={[styles.fixedContainer, styles.smallTopShadow]}>
          {fixedItems}
        </View>
      )}
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.screenBackgroundColor,
      flex: 1,
    },
    fixedContainer: {
      width: '100%',
      alignContent: 'flex-end',
      alignSelf: 'flex-end',
      backgroundColor: Colors.backgroundColor,
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
    },
    smallTopShadow: {
      borderTopWidth: 0.5,
      borderRightWidth: 1,
      borderLeftWidth: 0.5,
      borderTopColor: 'rgba(0,0,0,0.1)',
      borderRightColor: 'rgba(0,0,0,0.2)',
      borderLeftColor: 'rgba(0,0,0,0.1)',
      elevation: 24,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
    marginTop: {
      paddingTop: '1.5%',
    },
  });

export default Screen;
