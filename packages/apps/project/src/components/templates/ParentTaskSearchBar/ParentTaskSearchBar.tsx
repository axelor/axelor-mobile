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

import React, {useCallback} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchParentTask} from '../../../features/projectTaskSlice';

interface ParentTaskSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
  showTitle?: boolean;
  objectState?: any;
}

const ParentTaskSearchBarAux = ({
  style,
  title = 'Project_ParentTask',
  defaultValue,
  onChange,
  readonly = false,
  required = false,
  showTitle = true,
  objectState,
}: ParentTaskSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    projectTask,
    parentTaskList,
    loadingParentTask,
    moreLoadingParentTask,
    isListEndParentTask,
  } = useSelector(state => state.project_projectTask);

  const searchParentTaskAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchParentTask as any)({
          page,
          searchValue,
          projectId: objectState?.project?.id,
          projectTaskId: projectTask?.id,
        }),
      );
    },
    [dispatch, objectState?.project?.id, projectTask?.id],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      objectList={parentTaskList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchParentTaskAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingParentTask}
      moreLoading={moreLoadingParentTask}
      isListEnd={isListEndParentTask}
      navigate={false}
      oneFilter={false}
    />
  );
};

const ParentTaskSearchBar = (props: ParentTaskSearchBarProps) => {
  return <ParentTaskSearchBarAux {...props} />;
};

export default ParentTaskSearchBar;
