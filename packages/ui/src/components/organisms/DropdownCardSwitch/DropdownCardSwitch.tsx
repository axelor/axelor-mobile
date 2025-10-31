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

import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DropdownCard} from '../../molecules';

interface DropdownCardSwitchProps {
  style?: any;
  styleTitle?: any;
  dropdownItems: DropdownItem[];
  multiSelection?: boolean;
}
interface DropdownItem {
  key: number;
  title: string;
  childrenComp: ReactNode;
  isDefaultVisible?: boolean;
  iconName?: string;
  style?: any;
}

const DropdownCardSwitch = ({
  style,
  styleTitle,
  dropdownItems,
  multiSelection = false,
}: DropdownCardSwitchProps) => {
  const getDefaultVisibleItemsKeys = useCallback(() => {
    const defaultVisibleItems = dropdownItems.filter(
      item => item.isDefaultVisible,
    );

    let defaultVisibleItemsKeys = defaultVisibleItems.map(item => item.key);
    if (!multiSelection) {
      defaultVisibleItemsKeys = defaultVisibleItemsKeys.slice(0, 1);
    }

    return defaultVisibleItemsKeys;
  }, [dropdownItems, multiSelection]);

  const [openedCardKeys, setOpenedCardKeys] = useState<Number[]>(
    getDefaultVisibleItemsKeys(),
  );

  useEffect(() => {
    setOpenedCardKeys(getDefaultVisibleItemsKeys());
  }, [getDefaultVisibleItemsKeys]);

  const handlePress = useCallback(
    key => {
      setOpenedCardKeys(current => {
        const _current = [...current];
        const cardKeyIdx = _current.indexOf(key);

        if (cardKeyIdx >= 0) {
          _current.splice(cardKeyIdx, 1);
          return _current;
        } else if (multiSelection) {
          return [...current, key];
        } else {
          return [key];
        }
      });
    },
    [multiSelection],
  );

  return (
    <View
      style={[styles.container, style]}
      testID="dropdownCardSwitchContainer">
      {dropdownItems.map((elt, index) => {
        return (
          <DropdownCard
            key={index}
            title={elt.title}
            styleCard={elt.style}
            styleText={styleTitle}
            onPress={() => handlePress(elt.key)}
            dropdownIsOpen={openedCardKeys.includes(elt.key)}
            iconName={elt.iconName}>
            {elt.childrenComp}
          </DropdownCard>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
});

export default DropdownCardSwitch;
