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
  displayItemFullname,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {fetchClientAndProspect} from '../../../features/partnerSlice';

const ClientProspectSearchBar = ({
  style = null,
  title = 'Crm_ClientProspect',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  showTitle = true,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingList, moreLoading, isListEnd, clientAndProspectList} =
    useSelector(state => state.partner);
  const {user} = useSelector(state => state.user);

  const searchClientAndProspectAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        fetchClientAndProspect({
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
      isFocus={isFocus}
      style={style}
    />
  );
};

export default ClientProspectSearchBar;
