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
import {StyleSheet} from 'react-native';
import {FormInput, Picker} from '@axelor/aos-mobile-ui';
import {customComponentOptions} from '../../../forms/types';
import {fetchSelectionOptions} from '../../../forms/studio/api.helpers';

interface SelectionItem {
  name: string;
  id: number | string;
}

interface props extends customComponentOptions {
  item: any;
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: () => any;
  required?: boolean;
  readonly?: boolean;
}

const CustomPicker = ({
  item,
  style,
  title,
  defaultValue,
  onChange,
  required,
  readonly,
}: props) => {
  const [selection, setSelection] = useState<SelectionItem[]>([]);

  useEffect(() => {
    fetchSelectionOptions({
      modelName: item.uniqueModel,
      attrsPanelName: item.modelField,
      fieldName: item.name,
    }).then(setSelection);
  }, [item]);

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={title}
        readOnly={true}
        defaultValue={defaultValue}
      />
    );
  }

  return (
    <Picker
      style={[styles.picker, style]}
      pickerStyle={styles.container}
      styleTxt={styles.marginPicker}
      title={title}
      onValueChange={onChange}
      listItems={selection}
      labelField="name"
      valueField="id"
      defaultValue={defaultValue}
      required={required}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    width: '100%',
  },
  container: {
    width: '100%',
    marginHorizontal: 0,
    marginRight: 0,
    marginLeft: 0,
  },
  marginPicker: {
    marginLeft: -14,
  },
});

export default CustomPicker;
