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
import {HeaderContainer, Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {searchEquipmentLine} from '../../features/equipmentLineSlice';
import {EquipmentLineCard, EquipmentDetailsHeader} from '../../components';

const EquipmentLineListScreen = ({}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {equipment} = useSelector((state: any) => state.intervention_equipment);
  const {loadingList, moreLoading, isListEnd, equipmentLineList} = useSelector(
    (state: any) => state.intervention_equipmentLine,
  );

  const fetchEquipmentLineAPI = useCallback(
    (page = 0) => {
      dispatch(
        (searchEquipmentLine as any)({equipmentId: equipment?.id, page}),
      );
    },
    [dispatch, equipment.id],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<EquipmentDetailsHeader />}
      />
      <ScrollList
        loadingList={loadingList}
        data={equipmentLineList}
        renderItem={({item}) => (
          <EquipmentLineCard
            productName={item.product?.name}
            productCode={item.product?.code}
            trackingNumber={item.trackingNumber?.trackingNumberSeq}
            comments={item.comments}
            quantity={item.quantity}
            unit={item.product?.unit?.name}
          />
        )}
        fetchData={fetchEquipmentLineAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default EquipmentLineListScreen;
