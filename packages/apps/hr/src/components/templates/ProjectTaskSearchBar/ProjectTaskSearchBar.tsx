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

import React, {useCallback} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchProjectTask} from '../../../features/projectSlice';

interface ProjectTaskSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const ProjectTaskSearchBarAux = ({
  style = null,
  title = 'Hr_ProjectTask',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: ProjectTaskSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    project,
    projectTaskList,
    loadingProjectTask,
    moreLoadingProjectTask,
    isListEndProjectTask,
  } = useSelector((state: any) => state.project);

  const searchProjectTaskAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchProjectTask as any)({
          page,
          searchValue,
          projectId: project?.id,
        }),
      );
    },
    [dispatch, project?.id],
  );

  const displayItemFullname = item => item.fullName;

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={projectTaskList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchProjectTaskAPI}
      displayValue={displayItemFullname}
      placeholder={title}
      showDetailsPopup={true}
      loadingList={loadingProjectTask}
      moreLoading={moreLoadingProjectTask}
      isListEnd={isListEndProjectTask}
      navigate={false}
      oneFilter={false}
    />
  );
};

const ProjectTaskSearchBar = ({
  style = null,
  title = 'Hr_ProjectTask',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: ProjectTaskSearchBarProps) => {
  return (
    <ProjectTaskSearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default ProjectTaskSearchBar;
