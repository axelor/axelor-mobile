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
  useDispatch,
  useSelector,
  useTranslator,
  displayItemFullname,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchPartner} from '../../../features/partnerSlice';

const PartnerSearchBarAux = ({
  style = null,
  title = 'Crm_Partner',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {partnerList, loadingPartnerList, moreLoading, isListEnd} = useSelector(
    state => state.partner,
  );
  const {user} = useSelector(state => state.user);

  const fetchPartnerSearchBarAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchPartner({page, searchValue, companyId: user.activeCompany?.id}),
      );
    },
    [dispatch, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={partnerList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchPartnerSearchBarAPI}
      displayValue={displayItemFullname}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingPartnerList}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={false}
      oneFilter={false}
      isFocus={false}
      readonly={readonly}
      required={required}
    />
  );
};

const PartnerSearchBar = ({
  style = null,
  title = 'Crm_Partner',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
}) => {
  return (
    <PartnerSearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default PartnerSearchBar;
