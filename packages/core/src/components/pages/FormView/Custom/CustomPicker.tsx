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

import React, {useEffect, useState} from 'react';
import {Picker} from '@axelor/aos-mobile-ui';
import {customComponentOptions} from '../../../../forms/types';
import {fetchSelectionOptions} from '../../../../forms/studio/api.helpers';

interface SelectionItem {
  title: string;
  value: number | string;
}

interface props extends customComponentOptions {
  item: any;
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: () => any;
  required?: boolean;
  readonly?: boolean;
  showTitle?: boolean;
  isScrollViewContainer?: boolean;
}

const CustomPickerAux = ({
  item,
  style,
  title,
  defaultValue,
  onChange,
  required,
  readonly,
  showTitle = true,
  isScrollViewContainer = true,
}: props) => {
  const [selection, setSelection] = useState<SelectionItem[]>([]);

  useEffect(() => {
    if (Array.isArray(item.selectionList) && item.selectionList.length > 0) {
      setSelection(item.selectionList);
    } else {
      fetchSelectionOptions({
        modelName: item.uniqueModel,
        attrsPanelName: item.modelField,
        fieldName: item.name,
      }).then(setSelection);
    }
  }, [item]);

  return (
    <Picker
      style={style}
      title={showTitle && title}
      placeholder={title}
      onValueChange={onChange}
      listItems={selection}
      labelField="title"
      valueField="value"
      defaultValue={defaultValue}
      required={required}
      readonly={readonly}
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

const CustomPicker = (props: props) => {
  return <CustomPickerAux {...props} />;
};

export default CustomPicker;
