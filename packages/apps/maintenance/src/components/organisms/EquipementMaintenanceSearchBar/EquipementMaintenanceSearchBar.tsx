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

import React, {useCallback, useEffect, useMemo} from 'react';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchEquipementMaintenance} from '../../../features/equipementMaintenanceSlice';

interface EquipementMaintenanceSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: (value?: any) => void;
  objectState?: any;
  required?: boolean;
  readonly?: boolean;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
}

const EquipementMaintenanceSearchBarAux = ({
  style,
  title = 'Maintenance_MaintenanceEquipment',
  defaultValue,
  onChange,
  objectState,
  required = false,
  readonly = false,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
}: EquipementMaintenanceSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    equipementMaintenanceList,
    loadingEquipementMaintenances,
    moreLoadingEquipementMaintenance,
    isListEndEquipementMaintenance,
  } = useSelector(state => state.maintenance_equipementMaintenance);

  const machineId = useMemo(
    () => objectState?.machineId,
    [objectState?.machineId],
  );

  const fetchEquipementMaintenanceAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchEquipementMaintenance as any)({
          page,
          searchValue,
          machineId,
        }),
      );
    },
    [dispatch, machineId],
  );

  useEffect(() => {
    if (equipementMaintenanceList.length === 1) {
      onChange(equipementMaintenanceList[0]);
    }
  }, [equipementMaintenanceList, onChange]);

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={equipementMaintenanceList}
      loadingList={loadingEquipementMaintenances}
      moreLoading={moreLoadingEquipementMaintenance}
      isListEnd={isListEndEquipementMaintenance}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchEquipementMaintenanceAPI}
      displayValue={displayItemName}
      readonly={readonly}
      required={required}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

const EquipementMaintenanceSearchBar = (
  props: EquipementMaintenanceSearchBarProps,
) => {
  return <EquipementMaintenanceSearchBarAux {...props} />;
};

export default EquipementMaintenanceSearchBar;
