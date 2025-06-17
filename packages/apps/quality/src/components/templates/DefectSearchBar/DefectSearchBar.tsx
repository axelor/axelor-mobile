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
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: (value?: any) => void;
  required?: boolean;
  readonly?: boolean;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  showTitle?: boolean;
}

const DefectSearchBarAux = ({
  style,
  title = 'Quality_Defects',
  defaultValue,
  onChange,
  required = false,
  readonly = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  showTitle = true,
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
      style={style}
      title={showTitle && I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={qiDefaultList}
      loadingList={loadingQiDefaults}
      moreLoading={moreLoadingQiDefault}
      isListEnd={isListEndQiDefault}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchDefectLineAPI}
      displayValue={displayItemName}
      readonly={readonly}
      required={required}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const DefectSearchBar = (props: DefectSearchBarProps) => {
  return <DefectSearchBarAux {...props} />;
};

export default DefectSearchBar;
