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

interface TaskStatusPickerProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: (_v?: any) => void;
  required?: boolean;
  readonly?: boolean;
  showTitle?: boolean;
  isMultiValue?: boolean;
}

const TaskStatusPickerAux = ({
  style,
  title = 'Team_Status',
  defaultValue,
  onChange,
  required = false,
  readonly = false,
  showTitle = true,
  isMultiValue = false,
}: TaskStatusPickerProps) => {
  const I18n = useTranslator();
  const {TeamTask} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const statusSet = useMemo(
    () => getSelectionItems(TeamTask?.status),
    [TeamTask?.status, getSelectionItems],
  );

  if (isMultiValue) {
    return (
      <MultiValuePicker
        style={style}
        title={showTitle ? I18n.t(title) : undefined}
        placeholder={I18n.t(title)}
        listItems={statusSet}
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
      listItems={statusSet}
      onValueChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

const TaskStatusPicker = (props: TaskStatusPickerProps) => {
  return <TaskStatusPickerAux {...props} />;
};

export default TaskStatusPicker;
