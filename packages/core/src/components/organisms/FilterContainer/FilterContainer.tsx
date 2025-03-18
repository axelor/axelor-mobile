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

import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  HeaderContainer,
  Icon,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useActiveFilter} from '../../../hooks/use-active-filter';
import {filterProvider} from '../../../header/FilterProvider';

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
  const Colors = useThemeColor();
  const {activeFilter} = useActiveFilter();

  const styles = useMemo(
    () => getStyles(Colors.primaryColor.background),
    [Colors],
  );

  const renderFilterTag = () => {
    if (!activeFilter) {
      return null;
    }

    return (
      <View style={styles.filterContainer}>
        <Icon name="filter" size={18} />
        <TouchableOpacity
          style={styles.filterTag}
          onPress={() => filterProvider.setActiveFilter()}>
          <Text fontSize={14}>{activeFilter.name}</Text>
          <Icon name="x" size={18} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <HeaderContainer
      style={style}
      topChildren={topChildren}
      fixedItems={
        <>
          {fixedItems}
          {renderFilterTag()}
        </>
      }
      chipComponent={chipComponent}
      expandableFilter={expandableFilter}
      forceHideByDefault={forceHideByDefault}>
      {children}
    </HeaderContainer>
  );
};

const getStyles = (borderColor: string) =>
  StyleSheet.create({
    filterContainer: {
      flexDirection: 'row',
      marginVertical: 5,
      paddingHorizontal: 24,
      gap: 10,
    },
    filterTag: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      borderRadius: 14,
      borderWidth: 2,
      borderColor,
    },
  });

export default FilterContainer;
