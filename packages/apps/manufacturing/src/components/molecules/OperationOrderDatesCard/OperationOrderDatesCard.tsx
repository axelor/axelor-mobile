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

import React, {useMemo} from 'react';
import {MovementIndicationCard} from '@axelor/aos-mobile-ui';
import {
  isEmpty,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {OperationOrder as OperationOrderType} from '../../../types';

const ESTIMATED_ICON = 'calendar-event';
const REAL_ICON = 'calendar-check';

function OperationOrderDatesCard({}) {
  const I18n = useTranslator();
  const {OperationOrder} = useTypes();

  const {operationOrder} = useSelector(state => state.operationOrder);

  const [startDate, endDate] = useMemo(() => {
    if (!isEmpty(operationOrder)) {
      return OperationOrderType.getDates(
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

  const startConfig = useMemo(
    () =>
      operationOrder?.statusSelect === OperationOrder?.statusSelect.Draft ||
      operationOrder?.statusSelect === OperationOrder?.statusSelect.Planned
        ? {label: I18n.t('Base_Estimated'), icon: ESTIMATED_ICON}
        : {label: I18n.t('Base_Real'), icon: REAL_ICON},
    [
      I18n,
      OperationOrder?.statusSelect.Draft,
      OperationOrder?.statusSelect.Planned,
      operationOrder?.statusSelect,
    ],
  );

  const endConfig = useMemo(
    () =>
      operationOrder?.statusSelect === OperationOrder?.statusSelect.Finished
        ? {label: I18n.t('Base_Real'), icon: REAL_ICON}
        : {label: I18n.t('Base_Estimated'), icon: ESTIMATED_ICON},
    [I18n, OperationOrder?.statusSelect.Finished, operationOrder?.statusSelect],
  );

  return (
    <MovementIndicationCard
      iconTop={startConfig.icon}
      labelTop={startConfig.label}
      titleTop={startDate?.value ?? ''}
      iconDown={endConfig.icon}
      labelDown={endConfig.label}
      titleDown={endDate?.value ?? ''}
      displayCard={false}
    />
  );
}

export default OperationOrderDatesCard;
