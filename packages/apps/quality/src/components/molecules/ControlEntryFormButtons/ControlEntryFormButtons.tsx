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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {ControlEntry} from '../../../types';
import {NavigationButton} from '../../atoms';

interface ControlEntryFormButtonsProps {
  mode: string;
  canPrevious: boolean;
  canNext: boolean;
  isFirstItem: boolean;
  isLastItem: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
  onPress: () => any;
}

const ControlEntryFormButtons = ({
  mode,
  canPrevious,
  canNext,
  isFirstItem,
  isLastItem,
  handleNext,
  handlePrevious,
  onPress,
}: ControlEntryFormButtonsProps) => {
  const Colors = useThemeColor();

  const {categoryIcon, subCategoryIcon} = useMemo(
    () => ControlEntry.getMethodIcons(mode),
    [mode],
  );

  return (
    <View style={styles.container}>
      <NavigationButton
        position="left"
        onPress={handlePrevious}
        icon={isFirstItem ? categoryIcon : subCategoryIcon}
        disabled={!canPrevious}
      />
      <NavigationButton
        position="right"
        onPress={handleNext}
        icon={isLastItem ? categoryIcon : subCategoryIcon}
        disabled={!canNext}
      />
      <Button
        style={styles.lastButton}
        onPress={onPress}
        iconName="check-lg"
        color={Colors.successColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 18,
  },
  lastButton: {
    width: '15%',
  },
});

export default ControlEntryFormButtons;
