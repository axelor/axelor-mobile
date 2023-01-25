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

import React from 'react';
import {FromTo, TitledValue} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import OperationOrder from '../../../types/operation-order';

interface OperationOrderDatesCardProps {
  status: number;
  startDate: string;
  endDate: string;
}

function OperationOrderDatesCard({
  status,
  startDate,
  endDate,
}: OperationOrderDatesCardProps) {
  const I18n = useTranslator();

  return (
    <FromTo
      fromComponent={
        <TitledValue
          title={
            status === OperationOrder.status.Draft ||
            status === OperationOrder.status.Planned
              ? I18n.t('Base_Estimated')
              : I18n.t('Base_Real')
          }
          value={startDate}
        />
      }
      toComponent={
        <TitledValue
          title={
            status === OperationOrder.status.Finished
              ? I18n.t('Base_Real')
              : I18n.t('Base_Estimated')
          }
          value={endDate}
        />
      }
    />
  );
}

export default OperationOrderDatesCard;
