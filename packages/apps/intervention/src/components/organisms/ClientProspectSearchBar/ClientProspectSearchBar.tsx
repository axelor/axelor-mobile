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
import {searchClientAndProspect} from '../../../features/clientAndProspectSlice';
import {CustomComponentProps} from '../../../utils';

const ClientProspectSearchBar = ({
  style = null,
  title = 'Intervention_Customer',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  showTitle = false,
}: CustomComponentProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {loadingList, moreLoading, isListEnd, clientAndProspectList} =
    useSelector((state: any) => state.intervention_clientAndProspect);

  const searchClientAndProspectAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchClientAndProspect as any)({
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
      title={showTitle && I18n.t(title)}
      objectList={clientAndProspectList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchClientAndProspectAPI}
      displayValue={displayItemFullname}
      placeholder={I18n.t(title)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingList}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
      style={style}
    />
  );
};

export default ClientProspectSearchBar;
