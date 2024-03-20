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
import {ChipSelect, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useTranslator,
  SearchListView,
} from '@axelor/aos-mobile-core';
import {searchEquipment} from '../../features/equipmentSlice';
import {CustomerParkHeader, EquipmentActionCard} from '../../components';
import {Equipment} from '../../types';

const CustomerParkScreen = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [parentPlace, setParentPlace] = useState(null);

  const {loadingList, moreLoading, isListEnd, equipmentList} = useSelector(
    state => state.intervention_equipment,
  );

  const sliceFunctionData = useMemo(
    () => ({
      inService: selectedStatus[0]?.key,
      partnerId: customer?.id,
      parentPlaceId: parentPlace?.id,
    }),
    [customer?.id, parentPlace?.id, selectedStatus],
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
        onChangeSearchValue={() => {}}
        searchPlaceholder={I18n.t('Base_Search')}
        renderListItem={({item}) => (
          <EquipmentActionCard
            sequence={item.sequence}
            name={item.name}
            code={item.code}
            equipmentFamily={item.equipmentFamily?.name}
            inService={item.inService}
          />
        )}
        headerTopChildren={
          <CustomerParkHeader
            setCustomer={setCustomer}
            customer={customer}
            inService={selectedStatus[0]?.key}
            parentPlace={parentPlace}
            setParentPlace={setParentPlace}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={Equipment.getStatusList(Colors, I18n)}
          />
        }
      />
    </Screen>
  );
};

export default CustomerParkScreen;
