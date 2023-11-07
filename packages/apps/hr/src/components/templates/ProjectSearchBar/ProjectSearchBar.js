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
import {searchProject} from '../../../features/projectSlice';

const ProjectSearchBar = ({
  style = null,
  title = 'Hr_Project',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {projectList, loadingProject, moreLoading, isListEnd} = useSelector(
    state => state.project,
  );
  const {user} = useSelector(state => state.user);

  const searchProjectAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchProject({
          page,
          searchValue,
          activeCompanyId: user?.activeCompany?.id,
        }),
      );
    },
    [dispatch, user?.activeCompany?.id],
  );

  const displayItemFullname = item => item.fullName;

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={projectList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchProjectAPI}
      displayValue={displayItemFullname}
      placeholder={title}
      showDetailsPopup={true}
      loadingList={loadingProject}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={false}
      oneFilter={false}
      isFocus={false}
    />
  );
};

export default ProjectSearchBar;
