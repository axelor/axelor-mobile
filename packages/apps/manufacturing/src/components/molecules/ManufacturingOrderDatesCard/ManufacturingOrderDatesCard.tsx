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

import React, {useMemo} from 'react';
import {FromTo, TitledValue} from '@axelor/aos-mobile-ui';
import {isEmpty, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ManufacturingOrder} from '../../../types';

function ManufacturingOrderDatesCard({}) {
  const I18n = useTranslator();

  const {manufOrder} = useSelector((state: any) => state.manufacturingOrder);

  const [startDate, endDate] = useMemo(() => {
    if (!isEmpty(manufOrder)) {
      return ManufacturingOrder.getDates(
        manufOrder?.statusSelect,
        manufOrder?.plannedStartDateT,
        manufOrder?.plannedEndDateT,
        manufOrder?.realStartDateT,
        manufOrder?.realEndDateT,
        I18n,
      );
    }
    return [];
  }, [I18n, manufOrder]);

  return (
    <FromTo
      fromComponent={
        <TitledValue
          title={
            manufOrder?.statusSelect === ManufacturingOrder.status.Draft ||
            manufOrder?.statusSelect === ManufacturingOrder.status.Planned
              ? I18n.t('Base_Estimated')
              : I18n.t('Base_Real')
          }
          value={startDate?.value}
        />
      }
      toComponent={
        <TitledValue
          title={
            manufOrder?.statusSelect === ManufacturingOrder.status.Finished
              ? I18n.t('Base_Real')
              : I18n.t('Base_Estimated')
          }
          value={endDate?.value}
        />
      }
    />
  );
}

export default ManufacturingOrderDatesCard;
