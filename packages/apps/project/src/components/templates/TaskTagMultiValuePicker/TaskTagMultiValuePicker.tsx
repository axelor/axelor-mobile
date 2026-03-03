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

import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {MultiValuePicker, useThemeColor} from '@axelor/aos-mobile-ui';
import {getTag} from '../../../features/projectTaskSlice';

interface TaskTagMultiValuePickerProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const TaskTagMultiValuePickerAux = ({
  style = null,
  title = 'Project_Tags',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: TaskTagMultiValuePickerProps) => {
  const dispatch = useDispatch();
  const Color = useThemeColor();

  const {tagList} = useSelector((state: any) => state.project_projectTask);
  const {user} = useSelector((state: any) => state.user);

  const transformTagsToPickerItems = useCallback(
    tags => {
      return (
        tags?.map(tag => {
          const colorKey = tag.colorSelect;
          const color = Color[colorKey] || Color.primaryColor;
          return {
            ...tag,
            title: tag.name,
            color: color,
            key: tag.id,
          };
        }) || []
      );
    },
    [Color],
  );

  useEffect(() => {
    dispatch((getTag as any)({activeCompany: user.activeCompany}));
  }, [dispatch, user.activeCompany]);

  const _defaultValue = useMemo(
    () => transformTagsToPickerItems(defaultValue),
    [defaultValue, transformTagsToPickerItems],
  );

  const projectTaskListItems = useMemo(
    () => transformTagsToPickerItems(tagList),
    [tagList, transformTagsToPickerItems],
  );

  return (
    <MultiValuePicker
      style={style}
      title={title}
      defaultItems={_defaultValue}
      listItems={projectTaskListItems}
      required={required}
      readonly={readonly}
      onValueChange={onChange}
    />
  );
};

const TaskTagMultiValuePicker = ({
  style = null,
  title = 'Project_Tags',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: TaskTagMultiValuePickerProps) => {
  return (
    <TaskTagMultiValuePickerAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      required={required}
      readonly={readonly}
      onChange={onChange}
    />
  );
};

export default TaskTagMultiValuePicker;
