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

import React, {useCallback, useMemo} from 'react';
import {
  useTranslator,
  Stopwatch,
  isEmpty,
  StopwatchType,
  useDispatch,
  useSelector,
} from '@axelor/aos-mobile-core';
import {OperationOrder} from '../../../types';
import {updateOperationOrder} from '../../../features/operationOrderSlice';

const OperationOrderStopwatch = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {operationOrder} = useSelector(state => state.operationOrder);

  const {status: timerStatus, time} = useMemo(() => {
    if (!isEmpty(operationOrder)) {
      return OperationOrder.getTimerState(operationOrder);
    }
    return {status: StopwatchType.status.Ready, time: 0};
  }, [operationOrder]);

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

  return (
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
  );
};

export default OperationOrderStopwatch;
