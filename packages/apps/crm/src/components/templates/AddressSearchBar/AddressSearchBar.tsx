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
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchAddress} from '../../../features/addressSlice';

const AddressSearchBar = ({
  style = null,
  title = 'Crm_Address',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  showTitle = true,
}) => {
  const dispatch = useDispatch();

  const {loadingAddresss, moreLoadingAddress, isListEndAddress, addressList} =
    useSelector(state => state.crm_address);

  const searchAddressAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((searchAddress as any)({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && title}
      readonly={readonly}
      required={required}
      objectList={addressList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={searchAddressAPI}
      displayValue={displayItemFullname}
      placeholder={title}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingAddresss}
      moreLoading={moreLoadingAddress}
      isListEnd={isListEndAddress}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

export default AddressSearchBar;
