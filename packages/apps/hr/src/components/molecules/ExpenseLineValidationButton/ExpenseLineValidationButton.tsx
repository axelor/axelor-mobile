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

import React from 'react';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';

const ExpenseLineValidationButton = ({
  onOpen,
  selectedItems,
  onChangeMode,
}: {
  onOpen: () => void;
  selectedItems: any[];
  onChangeMode: () => void;
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title={I18n.t('Base_Cancel')}
        color={Colors.errorColor}
        onPress={onChangeMode}
        iconName="x-lg"
      />
      <Button
        style={styles.button}
        title={I18n.t('Base_Add')}
        disabled={selectedItems.length <= 0}
        onPress={onOpen}
        iconName="plus-lg"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  button: {
    flex: 1,
  },
});

export default ExpenseLineValidationButton;
