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

import React, {ReactNode, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DropdownCard} from '../../molecules';

interface DropdownCardSwitchProps {
  style?: any;
  dropdownItems: DropdownItem[];
  styleTitle?: any;
}
interface DropdownItem {
  key: number;
  title: string;
  childrenComp: ReactNode;
}

const DropdownCardSwitch = ({
  style,
  dropdownItems,
  styleTitle,
}: DropdownCardSwitchProps) => {
  const [openedCardKey, setOpenedCardKey] = useState<Number>();

  const handlePress = key => {
    if (openedCardKey === key) {
      setOpenedCardKey(null);
    } else {
      setOpenedCardKey(key);
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
            dropdownIsOpen={elt.key === openedCardKey}>
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
