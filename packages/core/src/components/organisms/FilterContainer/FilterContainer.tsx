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
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useActiveFilter} from '../../../hooks/use-active-filter';
import {
  animationUtil,
  Icon,
  LabelText,
  ThemeColors,
  useConfig,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';

interface FilterContainerProps {
  style?: any;
  topChildren?: any;
  children?: any;
  fixedItems?: any;
  chipComponent?: any;
  expandableFilter?: boolean;
  forceHideByDefault?: boolean;
}

const FilterContainer = ({
  style,
  topChildren,
  children,
  fixedItems = null,
  chipComponent = null,
  expandableFilter = true,
  forceHideByDefault = false,
}: FilterContainerProps) => {
  const {showFilter} = useConfig();
  const {activeFilter, clearFilter} = useActiveFilter();
  const [isVisible, setVisible] = useState(
    forceHideByDefault ? false : showFilter,
  );
  const Colors = useThemeColor();
  const I18n = useTranslator();

  useEffect(() => {
    setVisible(forceHideByDefault ? false : showFilter);
  }, [forceHideByDefault, showFilter]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handleExpandPress = useCallback(() => {
    animationUtil.animateNext();
    setVisible(!isVisible);
  }, [isVisible]);

  return (
    <View style={[styles.container, style]}>
      {expandableFilter && isVisible && topChildren}
      {fixedItems}

      {activeFilter && (
        <View style={styles.filterTag}>
          <LabelText
            title={I18n.t('Base_SelectedFilter')}
            value={activeFilter}
          />
          <Icon
            touchable={true}
            onPress={clearFilter}
            name="x-circle"
            size={18}
            color={Colors.errorColor.background}
            style={{flex: 1}}
          />
        </View>
      )}

      {expandableFilter && isVisible && children}
      {chipComponent}
      {expandableFilter && (
        <TouchableOpacity onPress={handleExpandPress}>
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
    filterTag: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      marginHorizontal: 15,
    },
  });

export default FilterContainer;
