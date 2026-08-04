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

import React, {useMemo} from 'react';
import {MultiValuePicker, Picker} from '@axelor/aos-mobile-ui';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

interface TaskPriorityPickerProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: (_v?: any) => void;
  required?: boolean;
  readonly?: boolean;
  showTitle?: boolean;
  isMultiValue?: boolean;
}

const TaskPriorityPickerAux = ({
  style,
  title = 'Team_Priority',
  defaultValue,
  onChange,
  required = false,
  readonly = false,
  showTitle = true,
  isMultiValue = false,
}: TaskPriorityPickerProps) => {
  const I18n = useTranslator();
  const {TeamTask} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const prioritySet = useMemo(
    () => getSelectionItems(TeamTask?.priority),
    [TeamTask?.priority, getSelectionItems],
  );

  if (isMultiValue) {
    return (
      <MultiValuePicker
        style={style}
        title={showTitle ? I18n.t(title) : undefined}
        placeholder={I18n.t(title)}
        listItems={prioritySet}
        onValueChange={onChange}
        readonly={readonly}
        required={required}
      />
    );
  }

  return (
    <Picker
      style={style}
      title={showTitle ? I18n.t(title) : undefined}
      placeholder={I18n.t(title)}
      defaultValue={defaultValue}
      valueField="key"
      labelField="title"
      listItems={prioritySet}
      onValueChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

const TaskPriorityPicker = (props: TaskPriorityPickerProps) => {
  return <TaskPriorityPickerAux {...props} />;
};

export default TaskPriorityPicker;
