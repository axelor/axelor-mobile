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

import React, {useMemo} from 'react';
import {FromTo, TitledValue} from '@axelor/aos-mobile-ui';
import {isEmpty, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import OperationOrder from '../../../types/operation-order';

function OperationOrderDatesCard({}) {
  const I18n = useTranslator();

  const {operationOrder} = useSelector((state: any) => state.operationOrder);

  const [startDate, endDate] = useMemo(() => {
    if (!isEmpty(operationOrder)) {
      return OperationOrder.getDates(
        operationOrder?.statusSelect,
        operationOrder?.plannedStartDateT,
        operationOrder?.plannedEndDateT,
        operationOrder?.realStartDateT,
        operationOrder?.realEndDateT,
        I18n,
      );
    }
    return [];
  }, [I18n, operationOrder]);

  return (
    <FromTo
      fromComponent={
        <TitledValue
          title={
            operationOrder?.statusSelect === OperationOrder.status.Draft ||
            operationOrder?.statusSelect === OperationOrder.status.Planned
              ? I18n.t('Base_Estimated')
              : I18n.t('Base_Real')
          }
          value={startDate?.value}
        />
      }
      toComponent={
        <TitledValue
          title={
            operationOrder?.statusSelect === OperationOrder.status.Finished
              ? I18n.t('Base_Real')
              : I18n.t('Base_Estimated')
          }
          value={endDate?.value}
        />
      }
    />
  );
}

export default OperationOrderDatesCard;
