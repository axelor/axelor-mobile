import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  AutoCompleteSearch,
  Chip,
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  filterList,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import OperationOrder from '../../types/operation-order';
import {fetchOperationOrders} from '../../features/operationOrderSlice';
import {displayManufOrderSeq} from '../../utils/displayers';
import {OperationOrderDetailsCard} from '../../components/organisms';
import {searchWorkCenters} from '../../features/workCentersSlice';
import {searchMachines} from '../../features/machinesSlice';

const refScanKey = 'manufOrderSeq_manufacturing-order-list';

function OperationOrderListScreen({navigation}) {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {loading, moreLoading, isListEnd, operationOrderList} = useSelector(
    state => state.operationOrder,
  );
  const {workCenterList} = useSelector(state => state.workCenters);
  const {machineList} = useSelector(state => state.machines);
  const [workCenter, setWorkCenter] = useState(null);
  const [machine, setMachine] = useState(null);
  const [filteredList, setFilteredList] = useState(operationOrderList);
  const [plannedStatus, setPlannedStatus] = useState(false);
  const [progressStatus, setProgressStatus] = useState(false);
  const [standByStatus, setStandByStatus] = useState(false);
  const [finishedStatus, setFinishedStatus] = useState(false);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const dispatch = useDispatch();

  const desactivateChip = () => {
    setPlannedStatus(false);
    setProgressStatus(false);
    setStandByStatus(false);
    setFinishedStatus(false);
  };

  const handlePlannedStatus = () => {
    if (progressStatus && standByStatus && finishedStatus) {
      desactivateChip();
    } else {
      setPlannedStatus(!plannedStatus);
    }
  };

  const handleProgressStatus = () => {
    if (plannedStatus && standByStatus && finishedStatus) {
      desactivateChip();
    } else {
      setProgressStatus(!progressStatus);
    }
  };

  const handleStandByStatus = () => {
    if (plannedStatus && progressStatus && finishedStatus) {
      desactivateChip();
    } else {
      setStandByStatus(!standByStatus);
    }
  };

  const handleFinishedStatus = () => {
    if (plannedStatus && progressStatus && standByStatus) {
      desactivateChip();
    } else {
      setFinishedStatus(!finishedStatus);
    }
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        const listFilter = [];
        if (
          plannedStatus ||
          progressStatus ||
          standByStatus ||
          finishedStatus
        ) {
          if (plannedStatus) {
            list.forEach(item => {
              if (item.statusSelect === OperationOrder.status.Planned) {
                listFilter.push(item);
              }
            });
          }
          if (progressStatus) {
            list.forEach(item => {
              if (item.statusSelect === OperationOrder.status.InProgress) {
                listFilter.push(item);
              }
            });
          }
          if (standByStatus) {
            list.forEach(item => {
              if (item.statusSelect === OperationOrder.status.StandBy) {
                listFilter.push(item);
              }
            });
          }
          if (finishedStatus) {
            list.forEach(item => {
              if (item.statusSelect === OperationOrder.status.Finished) {
                listFilter.push(item);
              }
            });
          }
        } else {
          return list;
        }

        return listFilter;
      }
    },
    [finishedStatus, plannedStatus, progressStatus, standByStatus],
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
  }, [filterOnStatus, operationOrderList, workCenter, machine]);

  const navigateToOperationOrder = item => {
    if (item != null) {
      setNavigate(true);
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
    searchValue => {
      setFilter(searchValue);
      dispatch(
        fetchOperationOrders({
          searchValue: searchValue,
          page: 0,
        }),
      );
    },
    [dispatch],
  );

  const fetchWorkCentersAPI = useCallback(
    searchValue => {
      dispatch(searchWorkCenters({searchValue: searchValue}));
    },
    [dispatch],
  );

  const fetchMachinesAPI = useCallback(
    searchValue => {
      dispatch(searchMachines({searchValue: searchValue}));
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
          <ChipSelect style={styles.chipContainer} scrollable={true}>
            <Chip
              selected={plannedStatus}
              title={I18n.t('Manufacturing_Status_Planned')}
              onPress={handlePlannedStatus}
              selectedColor={OperationOrder.getStatusColor(
                OperationOrder.status.Planned,
                Colors,
              )}
              width={Dimensions.get('window').width * 0.35}
              marginHorizontal={3}
            />
            <Chip
              selected={progressStatus}
              title={I18n.t('Manufacturing_Status_InProgress')}
              onPress={handleProgressStatus}
              selectedColor={OperationOrder.getStatusColor(
                OperationOrder.status.InProgress,
                Colors,
              )}
              width={Dimensions.get('window').width * 0.35}
              marginHorizontal={3}
            />
            <Chip
              selected={standByStatus}
              title={I18n.t('Manufacturing_Status_StandBy')}
              onPress={handleStandByStatus}
              selectedColor={OperationOrder.getStatusColor(
                OperationOrder.status.StandBy,
                Colors,
              )}
              width={Dimensions.get('window').width * 0.35}
              marginHorizontal={3}
            />
            <Chip
              selected={finishedStatus}
              title={I18n.t('Manufacturing_Status_Finished')}
              onPress={handleFinishedStatus}
              selectedColor={OperationOrder.getStatusColor(
                OperationOrder.status.Finished,
                Colors,
              )}
              width={Dimensions.get('window').width * 0.35}
              marginHorizontal={3}
            />
          </ChipSelect>
        }>
        <AutoCompleteSearch
          objectList={workCenterList}
          value={workCenter}
          onChangeValue={item => setWorkCenter(item)}
          fetchData={fetchWorkCentersAPI}
          displayValue={displayItemName}
          placeholder={I18n.t('Manufacturing_WorkCenter')}
        />
        <AutoCompleteSearch
          objectList={machineList}
          value={machine}
          onChangeValue={item => setMachine(item)}
          fetchData={fetchMachinesAPI}
          displayValue={displayItemName}
          placeholder={I18n.t('Manufacturing_Machine')}
        />
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
