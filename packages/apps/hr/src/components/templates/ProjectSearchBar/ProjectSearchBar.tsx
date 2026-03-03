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
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchProject} from '../../../features/projectSlice';

interface ProjectSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
  manageTimeSpent?: boolean;
  isMemberRequired?: boolean;
  inProgress?: boolean;
}

const ProjectSearchBarAux = ({
  style = null,
  title = 'Hr_Project',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  manageTimeSpent = false,
  isMemberRequired = false,
  inProgress = false,
}: ProjectSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {projectList, loadingProject, moreLoading, isListEnd} = useSelector(
    state => state.hr_project,
  );
  const {user} = useSelector(state => state.user);

  const searchProjectAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchProject as any)({
          page,
          searchValue,
          userId: user.id,
          activeCompanyId: user.activeCompany?.id,
          manageTimeSpent,
          isMemberRequired,
          inProgress,
        }),
      );
    },
    [
      dispatch,
      inProgress,
      isMemberRequired,
      manageTimeSpent,
      user.activeCompany?.id,
      user.id,
    ],
  );

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
    />
  );
};

const ProjectSearchBar = (props: ProjectSearchBarProps) => {
  return <ProjectSearchBarAux {...props} />;
};

export default ProjectSearchBar;
