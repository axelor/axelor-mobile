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

import React, {useCallback, useEffect, useState} from 'react';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {searchEquipments} from '../../features/equipmentsSlice';
import {CustomerParkHeader, EquipmentActionCard} from '../../components';
import {Equipment} from '../../types';

const CustomerParkScreen = ({}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [customer, setCustomer] = useState(null);

  const {loadingList, moreLoading, isListEnd, equipmentList} = useSelector(
    state => state.intervention_equipments,
  );

  useEffect(() => {
    dispatch(searchEquipments({}));
  }, [dispatch]);

  const searchEquipmentsAPI = useCallback(
    (page = 0) => {
      dispatch(
        searchEquipments({
          page: page,
          inService: selectedStatus[0]?.key,
          partnerId: customer?.id,
        }),
      );
    },
    [customer, dispatch, selectedStatus],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <CustomerParkHeader setCustomer={setCustomer} customer={customer} />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Intervention_Status_InService'),
                color: Colors.successColor,
                key: Equipment.status.InService,
              },
              {
                title: I18n.t('Intervention_Status_NotInService'),
                color: Colors.cautionColor,
                key: Equipment.status.NotInService,
              },
            ]}
          />
        }
      />
      <ScrollList
        loadingList={loadingList}
        data={equipmentList}
        fetchData={searchEquipmentsAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
        renderItem={({item}) => (
          <EquipmentActionCard
            sequence={item.sequence}
            name={item.name}
            code={item.code}
            equipmentFamily={item.equipmentFamily?.name}
            inService={item.inService}
          />
        )}
      />
    </Screen>
  );
};

export default CustomerParkScreen;
