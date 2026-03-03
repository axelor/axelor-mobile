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
import {ActivityIndicator, Keyboard, StyleSheet, View} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {ThemeColors, useThemeColor} from '../../../theme';
import {useConfig} from '../../../config/ConfigContext';

interface ScreenProps {
  style?: any;
  children: any;
  fixedItems?: any;
  removeSpaceOnTop?: boolean;
  hideButtonBackground?: boolean;
  loading?: boolean;
}

const FIXED_CONTAINER_PADDING_VERTICAL = 10;
const FIXED_ITEMS_NOT_DISPLAY_HEIGHT = FIXED_CONTAINER_PADDING_VERTICAL * 2 + 1;

const immersiveMode = async () => {
  await SystemNavigationBar.navigationHide();
};

const Screen = ({
  style,
  children,
  fixedItems,
  removeSpaceOnTop = false,
  loading = false,
  hideButtonBackground = false,
}: ScreenProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const {showActivityIndicator} = useConfig();

  const [fixedItemsHeight, setFixedItemsHeight] = useState(0);

  const onLayout = event => {
    const {height} = event.nativeEvent.layout;
    setFixedItemsHeight(height);
  };

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
    return <ActivityIndicator testID="loadingIndicator" size="large" />;
  }

  return (
    <View
      testID="screenRoot"
      pointerEvents={showActivityIndicator === true ? 'none' : 'auto'}
      style={[
        styles.container,
        removeSpaceOnTop ? null : styles.marginTop,
        style,
      ]}>
      <View style={styles.childrenContainer}>{children}</View>
      {!!fixedItems && (
        <View
          testID="screenFixedItemsContainer"
          style={
            fixedItemsHeight > FIXED_ITEMS_NOT_DISPLAY_HEIGHT && [
              styles.fixedContainer,
              !hideButtonBackground && styles.smallTopShadow,
            ]
          }
          onLayout={onLayout}>
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
    childrenContainer: {
      flex: 1,
    },
    fixedContainer: {
      width: '100%',
      alignContent: 'flex-end',
      alignSelf: 'flex-end',
      backgroundColor: Colors.backgroundColor,
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
      paddingVertical: FIXED_CONTAINER_PADDING_VERTICAL,
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
