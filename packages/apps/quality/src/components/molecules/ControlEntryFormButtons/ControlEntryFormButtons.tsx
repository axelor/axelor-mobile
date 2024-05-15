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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  showToastMessage,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {ControlEntry as ControlEntryType} from '../../../types';
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
  const I18n = useTranslator();
  const {ControlEntry, ControlEntrySample} = useTypes();

  const {controlEntry} = useSelector((state: any) => state.controlEntry);
  const {sampleLine} = useSelector(
    (state: any) => state.controlEntrySampleLine,
  );

  const isConformityButton = useMemo(
    () =>
      controlEntry.statusSelect === ControlEntry?.statusSelect.Draft ||
      controlEntry.statusSelect === ControlEntry?.statusSelect.InProgress,
    [ControlEntry?.statusSelect, controlEntry.statusSelect],
  );

  const {categoryIcon, subCategoryIcon} = useMemo(
    () => ControlEntryType.getMethodIcons(mode),
    [mode],
  );

  const handleNotControlled = useCallback(() => {
    if (
      sampleLine.resultSelect === ControlEntrySample?.resultSelect.NotControlled
    ) {
      showToastMessage({
        type: ControlEntryType.getSampleResultType(
          ControlEntrySample?.resultSelect.NotControlled,
        ),
        position: 'bottom',
        bottomOffset: 80,
        text1: I18n.t('Quality_ConformityResult'),
        text2: I18n.t('Quality_ControlResult_NotControlled'),
      });
    }
  }, [ControlEntrySample?.resultSelect, I18n, sampleLine.resultSelect]);

  return (
    <View style={styles.container}>
      <NavigationButton
        position="left"
        onPress={() => {
          handleNotControlled();
          handlePrevious();
        }}
        icon={isFirstItem ? categoryIcon : subCategoryIcon}
        disabled={!canPrevious}
      />
      <NavigationButton
        position="right"
        onPress={() => {
          handleNotControlled();
          handleNext();
        }}
        icon={isLastItem ? categoryIcon : subCategoryIcon}
        disabled={!canNext}
      />
      {isConformityButton && (
        <Button
          style={styles.lastButton}
          onPress={onPress}
          iconName="check-lg"
          color={Colors.successColor}
        />
      )}
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
