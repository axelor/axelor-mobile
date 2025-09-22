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

import React, {useCallback} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchSprint} from '../../../features/projectTaskSlice';

interface ActiveSprintSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
  showTitle?: boolean;
  objectState?: any;
}

const ActiveSprintSearchBarAux = ({
  style = null,
  title = 'Project_ActiveSprint',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showTitle = true,
  objectState = null,
}: ActiveSprintSearchBarProps) => {
  const I18n = useTranslator();
  const {Project} = useTypes();
  const dispatch = useDispatch();

  const {
    targetVersion,
    sprintList,
    loadingSprint,
    moreLoadingSprint,
    isListEndSprint,
  } = useSelector((state: any) => state.project_projectTask);

  const searchSprintAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchSprint as any)({
          searchValue,
          sprintManagedOnProject:
            objectState?.project?.sprintManagementSelect ===
            Project?.sprintManagementSelect.Project,
          projectId: objectState?.project?.id,
          targetVersionId: targetVersion?.id,
          backlogSprintId: objectState?.project?.backlogSprint?.id,
          page,
        }),
      );
    },
    [
      Project?.sprintManagementSelect.Project,
      dispatch,
      objectState?.project,
      targetVersion?.id,
    ],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      objectList={sprintList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchSprintAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingSprint}
      moreLoading={moreLoadingSprint}
      isListEnd={isListEndSprint}
      navigate={false}
      oneFilter={false}
    />
  );
};

const ActiveSprintSearchBar = ({
  style = null,
  title = 'Project_ActiveSprint',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showTitle = true,
  objectState = null,
}: ActiveSprintSearchBarProps) => {
  return (
    <ActiveSprintSearchBarAux
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

export default ActiveSprintSearchBar;
