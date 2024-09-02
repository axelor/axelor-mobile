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

import React, {useEffect, useMemo, useState} from 'react';
import {Picker} from '@axelor/aos-mobile-ui';
import {customComponentOptions} from '../../../../forms/types';
import {fetchSelectionOptions} from '../../../../forms/studio/api.helpers';

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
  listItems?: any;
}

const CustomPicker = ({
  item,
  style,
  title,
  defaultValue,
  onChange,
  required,
  readonly,
  listItems,
}: props) => {
  const [selection, setSelection] = useState<SelectionItem[]>([]);

  const _defaultValue = useMemo(() => {
    return defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (Array.isArray(listItems) && listItems.length > 0) {
      setSelection(listItems);
    } else {
      fetchSelectionOptions({
        modelName: item.uniqueModel,
        attrsPanelName: item.modelField,
        fieldName: item.name,
      }).then(setSelection);
    }
  }, [item, listItems]);

  return (
    <Picker
      style={style}
      title={title}
      onValueChange={onChange}
      listItems={listItems ? listItems : selection}
      labelField={listItems ? 'title' : 'name'}
      valueField={listItems ? 'value' : 'id'}
      isValueItem={false}
      defaultValue={_defaultValue}
      required={required}
      readonly={readonly}
      isScrollViewContainer={true}
    />
  );
};

export default CustomPicker;
