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

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {DropdownMenuItem, HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {
  HeaderOptionsMenu,
  isEmpty,
  Stopwatch,
  StopwatchType,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {OperationOrderDatesCard} from '../../components/molecules';
import {
  OperationOrderHeader,
  OperationOrderLabelTextList,
} from '../../components/organisms';
import OperationOrder from '../../types/operation-order';
import {
  fetchOperationOrderById,
  updateOperationOrder,
} from '../../features/operationOrderSlice';

function OperationOrderDetailsScreen({route, navigation}) {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {loadingOrder, operationOrder} = useSelector(
    state => state.operationOrder,
  );

  const updateStatus = useCallback(
    status => {
      dispatch(
        updateOperationOrder({
          operationOrderId: operationOrder?.id,
          version: operationOrder?.version,
          status,
        }),
      );
    },
    [dispatch, operationOrder],
  );

  const [startDate, endDate] = useMemo(() => {
    if (!isEmpty(operationOrder)) {
      return OperationOrder.getDates(
        operationOrder?.statusSelect,
        operationOrder?.plannedStartDateT,
        operationOrder?.plannedEndDateT,
        operationOrder?.realStartDateT,
        operationOrder?.realEndDateT,
        I18n,
        false,
      );
    }
    return [];
  }, [I18n, operationOrder]);

  const {status: timerStatus, time} = useMemo(() => {
    if (!isEmpty(operationOrder)) {
      return OperationOrder.getTimerState(operationOrder);
    }
    return {status: StopwatchType.status.Ready, time: 0};
  }, [operationOrder]);

  useEffect(() => {
    dispatch(
      fetchOperationOrderById({
        operationOrderId: route.params.operationOrderId,
      }),
    );
  }, [dispatch, route.params.operationOrderId]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.production.db.OperationOrder"
          modelId={operationOrder?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}>
          <DropdownMenuItem
            icon="folder-open"
            placeholder={I18n.t('Manufacturing_ProductionFile')}
            onPress={() =>
              navigation.navigate('ProductionFileScreen', {
                prodProcessLineId: operationOrder?.prodProcessLine?.id,
              })
            }
          />
        </HeaderOptionsMenu>
      ),
    });
  }, [I18n, navigation, mobileSettings, operationOrder]);

  return (
    <Screen removeSpaceOnTop={true} loading={loadingOrder}>
      <HeaderContainer
        fixedItems={
          <OperationOrderHeader
            manufOrderRef={operationOrder?.manufOrder?.manufOrderSeq}
            name={operationOrder?.operationName}
            status={operationOrder?.statusSelect}
            priority={operationOrder?.priority}
          />
        }
        expandableFilter={false}
      />
      <View style={styles.contentContainer}>
        <OperationOrderDatesCard
          status={operationOrder?.statusSelect}
          startDate={startDate?.value}
          endDate={endDate?.value}
        />
        <OperationOrderLabelTextList operationOrder={operationOrder} />
        <Stopwatch
          startTime={time}
          status={timerStatus}
          timerFormat={I18n.t('Stopwatch_TimerFormat')}
          onPlay={() => updateStatus(OperationOrder.status.InProgress)}
          onPause={() => updateStatus(OperationOrder.status.StandBy)}
          onStop={() => updateStatus(OperationOrder.status.Finished)}
          disableStop={
            operationOrder?.statusSelect === OperationOrder.status.StandBy
          }
          disableCancel={
            operationOrder?.statusSelect === OperationOrder.status.Finished
          }
          hideCancel={true}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10,
  },
});

export default OperationOrderDetailsScreen;
