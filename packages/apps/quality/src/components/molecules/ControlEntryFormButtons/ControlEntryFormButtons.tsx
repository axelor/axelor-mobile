/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
  useTypeHelpers,
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
  onPress?: () => any;
  checkConformity?: boolean;
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
  checkConformity = true,
}: ControlEntryFormButtonsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {ControlEntry, ControlEntrySample} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const {controlEntry} = useSelector(state => state.controlEntry);
  const {sampleLine} = useSelector(state => state.controlEntrySampleLine);

  const isConformityButton = useMemo(
    () =>
      checkConformity &&
      (controlEntry.statusSelect === ControlEntry?.statusSelect.Draft ||
        controlEntry.statusSelect === ControlEntry?.statusSelect.InProgress),
    [ControlEntry?.statusSelect, controlEntry.statusSelect, checkConformity],
  );

  const {categoryIcon, subCategoryIcon} = useMemo(
    () => ControlEntryType.getMethodIcons(mode),
    [mode],
  );

  const handleNotControlled = useCallback(() => {
    if (
      checkConformity &&
      sampleLine?.resultSelect ===
        ControlEntrySample?.resultSelect.NotControlled
    ) {
      showToastMessage({
        type: ControlEntryType.getSampleResultType(
          ControlEntrySample?.resultSelect.NotControlled,
        ),
        position: 'bottom',
        bottomOffset: 80,
        text1: I18n.t('Quality_ConformityResult'),
        text2: getItemTitle(
          ControlEntrySample?.resultSelect,
          ControlEntrySample?.resultSelect.NotControlled,
        ),
      });
    }
  }, [
    ControlEntrySample?.resultSelect,
    I18n,
    checkConformity,
    getItemTitle,
    sampleLine?.resultSelect,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
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
      </View>
      {isConformityButton && (
        <Button
          onPress={onPress}
          iconName="check-lg"
          width={50}
          color={Colors.successColor}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  navigationContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 5,
  },
});

export default ControlEntryFormButtons;
