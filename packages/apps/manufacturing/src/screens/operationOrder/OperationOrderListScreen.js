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

import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  filterList,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import OperationOrder from '../../types/operation-order';
import {fetchOperationOrders} from '../../features/operationOrderSlice';
import {displayManufOrderSeq} from '../../utils/displayers';
import {
  OperationOrderDetailsCard,
  MachineSearchBar,
  WorkCenterSearchBar,
} from '../../components';

const refScanKey = 'manufOrderSeq_manufacturing-order-list';

function OperationOrderListScreen({navigation}) {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loading, moreLoading, isListEnd, operationOrderList} = useSelector(
    state => state.operationOrder,
  );

  const [machine, setMachine] = useState(null);
  const [workCenter, setWorkCenter] = useState(null);
  const [filteredList, setFilteredList] = useState(operationOrderList);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'statusSelect');
    },
    [selectedStatus],
  );

  useEffect(() => {
    setFilteredList(
      filterOnStatus(
        filterList(
          operationOrderList,
          ['workCenter', 'machine'],
          ['id', 'id'],
          [workCenter?.id ?? '', machine?.id ?? ''],
        ),
      ),
    );
  }, [filterOnStatus, machine, operationOrderList, workCenter]);

  const navigateToOperationOrder = item => {
    if (item != null) {
      setNavigate(current => !current);
      navigation.navigate('OperationOrderDetailsScreen', {
        operationOrderId: item.id,
      });
    }
  };

  const fetchOperationOrderAPI = useCallback(
    page => {
      dispatch(
        fetchOperationOrders({
          searchValue: filter,
          page: page,
        }),
      );
    },
    [dispatch, filter],
  );

  const handleRefChange = useCallback(
    ({page = 0, searchValue}) => {
      setFilter(searchValue);
      dispatch(
        fetchOperationOrders({
          searchValue: searchValue,
          page: page,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <ScannerAutocompleteSearch
            objectList={operationOrderList}
            onChangeValue={item => navigateToOperationOrder(item)}
            fetchData={handleRefChange}
            displayValue={displayManufOrderSeq}
            placeholder={I18n.t('Manufacturing_Ref')}
            scanKeySearch={refScanKey}
            oneFilter={true}
            navigate={navigate}
          />
        }
        chipComponent={
          <ChipSelect
            mode="multi"
            marginHorizontal={3}
            width={Dimensions.get('window').width * 0.3}
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Manufacturing_Status_Planned'),
                color: OperationOrder.getStatusColor(
                  OperationOrder.status.Planned,
                  Colors,
                ),
                key: OperationOrder.status.Planned,
              },
              {
                title: I18n.t('Manufacturing_Status_InProgress'),
                color: OperationOrder.getStatusColor(
                  OperationOrder.status.InProgress,
                  Colors,
                ),
                key: OperationOrder.status.InProgress,
              },
              {
                title: I18n.t('Manufacturing_Status_StandBy'),
                color: OperationOrder.getStatusColor(
                  OperationOrder.status.StandBy,
                  Colors,
                ),
                key: OperationOrder.status.StandBy,
              },
              {
                title: I18n.t('Manufacturing_Status_Finished'),
                color: OperationOrder.getStatusColor(
                  OperationOrder.status.Finished,
                  Colors,
                ),
                key: OperationOrder.status.Finished,
              },
            ]}
          />
        }>
        <WorkCenterSearchBar onChange={setWorkCenter} />
        <MachineSearchBar onChange={setMachine} />
      </HeaderContainer>
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <OperationOrderDetailsCard
            style={styles.item}
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
        fetchData={fetchOperationOrderAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default OperationOrderListScreen;
