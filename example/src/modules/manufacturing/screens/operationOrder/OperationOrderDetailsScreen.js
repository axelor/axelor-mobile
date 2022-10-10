import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderContainer, LabelText, Screen} from '@aos-mobile/ui';
import {Stopwatch, StopwatchType, useTranslator} from '@aos-mobile/core';
import {OperationOrderDatesCard} from '../../components/molecules';
import {OperationOrderHeader} from '../../components/organisms';
import OperationOrder from '../../types/operation-order';
import {formatDuration} from '../../utils/time';
import {fetchOperationOrderById} from '../../features/operationOrderSlice';

function OperationOrderDetailsScreen({route, navigation}) {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingOrder, operationOrder} = useSelector(
    state => state.operationOrder,
  );

  useEffect(() => {
    dispatch(
      fetchOperationOrderById({
        operationOrderId: route.params.operationOrderId,
      }),
    );
  }, [dispatch, route.params.operationOrderId]);

  const [startDate, endDate] = useMemo(() => {
    if (operationOrder != null) {
      return OperationOrder.getDates(
        operationOrder.statusSelect,
        operationOrder.plannedStartDateT,
        operationOrder.plannedEndDateT,
        operationOrder.realStartDateT,
        operationOrder.realEndDateT,
        I18n,
        false,
      );
    }
    return [null, null];
  }, [I18n, operationOrder]);

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
          startDate={startDate}
          endDate={endDate}
        />
        <View style={styles.detailsContainer}>
          <LabelText
            iconName="stopwatch"
            size={20}
            title={I18n.t('Manufacturing_PlannedDuration') + ':'}
            value={formatDuration(operationOrder?.plannedDuration)}
          />
          {operationOrder?.workCenter && (
            <LabelText
              iconName="warehouse"
              size={15}
              title={I18n.t('Manufacturing_WorkCenter') + ':'}
              value={operationOrder?.workCenter?.name}
            />
          )}
          {operationOrder?.machine && (
            <LabelText
              iconName="tools"
              size={18}
              title={I18n.t('Manufacturing_Machine') + ':'}
              value={operationOrder?.machine?.name}
            />
          )}
        </View>
        <Stopwatch startTime={0} status={StopwatchType.status.Ready} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10,
  },
  detailsContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
});

export default OperationOrderDetailsScreen;
