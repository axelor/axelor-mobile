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
import {searchPlaceEquipments} from '../../../features/equipmentsSlice';

const PlaceEquipmentSearchBar = ({
  style = null,
  title = 'Intervention_ParentPlace',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  showTitle = false,
  inService,
  customerId,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingListEquipPlace,
    moreLoadingEquipPlace,
    isListEndEquipPlace,
    equipmentListEquipPlace,
  } = useSelector(state => state.intervention_equipments);

  const searchClientAndProspectAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchPlaceEquipments({
          page,
          searchValue,
          inService: inService,
          partnerId: customerId,
        }),
      );
    },
    [customerId, dispatch, inService],
  );

  return (
    <AutoCompleteSearch
      title={showTitle && I18n.t(title)}
      objectList={equipmentListEquipPlace}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchClientAndProspectAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingListEquipPlace}
      moreLoading={moreLoadingEquipPlace}
      isListEnd={isListEndEquipPlace}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      style={style}
    />
  );
};

export default PlaceEquipmentSearchBar;
