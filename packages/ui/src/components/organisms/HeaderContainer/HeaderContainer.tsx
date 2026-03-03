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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {animationUtil} from '../../../tools/AnimationUtil';
import {useConfig} from '../../../config/ConfigContext';
import {Icon} from '../../atoms';
import {ThemeColors, useThemeColor} from '../../../theme';

interface HeaderContainerProps {
  style?: any;
  topChildren?: any;
  children?: any;
  fixedItems?: any;
  chipComponent?: any;
  expandableFilter?: boolean;
  forceHideByDefault?: boolean;
}

const HeaderContainer = ({
  style,
  topChildren,
  children,
  fixedItems = null,
  chipComponent = null,
  expandableFilter = true,
  forceHideByDefault = false,
}: HeaderContainerProps) => {
  const {showFilter} = useConfig();
  const [isVisible, setVisible] = useState(
    forceHideByDefault ? false : showFilter,
  );
  const Colors = useThemeColor();

  useEffect(() => {
    setVisible(forceHideByDefault ? false : showFilter);
  }, [forceHideByDefault, showFilter]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handleExpandPress = useCallback(() => {
    animationUtil.animateNext();
    setVisible(!isVisible);
  }, [isVisible]);

  return (
    <View style={[styles.container, style]} testID="headerContainerWrapper">
      <View pointerEvents="none" style={styles.topMask} />
      {expandableFilter && isVisible && topChildren}
      {fixedItems}
      {expandableFilter && isVisible && children}
      {chipComponent}
      {expandableFilter && (
        <TouchableOpacity
          onPress={handleExpandPress}
          testID="headerContainerExpandableIcon">
          <View style={styles.arrowContainer}>
            <Icon
              name={isVisible ? 'chevron-up' : 'chevron-down'}
              size={22}
              color={Colors.primaryColor.background}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: Colors.backgroundColor,
      elevation: 6,
      shadowColor: Colors.secondaryColor.background,
      shadowOpacity: 0.12,
      shadowRadius: 6,
      shadowOffset: {width: 0, height: 4},
      paddingBottom: 5,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
      zIndex: 10,
    },
    topMask: {
      position: 'absolute',
      top: -10,
      left: 0,
      right: 0,
      height: 12,
      backgroundColor: Colors.backgroundColor,
    },
    arrowContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default HeaderContainer;
