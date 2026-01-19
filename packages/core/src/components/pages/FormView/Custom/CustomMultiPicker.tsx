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

import React, {useCallback, useEffect, useState} from 'react';
import {Color, MultiValuePicker, useThemeColor} from '@axelor/aos-mobile-ui';
import {customComponentOptions} from '../../../../forms/types';
import {fetchSelectionOptions} from '../../../../forms/studio/api.helpers';

interface SelectionItem {
  title: string;
  value: number | string;
  color: Color;
  key: string;
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
}

const CustomMultiPickerAux = ({
  item,
  style,
  title,
  defaultValue,
  onChange,
  required,
  readonly,
  showTitle = true,
}: props) => {
  const Colors = useThemeColor();

  const [selection, setSelection] = useState<SelectionItem[]>([]);

  const addColor = useCallback(
    (items: Partial<SelectionItem>[]): SelectionItem[] => {
      const getRandomColor = (index: number): Color => {
        const values = Object.values(Colors).filter(
          _color => typeof _color !== 'string',
        );

        return values[index % values.length];
      };

      return (items ?? [])?.map((_i, idx) => ({
        title: _i.title ?? '',
        value: _i.value,
        color: _i.color ?? getRandomColor(idx),
        key: `${_i.value}`,
      }));
    },
    [Colors],
  );

  useEffect(() => {
    if (Array.isArray(item.selectionList) && item.selectionList.length > 0) {
      setSelection(addColor(item.selectionList));
    } else {
      fetchSelectionOptions({
        modelName: item.uniqueModel,
        attrsPanelName: item.modelField,
        fieldName: item.name,
      }).then(res => setSelection(addColor(res)));
    }
  }, [addColor, item]);

  return (
    <MultiValuePicker
      style={style}
      title={showTitle && title}
      placeholder={title}
      onValueChange={onChange}
      listItems={selection}
      defaultItems={defaultValue}
      required={required}
      readonly={readonly}
    />
  );
};

const CustomMultiPicker = (props: props) => {
  return <CustomMultiPickerAux {...props} />;
};

export default CustomMultiPicker;
