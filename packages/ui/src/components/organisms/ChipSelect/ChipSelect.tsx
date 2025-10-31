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

import React, {useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View, ScrollView} from 'react-native';
import {useThemeColor, Color} from '../../../theme';
import {Button, Chip} from '../../molecules';

const CHIP_CONTAINER_MARGIN = 16;
const CHIP_MARGIN = 2;

const MODES = {
  switch: 'switch',
  multi: 'multi',
};

interface Item {
  isActive?: boolean;
  color: Color;
  title: string;
  key: string | number | boolean;
}

interface ChipSelectProps {
  style?: any;
  selectionItems: Item[];
  mode: 'multi' | 'switch';
  isRefresh?: boolean;
  width?: number;
  marginHorizontal?: number;
  readonly?: boolean;
  chipNumberOfLines?: number;
  onChangeValue?: (value: any) => void;
  showClearButton?: boolean;
}

const ChipSelect = ({
  style,
  selectionItems,
  mode,
  isRefresh = false,
  width,
  marginHorizontal = CHIP_MARGIN,
  readonly = false,
  chipNumberOfLines,
  onChangeValue = () => {},
  showClearButton = false,
}: ChipSelectProps) => {
  const Colors = useThemeColor();

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

  const _width = useMemo(() => {
    if (width != null) {
      return width;
    }

    const numberItems = selectionItems.length;

    if (numberItems < 5) {
      return (
        (Dimensions.get('window').width -
          CHIP_CONTAINER_MARGIN * 2 -
          marginHorizontal * 2 * numberItems) *
        (1 / numberItems)
      );
    }

    return null;
  }, [marginHorizontal, selectionItems, width]);

  const updateChip = (chip: Item) => {
    let updatedChip = [];

    if (mode === MODES.multi) {
      if (chipIsSelected(chip)) {
        updatedChip = selectedChip?.filter(
          activeChip => activeChip.key !== chip.key,
        );
      } else if (selectedChip?.length + 1 !== selectionItems?.length) {
        updatedChip = [...selectedChip, chip];
      }
    }

    if (mode === MODES.switch) {
      if (!chipIsSelected(chip)) {
        updatedChip = [chip];
      }
    }

    setSelectedChip(updatedChip);
    onChangeValue(updatedChip);
  };

  const chipIsSelected = (chip: Item) => {
    if (
      isRefresh &&
      selectionItems.every(el => Object.keys(el).includes('isActive'))
    ) {
      return chip.isActive;
    }

    return (
      selectedChip?.find(activeChip => activeChip.key === chip.key) != null
    );
  };

  const clearAllChips = () => {
    setSelectedChip([]);
    onChangeValue([]);
  };

  if (
    selectionItems.length < 2 ||
    (mode !== MODES.multi && mode !== MODES.switch)
  ) {
    return null;
  }

  return (
    <View style={[styles.chipContainer, style]} testID="chipSelectContainer">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {showClearButton && (
          <Button
            testID="chipSelectClearButton"
            iconName="trash"
            color={
              selectedChip.length > 0
                ? Colors.primaryColor
                : Colors.secondaryColor
            }
            onPress={clearAllChips}
            disabled={selectedChip.length === 0}
            iconSize={18}
            width={40}
            style={styles.clearButton}
          />
        )}
        {selectionItems?.map((item, index) => (
          <Chip
            key={index}
            selected={chipIsSelected(item)}
            title={item.title}
            selectedColor={item.color}
            onPress={() => updateChip(item)}
            readonly={readonly}
            marginHorizontal={marginHorizontal}
            width={_width}
            numberOfLines={chipNumberOfLines}
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
    marginHorizontal: CHIP_CONTAINER_MARGIN,
    marginVertical: 2,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  clearButton: {
    marginRight: 5,
    height: 40,
  },
});

export default ChipSelect;
