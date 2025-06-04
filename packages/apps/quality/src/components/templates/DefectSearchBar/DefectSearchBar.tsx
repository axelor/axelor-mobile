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
import {searchDefect} from '../../../features/qiDefaultSlice';

interface DefectSearchBarProps {
  placeholderKey?: string;
  defaultValue?: any;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  onChange: (value: any) => void;
  showTitle?: boolean;
}

const DefectSearchBarAux = ({
  placeholderKey = 'Quality_Defects',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  showTitle,
}: DefectSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {
    qiDefaultList,
    loadingQiDefaults,
    moreLoadingQiDefault,
    isListEndQiDefault,
  } = useSelector(state => state.quality_qiDefault);

  const fetchDefectLineAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchDefect as any)({
          page,
          searchValue,
          companyId: user.activeCompany?.id,
        }),
      );
    },
    [dispatch, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      title={showTitle && I18n.t(placeholderKey)}
      objectList={qiDefaultList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchDefectLineAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingQiDefaults}
      moreLoading={moreLoadingQiDefault}
      isListEnd={isListEndQiDefault}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const DefectSearchBar = ({
  placeholderKey,
  defaultValue,
  onChange = () => {},
  showDetailsPopup,
  navigate,
  oneFilter,
  showTitle,
}: DefectSearchBarProps) => {
  return (
    <DefectSearchBarAux
      placeholderKey={placeholderKey}
      defaultValue={defaultValue}
      onChange={onChange}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
      showTitle={showTitle}
    />
  );
};

export default DefectSearchBar;
