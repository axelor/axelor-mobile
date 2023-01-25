/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useCallback, useState, useEffect} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  Chip,
  ChipSelect,
  Screen,
  ScrollList,
  HeaderContainer,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  ManufacturingOrderHeader,
  OperationOrderCard,
} from '../../components/organisms';
import {fetchOperationOrders} from '../../features/operationOrderSlice';
import ManufacturingOrder from '../../types/manufacturing-order';

const ManufacturingOrderOperationListScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const {
    loading: loadingOperations,
    moreLoading,
    isListEnd,
    operationOrderList,
  } = useSelector(state => state.operationOrder);
  const [filteredList, setFilteredList] = useState(operationOrderList);
  const [plannedStatus, setPlannedStatus] = useState(false);
  const [progressStatus, setProgressStatus] = useState(false);
  const [standByStatus, setStandByStatus] = useState(false);
  const [finishedStatus, setFinishedStatus] = useState(false);
  const dispatch = useDispatch();

  const handleShowLine = item => {
    navigation.navigate('OperationOrderDetailsScreen', {
      operationOrderId: item.id,
    });
  };

  const fetchOperationOrdersAPI = useCallback(
    page => {
      dispatch(
        fetchOperationOrders({
          manufOrderId: manufOrder?.id,
          page: page,
        }),
      );
    },
    [dispatch, manufOrder?.id],
  );

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
              if (item.statusSelect === ManufacturingOrder.status.Planned) {
                listFilter.push(item);
              }
            });
          }
          if (progressStatus) {
            list.forEach(item => {
              if (item.statusSelect === ManufacturingOrder.status.InProgress) {
                listFilter.push(item);
              }
            });
          }
          if (standByStatus) {
            list.forEach(item => {
              if (item.statusSelect === ManufacturingOrder.status.StandBy) {
                listFilter.push(item);
              }
            });
          }
          if (finishedStatus) {
            list.forEach(item => {
              if (item.statusSelect === ManufacturingOrder.status.Finished) {
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
    setFilteredList(filterOnStatus(operationOrderList));
  }, [operationOrderList, filterOnStatus]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ManufacturingOrderHeader
            parentMO={manufOrder.parentMO}
            reference={manufOrder.manufOrderSeq}
            status={manufOrder.statusSelect}
            priority={manufOrder.prioritySelect}
          />
        }
        chipComponent={
          <ChipSelect style={styles.chipContainer} scrollable={true}>
            <Chip
              selected={plannedStatus}
              title={I18n.t('Manufacturing_Status_Planned')}
              onPress={handlePlannedStatus}
              selectedColor={ManufacturingOrder.getStatusColor(
                ManufacturingOrder.status.Planned,
                Colors,
              )}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={2}
            />
            <Chip
              selected={progressStatus}
              title={I18n.t('Manufacturing_Status_InProgress')}
              onPress={handleProgressStatus}
              selectedColor={ManufacturingOrder.getStatusColor(
                ManufacturingOrder.status.InProgress,
                Colors,
              )}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={2}
            />
            <Chip
              selected={standByStatus}
              title={I18n.t('Manufacturing_Status_StandBy')}
              onPress={handleStandByStatus}
              selectedColor={ManufacturingOrder.getStatusColor(
                ManufacturingOrder.status.StandBy,
                Colors,
              )}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={2}
            />
            <Chip
              selected={finishedStatus}
              title={I18n.t('Manufacturing_Status_Finished')}
              onPress={handleFinishedStatus}
              selectedColor={ManufacturingOrder.getStatusColor(
                ManufacturingOrder.status.Finished,
                Colors,
              )}
              width={Dimensions.get('window').width * 0.3}
              marginHorizontal={2}
            />
          </ChipSelect>
        }
      />
      <ScrollList
        loadingList={loadingOperations}
        data={filteredList}
        renderItem={({item}) => (
          <OperationOrderCard
            style={styles.item}
            status={item.statusSelect}
            operationName={item.operationName}
            workcenter={item.workCenter.name}
            plannedDuration={item.plannedDuration}
            priority={item.priority}
            onPress={() => handleShowLine(item)}
          />
        )}
        fetchData={fetchOperationOrdersAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
});

export default ManufacturingOrderOperationListScreen;
