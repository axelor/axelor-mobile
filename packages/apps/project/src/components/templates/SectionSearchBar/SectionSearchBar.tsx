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
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchSection} from '../../../features/projectTaskSlice';

interface SectionSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
  showTitle?: boolean;
}

const SectionSearchBarAux = ({
  style = null,
  title = 'Project_Section',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showTitle = true,
}: SectionSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {sectionList, loadingSection, moreLoadingSection, isListEndSection} =
    useSelector((state: any) => state.project_projectTask);

  const searchSectionAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchSection as any)({
          page,
          searchValue,
        }),
      );
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      objectList={sectionList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchSectionAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingSection}
      moreLoading={moreLoadingSection}
      isListEnd={isListEndSection}
      navigate={false}
      oneFilter={false}
    />
  );
};

const SectionSearchBar = ({
  style = null,
  title = 'Project_Section',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showTitle = true,
}: SectionSearchBarProps) => {
  return (
    <SectionSearchBarAux
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

export default SectionSearchBar;
