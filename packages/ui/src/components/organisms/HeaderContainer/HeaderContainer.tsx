/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  children?: any;
  fixedItems?: any;
  chipComponent?: any;
  expandableFilter?: boolean;
}

const HeaderContainer = ({
  style,
  children,
  fixedItems = null,
  chipComponent = null,
  expandableFilter = true,
}: HeaderContainerProps) => {
  const {showFilter} = useConfig();
  const [isVisible, setVisible] = useState(true);
  const Colors = useThemeColor();

  useEffect(() => {
    setVisible(showFilter);
  }, [showFilter]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handleExpandPress = useCallback(() => {
    animationUtil.animateNext();
    setVisible(!isVisible);
  }, [isVisible]);

  return (
    <View style={[styles.container, style]}>
      {fixedItems}
      {expandableFilter && isVisible && children}
      {chipComponent}
      {expandableFilter && (
        <TouchableOpacity onPress={handleExpandPress}>
          <View style={styles.arrowContainer}>
            <Icon
              name={isVisible ? 'angle-up' : 'angle-down'}
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
      elevation: 3,
      shadowOpacity: 3,
      zIndex: 2,
      paddingBottom: 5,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
    },
    arrowContainer: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default HeaderContainer;
