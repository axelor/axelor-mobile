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
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {MultiValuePicker} from '@axelor/aos-mobile-ui';
import {getProjectTaskTag} from '../../../features/projectTaskSlice';

const transformTagsToPickerItems = tags => {
  return (
    tags?.map(tag => ({
      title: tag.name,
      color: tag.colorSelect,
      key: tag.id,
    })) || []
  );
};

interface TagTaskMultieValuePickeProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const TagTaskMultieValuePicker = ({
  style = null,
  title = 'Project_Tags',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: TagTaskMultieValuePickeProps) => {
  const [selectedStatus, setSelectedStatus] = useState([]);
  const dispatch = useDispatch();

  const {taskTagList} = useSelector((state: any) => state.project_projectTask);

  useEffect(() => {
    dispatch(getProjectTaskTag());
  }, [dispatch]);

  const _defaultValue = useMemo(
    () => transformTagsToPickerItems(defaultValue),
    [defaultValue],
  );

  const projectTaskListItems = useMemo(
    () => transformTagsToPickerItems(taskTagList),
    [taskTagList],
  );

  const getFullTagsById = selectedItems => {
    return selectedItems
      .map(selectedItem => {
        return taskTagList.find(tag => tag.id === selectedItem.key);
      })
      .filter(tag => tag != null);
  };
  const handleValueChange = selectedItems => {
    setSelectedStatus(selectedItems);
    const fullTags = getFullTagsById(selectedItems);
    onChange(fullTags);
  };

  return (
    <MultiValuePicker
      style={style}
      title={title}
      defaultItems={_defaultValue}
      listItems={projectTaskListItems}
      required={required}
      readonly={readonly}
      onValueChange={handleValueChange}
    />
  );
};

export default TagTaskMultieValuePicker;
