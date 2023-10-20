/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Color} from '../../../theme/themes';
import {Chip} from '../../molecules';

interface Item {
  isActive?: boolean;
  color: Color;
  title: string;
  key: string | number;
}

interface ChipSelectProps {
  style?: any;
  selectionItems: Item[];
  mode: 'multi' | 'switch';
  isRefresh?: boolean;
  width?: number;
  marginHorizontal?: number;
  onChangeValue?: (value: any) => void;
}

const ChipSelect = ({
  style,
  selectionItems,
  mode,
  isRefresh = false,
  width,
  marginHorizontal,
  onChangeValue = () => {},
}: ChipSelectProps) => {
  const [selectedChip, setSelectedChip] = useState<Item[]>(
    selectionItems.filter(item => item.isActive === true),
  );

  useEffect(() => {
    if (
      isRefresh &&
      selectionItems.every(el => Object.keys(el).includes('isActive'))
    ) {
      setSelectedChip(selectionItems.filter(item => item.isActive === true));
    }
  }, [isRefresh, selectionItems]);

  const updateChip = (chip: Item) => {
    let updatedChip = [];

    if (mode === 'multi') {
      if (chipIsSelected(chip)) {
        updatedChip = selectedChip?.filter(
          activeChip => activeChip.key !== chip.key,
        );
      } else if (selectedChip?.length + 1 !== selectionItems?.length) {
        updatedChip = [...selectedChip, chip];
      }
    }

    if (mode === 'switch') {
      if (chipIsSelected(chip)) {
        updatedChip = [];
      } else {
        updatedChip = [chip];
      }
    }

    setSelectedChip(updatedChip);
    onChangeValue(updatedChip);
  };

  const chipIsSelected = (chip: Item) => {
    return (
      selectedChip?.find(activeChip => activeChip.key === chip.key) != null
    );
  };

  if (mode !== 'multi' && mode !== 'switch') {
    return null;
  }

  return (
    <View style={[styles.chipContainer, styles.marginLeft, style]}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {selectionItems?.map((item, index) => (
          <Chip
            key={index}
            selected={chipIsSelected(item)}
            title={item.title}
            selectedColor={item.color}
            onPress={() => updateChip(item)}
            marginHorizontal={marginHorizontal}
            width={width}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  marginLeft: {
    marginHorizontal: 16,
  },
});

export default ChipSelect;
