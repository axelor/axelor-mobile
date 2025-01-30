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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@axelor/aos-mobile-ui';
import {useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';

const KilometricTypeSelectPickerAux = ({
  title = 'Hr_KilometricTypeSelect',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}) => {
  const {ExpenseLine} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const kilometricTypeSelectList = useMemo(
    () => getSelectionItems(ExpenseLine?.kilometricTypeSelect),
    [ExpenseLine?.kilometricTypeSelect, getSelectionItems],
  );

  return (
    <Picker
      style={styles.picker}
      title={title}
      defaultValue={defaultValue}
      listItems={kilometricTypeSelectList}
      labelField="title"
      valueField="key"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
      isValueItem={true}
    />
  );
};

const KilometricTypeSelectPicker = ({
  title,
  defaultValue,
  onChange,
  readonly,
  required,
}) => {
  return (
    <KilometricTypeSelectPickerAux
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    alignSelf: 'center',
  },
});

export default KilometricTypeSelectPicker;
