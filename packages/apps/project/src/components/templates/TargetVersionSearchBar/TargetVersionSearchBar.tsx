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

import React, {useCallback} from 'react';
import {
  displayItemTitle,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchTargetVersion} from '../../../features/projectTaskSlice';

interface TargetVersionSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
  showTitle?: boolean;
}

const TargetVersionSearchBarAux = ({
  style = null,
  title = 'Project_TargetVersion',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showTitle = true,
}: TargetVersionSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    targetVersionList,
    loadingTargetVersion,
    moreLoadingTargetVersion,
    isListEndTargetVersion,
  } = useSelector((state: any) => state.project_projectTask);
  const {projectForm} = useSelector((state: any) => state.project_project);

  const searchTargetVersionAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchTargetVersion as any)({
          page,
          searchValue,
          projectId: projectForm?.id,
        }),
      );
    },
    [dispatch, projectForm?.id],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      objectList={targetVersionList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchTargetVersionAPI}
      displayValue={displayItemTitle}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingTargetVersion}
      moreLoading={moreLoadingTargetVersion}
      isListEnd={isListEndTargetVersion}
      navigate={false}
      oneFilter={false}
    />
  );
};

const TargetVersionSearchBar = ({
  style = null,
  title = 'Project_TargetVersion',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showTitle = true,
}: TargetVersionSearchBarProps) => {
  return (
    <TargetVersionSearchBarAux
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

export default TargetVersionSearchBar;
