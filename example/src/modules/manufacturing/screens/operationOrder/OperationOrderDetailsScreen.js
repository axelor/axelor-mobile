import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  DropdownMenu,
  DropdownMenuItem,
  HeaderContainer,
  LabelText,
  Screen,
} from '@aos-mobile/ui';
import {
  Stopwatch,
  StopwatchType,
  useDispatch,
  useSelector,
  useTranslator,
} from '@aos-mobile/core';
import {OperationOrderDatesCard} from '../../components/molecules';
import {OperationOrderHeader} from '../../components/organisms';
import OperationOrder from '../../types/operation-order';
import {formatDuration} from '../../utils/time';
import {
  fetchOperationOrderById,
  updateOperationOrder,
} from '../../features/operationOrderSlice';
import {isEmpty} from '../../utils/objects';

function OperationOrderDetailsScreen({route, navigation}) {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingOrder, operationOrder} = useSelector(
    state => state.operationOrder,
  );

  const updateStatus = async status => {
    dispatch(
      await updateOperationOrder({
        operationOrderId: operationOrder.id,
        version: operationOrder.version,
        status,
      }),
    );
  };

  const [startDate, endDate] = useMemo(() => {
    if (!isEmpty(operationOrder)) {
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
        <DropdownMenu>
          <DropdownMenuItem
            icon="folder-open"
            placeholder={I18n.t('Manufacturing_ProductionFile')}
            onPress={() =>
              navigation.navigate('ProductionFileScreen', {
                prodProcessLineId: operationOrder.prodProcessLine.id,
              })
            }
          />
          <DropdownMenuItem
            placeholder={I18n.t('Stock_AttachedFiles')}
            onPress={() =>
              navigation.navigate('OperationOrderAttachedFilesScreen', {
                operationOrderId: operationOrder?.id,
              })
            }
          />
          <DropdownMenuItem
            placeholder={I18n.t('Base_MailMessages')}
            icon="bell"
            onPress={() =>
              navigation.navigate('OperationOrderMailMessagesScreen', {
                operationOrderId: operationOrder?.id,
              })
            }
          />
        </DropdownMenu>
      ),
    });
  }, [I18n, navigation, operationOrder]);

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
        <Stopwatch
          startTime={time}
          status={timerStatus}
          onPlay={() => updateStatus(OperationOrder.status.InProgress)}
          onPause={() => updateStatus(OperationOrder.status.StandBy)}
          onStop={() => updateStatus(OperationOrder.status.Finished)}
          disableStop={
            operationOrder.statusSelect === OperationOrder.status.StandBy
          }
          disableCancel={
            operationOrder.statusSelect === OperationOrder.status.Finished
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
  detailsContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
});

export default OperationOrderDetailsScreen;
