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
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchCategory} from '../../../features/projectTaskSlice';

interface CategorySearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
  showTitle?: boolean;
}

const CategorySearchBar = ({
  style = null,
  title = 'Project_Category',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showTitle = true,
}: CategorySearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    categoryList,
    loadingCategory,
    moreLoadingCategory,
    isListEndCategory,
  } = useSelector((state: any) => state.project_projectTask);
  const {projectForm} = useSelector((state: any) => state.project_project);

  const searcCategoryAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchCategory as any)({
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
      objectList={categoryList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searcCategoryAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingCategory}
      moreLoading={moreLoadingCategory}
      isListEnd={isListEndCategory}
      navigate={false}
      oneFilter={false}
    />
  );
};

export default CategorySearchBar;
