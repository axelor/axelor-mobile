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

import React, {useMemo, useState} from 'react';
import {ChipSelect, Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {searchEquipment} from '../../features/equipmentSlice';
import {
  ClientProspectSearchBar,
  EquipmentActionCard,
  PlaceEquipmentSearchBar,
} from '../../components';

const CustomerParkScreen = ({}) => {
  const I18n = useTranslator();
  const {canDelete, readonly, canCreate} = usePermitted({
    modelName: 'com.axelor.apps.intervention.db.Equipment',
  });
  const {Equipment} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [parentPlace, setParentPlace] = useState(null);

  const {loadingList, moreLoading, isListEnd, equipmentList} = useSelector(
    (state: any) => state.intervention_equipment,
  );

  const serviceStatusList = useMemo(
    () => getSelectionItems(Equipment?.serviceSelect, selectedStatus),
    [Equipment?.serviceSelect, getSelectionItems, selectedStatus],
  );

  const sliceFunctionData = useMemo(
    () => ({
      inService: selectedStatus[0]?.value,
      partnerId: customer?.id,
      parentPlaceId: parentPlace?.id,
    }),
    [customer, parentPlace?.id, selectedStatus],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={equipmentList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchEquipment}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Base_Search')}
        renderListItem={({item}) => (
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
          <>
            <ClientProspectSearchBar
              required={true}
              defaultValue={customer}
              onChange={setCustomer}
            />
            <PlaceEquipmentSearchBar
              defaultValue={parentPlace}
              customerId={customer?.id}
              onChange={setParentPlace}
            />
          </>
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
