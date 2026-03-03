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
  style,
  title = 'Project_ActiveSprint',
  defaultValue,
  onChange,
  readonly = false,
  required = false,
  showTitle = true,
  objectState,
}: ActiveSprintSearchBarProps) => {
  const I18n = useTranslator();
  const {Project} = useTypes();
  const dispatch = useDispatch();

  const {sprintList, loadingSprint, moreLoadingSprint, isListEndSprint} =
    useSelector(state => state.project_projectTask);

  const searchSprintAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchSprint as any)({
          searchValue,
          sprintManagedOnProject:
            objectState?.project?.sprintManagementSelect ===
            Project?.sprintManagementSelect.Project,
          projectId: objectState?.project?.id,
          targetVersionId: objectState?.targetVersion?.id,
          backlogSprintId: objectState?.project?.backlogSprint?.id,
          page,
        }),
      );
    },
    [
      Project?.sprintManagementSelect.Project,
      dispatch,
      objectState?.project,
      objectState?.targetVersion?.id,
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

const ActiveSprintSearchBar = (props: ActiveSprintSearchBarProps) => {
  return <ActiveSprintSearchBarAux {...props} />;
};

export default ActiveSprintSearchBar;
