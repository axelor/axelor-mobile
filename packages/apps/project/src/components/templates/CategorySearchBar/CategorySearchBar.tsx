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
  objectState?: any;
}

const CategorySearchBarAux = ({
  style,
  title = 'Project_Category',
  defaultValue,
  onChange,
  readonly = false,
  required = false,
  showTitle = true,
  objectState,
}: CategorySearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    categoryList,
    loadingCategory,
    moreLoadingCategory,
    isListEndCategory,
  } = useSelector(state => state.project_projectTask);

  const categoryIds = useMemo(
    () =>
      objectState?.project?.projectTaskCategorySet?.map(
        (category: any) => category.id,
      ),
    [objectState?.project?.projectTaskCategorySet],
  );

  const searchCategoryAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((searchCategory as any)({page, searchValue, categoryIds}));
    },
    [categoryIds, dispatch],
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
      fetchData={searchCategoryAPI}
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

const CategorySearchBar = (props: CategorySearchBarProps) => {
  return <CategorySearchBarAux {...props} />;
};

export default CategorySearchBar;
