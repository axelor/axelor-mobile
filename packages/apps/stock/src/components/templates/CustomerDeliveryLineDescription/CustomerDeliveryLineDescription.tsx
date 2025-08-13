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

import React, {useCallback} from 'react';
import {EditableHtmlInput, NotesCard} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {updateCustomerDeliveryLineDescription} from '../../../features/customerDeliveryLineSlice';

interface CustomerDeliveryNotesProps {
  titleKey?: string;
  readonly?: boolean;
}

const CustomerDeliveryLineDescription = ({
  titleKey = 'Base_Description',
  readonly = false,
}: CustomerDeliveryNotesProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {readonly: isReadonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });

  const {customerDelivery} = useSelector(state => state.customerDelivery);
  const {customerDeliveryLine} = useSelector(
    state => state.customerDeliveryLine,
  );

  const handleValidate = useCallback(
    value => {
      dispatch(
        (updateCustomerDeliveryLineDescription as any)({
          stockMoveLineId: customerDeliveryLine.id,
          customerDeliveryId: customerDelivery.id,
          version: customerDeliveryLine.version,
          realQty: customerDeliveryLine.realQty,
          description: value,
          fromStockLocation: customerDeliveryLine.fromStockLocation,
        }),
      );
    },
    [
      customerDelivery.id,
      customerDeliveryLine.fromStockLocation,
      customerDeliveryLine.id,
      customerDeliveryLine.realQty,
      customerDeliveryLine.version,
      dispatch,
    ],
  );

  if (isReadonly || readonly) {
    return (
      <NotesCard
        title={I18n.t(titleKey)}
        data={customerDeliveryLine?.description}
      />
    );
  }

  return (
    <EditableHtmlInput
      title={I18n.t('Base_Description')}
      onValidate={handleValidate}
      defaultValue={customerDeliveryLine?.description}
    />
  );
};

export default CustomerDeliveryLineDescription;
