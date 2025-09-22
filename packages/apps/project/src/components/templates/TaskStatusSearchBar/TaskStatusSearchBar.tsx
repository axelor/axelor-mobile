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

import React, {useCallback, useMemo} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchStatus} from '../../../features/projectTaskSlice';

interface TaskStatusSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
  showTitle?: boolean;
  objectState?: any;
}

const TaskStatusSearchBarAux = ({
  style = null,
  title = 'Project_Status',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
  showTitle = true,
  objectState = null,
}: TaskStatusSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {Project} = useTypes();

  const {
    loadingStatus,
    moreLoadingStatus,
    isListEndStatus,
    statusList,
    categoryForm,
  } = useSelector((state: any) => state.project_projectTask);

  const statusIds = useMemo(() => {
    const management =
      objectState?.project?.taskStatusManagementSelect ??
      Project?.taskStatusManagementSelect.NoStatusManagement;

    switch (management) {
      case Project?.taskStatusManagementSelect.ManageByProject:
        return (
          objectState?.project?.projectTaskStatusSet?.map(
            (status: any) => status.id,
          ) ?? []
        );
      case Project?.taskStatusManagementSelect.ManageByCategory:
        return (
          objectState?.projectTaskCategory?.projectTaskStatusSet?.map(
            (status: any) => status.id,
          ) ?? categoryForm?.projectTaskStatusSet?.map(({id}) => id) ?? []
        );
      default:
        return [];
    }
  }, [
    Project?.taskStatusManagementSelect,
    objectState?.project?.projectTaskStatusSet,
    objectState?.project?.taskStatusManagementSelect,
    objectState?.projectTaskCategory?.projectTaskStatusSet,
    categoryForm?.projectTaskStatusSet,
  ]);

  const searchStatusAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchStatus as any)({
          page,
          searchValue,
          statusIds: statusIds,
        }),
      );
    },
    [dispatch, statusIds],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      objectList={statusList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchStatusAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingStatus}
      moreLoading={moreLoadingStatus}
      isListEnd={isListEndStatus}
      navigate={false}
      oneFilter={false}
    />
  );
};

const TaskStatusSearchBar = ({
  style = null,
  title = 'Project_Status',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
  showTitle = true,
  objectState = null,
}: TaskStatusSearchBarProps) => {
  return (
    <TaskStatusSearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      required={required}
      readonly={readonly}
      onChange={onChange}
      showTitle={showTitle}
      objectState={objectState}
    />
  );
};

export default TaskStatusSearchBar;
