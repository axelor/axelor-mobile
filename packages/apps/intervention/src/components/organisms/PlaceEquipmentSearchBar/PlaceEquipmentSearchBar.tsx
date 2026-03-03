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
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchPlaceEquipment} from '../../../features/equipmentSlice';
import {CustomComponentProps} from '../../../utils';

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
  showTitle = false,
  customerId = null,
}: CustomComponentProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingListEquipPlace,
    moreLoadingEquipPlace,
    isListEndEquipPlace,
    equipmentPlaceList,
  } = useSelector((state: any) => state.intervention_equipment);

  const searchPlaceEquipmentAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchPlaceEquipment as any)({
          page,
          searchValue,
          partnerId: customerId,
        }),
      );
    },
    [customerId, dispatch],
  );

  return (
    <AutoCompleteSearch
      title={showTitle && I18n.t(title)}
      objectList={equipmentPlaceList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchPlaceEquipmentAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingListEquipPlace}
      moreLoading={moreLoadingEquipPlace}
      isListEnd={isListEndEquipPlace}
      navigate={navigate}
      oneFilter={oneFilter}
      style={style}
    />
  );
};

export default PlaceEquipmentSearchBar;
