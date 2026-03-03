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

import React, {useMemo, useState} from 'react';
import {ChipSelect, Screen, Text} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  SearchTreeView,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {
  searchEquipment,
  searchPlaceEquipment,
} from '../../features/equipmentSlice';
import {searchEquipmentApi} from '../../api';
import {ClientProspectSearchBar, EquipmentActionCard} from '../../components';

const CustomerParkScreen = ({}) => {
  const I18n = useTranslator();
  const {canDelete, readonly, canCreate} = usePermitted({
    modelName: 'com.axelor.apps.intervention.db.Equipment',
  });
  const {Equipment} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [customer, setCustomer] = useState(null);

  const {
    loadingList,
    moreLoading,
    isListEnd,
    equipmentList,
    equipmentPlaceList,
  } = useSelector((state: any) => state.intervention_equipment);

  const serviceStatusList = useMemo(
    () => getSelectionItems(Equipment?.serviceSelect, selectedStatus),
    [Equipment?.serviceSelect, getSelectionItems, selectedStatus],
  );

  const sliceParentFunctionData = useMemo(
    () => ({
      partnerId: customer?.id,
    }),
    [customer?.id],
  );

  const sliceFunctionData = useMemo(
    () => ({
      inService: selectedStatus[0]?.value,
      partnerId: customer?.id,
    }),
    [customer?.id, selectedStatus],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchTreeView
        parentList={equipmentPlaceList}
        list={equipmentList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceParentFunction={searchPlaceEquipment}
        sliceParentFunctionData={sliceParentFunctionData}
        sliceFunction={searchEquipment}
        sliceFunctionData={sliceFunctionData}
        sliceFunctionDataParentIdName="parentPlaceId"
        sliceFunctionDataNoParentName="noParent"
        fetchBranchData={branchId =>
          searchEquipmentApi({
            inService: selectedStatus[0]?.value,
            partnerId: customer?.id,
            parentPlaceId: branchId,
          })
        }
        branchCondition={item =>
          item.typeSelect === Equipment?.typeSelect.Place
        }
        displayParentSearchValue={displayItemName}
        searchParentPlaceholder={I18n.t('Intervention_ParentPlace')}
        searchPlaceholder={I18n.t('Base_Search')}
        parentFieldName="parentEquipment"
        renderBranch={({item}) => (
          <>
            <Text writingType="important">{item.name}</Text>
            <Text>{item.sequence}</Text>
          </>
        )}
        renderLeaf={({item}) => (
          <EquipmentActionCard
            idEquipment={item.id}
            equipmentVersion={item.version}
            sequence={item.sequence}
            name={item.name}
            code={item.code}
            equipmentFamily={item.equipmentFamily?.name}
            inService={item.inService}
            handleArchive={() => {
              setCustomer(_current => ({..._current}));
            }}
            canArchive={canDelete}
            canCopy={canCreate}
            canEdit={!readonly}
          />
        )}
        headerTopChildren={
          <ClientProspectSearchBar
            required={true}
            defaultValue={customer}
            onChange={setCustomer}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={setSelectedStatus}
            selectionItems={serviceStatusList}
          />
        }
      />
    </Screen>
  );
};

export default CustomerParkScreen;
