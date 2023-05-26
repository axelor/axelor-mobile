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

import React, {useState} from 'react';
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
  width?: number;
  marginHorizontal?: number;
  onChangeValue?: (value: any) => void;
}

const ChipSelect = ({
  style,
  selectionItems,
  mode,
  width,
  marginHorizontal,
  onChangeValue = () => {},
}: ChipSelectProps) => {
  const [selectdChipSwitch, setSelectdChipSwitch] = useState({
    key: selectionItems.find(item => item.isActive === true)?.key,
  });

  const [selectedChipMulti, setSelectedChipMulti] = useState(
    selectionItems.filter(item => item.isActive === true),
  );

  const updateChip = chip => {
    if (mode === 'multi') {
      if (chipIsSelected(chip)) {
        setSelectedChipMulti(
          selectedChipMulti?.filter(activeChip => activeChip.key !== chip.key),
        );
        onChangeValue(
          selectedChipMulti?.filter(activeChip => activeChip.key !== chip.key),
        );
      } else if (selectedChipMulti.length + 1 === selectionItems.length) {
        setSelectedChipMulti([]);
        onChangeValue([]);
      } else {
        setSelectedChipMulti([...selectedChipMulti, chip]);
        onChangeValue([...selectedChipMulti, chip]);
      }
    }
    if (mode === 'switch') {
      setSelectdChipSwitch(chip.key === selectdChipSwitch?.key ? null : chip);
      onChangeValue(chip.key === selectdChipSwitch?.key ? null : [chip]);
    }
  };

  const chipIsSelected = chip => {
    return (
      selectedChipMulti?.find(activeChip => activeChip.key === chip.key) != null
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
            selected={
              mode === 'switch'
                ? item.key === selectdChipSwitch?.key
                : chipIsSelected(item)
            }
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
