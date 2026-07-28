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
import {ChipSelect, Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {fetchOperationOrders} from '../../features/operationOrderSlice';
import {displayManufOrderSeq} from '../../utils';
import {
  OperationOrderDetailsCard,
  MachineSearchBar,
  WorkCenterSearchBar,
} from '../../components';

const refScanKey = 'manufOrderSeq_manufacturing-order-list';

function OperationOrderListScreen({navigation}: any) {
  const I18n = useTranslator();
  const {OperationOrder} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {loadingList, moreLoading, isListEnd, operationOrderList} = useSelector(
    state => state.operationOrder,
  );
  const {user} = useSelector(state => state.user);

  const [machine, setMachine] = useState<any>();
  const [workCenter, setWorkCenter] = useState<any>();
  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [navigate, setNavigate] = useState(false);

  const navigateToOperationOrder = (item: any) => {
    if (item != null) {
      setNavigate(current => !current);
      navigation.navigate('OperationOrderDetailsScreen', {
        operationOrderId: item.id,
      });
    }
  };

  const sliceFunctionData = useMemo(
    () => ({
      statusList: selectedStatus,
      workCenterId: workCenter?.id,
      machineId: machine?.id,
      companyId: user.activeCompany?.id,
    }),
    [machine?.id, selectedStatus, user.activeCompany?.id, workCenter?.id],
  );

  const statusList = useMemo(() => {
    const statusToDisplay = [
      OperationOrder?.statusSelect.Planned,
      OperationOrder?.statusSelect.InProgress,
      OperationOrder?.statusSelect.StandBy,
      OperationOrder?.statusSelect.Finished,
    ];

    return getSelectionItems(
      OperationOrder?.statusSelect,
      selectedStatus,
    ).filter(({value}) => statusToDisplay.includes(value));
  }, [OperationOrder?.statusSelect, getSelectionItems, selectedStatus]);

  return (
    <Screen removeSpaceOnTop>
      <SearchListView
        list={operationOrderList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchOperationOrders}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={navigateToOperationOrder}
        displaySearchValue={displayManufOrderSeq}
        searchPlaceholder={I18n.t('Manufacturing_Ref')}
        searchNavigate={navigate}
        scanKeySearch={refScanKey}
        chipComponent={
          <ChipSelect
            mode="multi"
            onChangeValue={setSelectedStatus}
            selectionItems={statusList}
          />
        }
        headerChildren={
          <>
            <WorkCenterSearchBar onChange={setWorkCenter} />
            <MachineSearchBar onChange={setMachine} />
          </>
        }
        renderListItem={({item}) => (
          <OperationOrderDetailsCard
            status={item.statusSelect}
            manufOrder={item.manufOrder?.manufOrderSeq}
            operationName={item.operationName}
            workcenter={item.workCenter?.name}
            machine={item.machine?.name}
            plannedStartDate={item.plannedStartDateT}
            plannedEndDate={item.plannedEndDateT}
            plannedDuration={item.plannedDuration}
            realStartDate={item.realStartDateT}
            realEndDate={item.realEndDateT}
            priority={item.priority}
            onPress={() => navigateToOperationOrder(item)}
          />
        )}
      />
    </Screen>
  );
}

export default OperationOrderListScreen;
