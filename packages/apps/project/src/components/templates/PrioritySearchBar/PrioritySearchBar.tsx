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

import React, {useCallback, useMemo} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchPriority} from '../../../features/projectTaskSlice';

interface PrioritySearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
  showTitle?: boolean;
}

const PrioritySearchBarAux = ({
  style = null,
  title = 'Project_Priority',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showTitle = true,
}: PrioritySearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    priorityList,
    loadingPriority,
    moreLoadingPriority,
    isListEndPriority,
  } = useSelector((state: any) => state.project_projectTask);
  const {projectForm} = useSelector((state: any) => state.project_project);

  const priorityIds = useMemo(
    () => projectForm?.projectTaskPrioritySet?.map(priority => priority.id),
    [projectForm?.projectTaskPrioritySet],
  );

  const searchPriorityAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchPriority as any)({
          page,
          searchValue,
          priorityIds: priorityIds,
        }),
      );
    },
    [dispatch, priorityIds],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      objectList={priorityList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchPriorityAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingPriority}
      moreLoading={moreLoadingPriority}
      isListEnd={isListEndPriority}
      navigate={false}
      oneFilter={false}
    />
  );
};

const PrioritySearchBar = ({
  style = null,
  title = 'Project_Priority',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showTitle = true,
}: PrioritySearchBarProps) => {
  return (
    <PrioritySearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      required={required}
      readonly={readonly}
      onChange={onChange}
      showTitle={showTitle}
    />
  );
};

export default PrioritySearchBar;
