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

import React, {useCallback, useMemo} from 'react';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {
  TranslatorProps,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchEquipementMaintenance} from '../../../features/equipementMaintenanceSlice';
import {EquipementMaintenanceActionCard} from '../../molecules';

const displayEquipement = (item: any, I18n: TranslatorProps) => {
  return `${item.code} - ${item.name}\n${I18n.t('Maintenance_Machine')} : ${item.machine.name}`;
};

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

  if (defaultValue != null) {
    return (
      <EquipementMaintenanceActionCard
        onPress={() => onChange(null)}
        item={defaultValue}
        readonly={readonly}
      />
    );
  }

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
      displayValue={_i => displayEquipement(_i, I18n)}
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
