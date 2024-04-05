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

import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
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
}

const DropdownCardSwitch = ({
  style,
  styleTitle,
  dropdownItems,
  multiSelection = false,
}: DropdownCardSwitchProps) => {
  const getDefaultVisibleItems = useCallback(() => {
    let defaultVisibleItems = [];

    if (multiSelection) {
      defaultVisibleItems = dropdownItems.map(
        item => item.isDefaultVisible && item.key,
      );
    } else {
      const firstVisibleCard = dropdownItems.find(
        item => item.isDefaultVisible,
      );
      defaultVisibleItems = [firstVisibleCard?.key];
    }

    return defaultVisibleItems;
  }, [dropdownItems, multiSelection]);

  const [openedCardKeys, setOpenedCardKeys] = useState<Number[]>(
    getDefaultVisibleItems(),
  );

  useEffect(() => {
    setOpenedCardKeys(getDefaultVisibleItems());
  }, [getDefaultVisibleItems]);

  const handlePress = key => {
    const cardKeyIdx = openedCardKeys.indexOf(key);

    if (cardKeyIdx >= 0) {
      setOpenedCardKeys(current => {
        const _current = [...current];
        _current.splice(cardKeyIdx, 1);
        return _current;
      });
    } else {
      multiSelection
        ? setOpenedCardKeys(current => [...current, key])
        : setOpenedCardKeys([key]);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {dropdownItems.map((elt, index) => {
        return (
          <DropdownCard
            key={index}
            title={elt.title}
            styleText={styleTitle}
            onPress={() => handlePress(elt.key)}
            dropdownIsOpen={!!openedCardKeys.find(key => key === elt.key)}>
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
    width: Dimensions.get('window').width * 0.9,
    marginBottom: 5,
  },
});

export default DropdownCardSwitch;
