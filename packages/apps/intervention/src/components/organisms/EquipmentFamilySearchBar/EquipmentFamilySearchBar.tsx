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
import {searchEquipmentFamily} from '../../../features/equipmentFamilySlice';
import {CustomComponentProps} from '../../../utils';

const EquipmentFamilySearchBarAux = ({
  style = null,
  title = 'Intervention_EquipmentFamily',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  showTitle = true,
}: CustomComponentProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingList, moreLoading, isListEnd, equipmentFamilyList} =
    useSelector((state: any) => state.intervention_equipmentFamily);

  const searchEquipmentFamilyAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((searchEquipmentFamily as any)({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      title={showTitle && I18n.t(title)}
      objectList={equipmentFamilyList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchEquipmentFamilyAPI}
      displayValue={displayItemName}
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

const EquipmentFamilySearchBar = ({
  style = null,
  title = 'Intervention_EquipmentFamily',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  showTitle = true,
}: CustomComponentProps) => {
  return (
    <EquipmentFamilySearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
      showTitle={showTitle}
    />
  );
};

export default EquipmentFamilySearchBar;
