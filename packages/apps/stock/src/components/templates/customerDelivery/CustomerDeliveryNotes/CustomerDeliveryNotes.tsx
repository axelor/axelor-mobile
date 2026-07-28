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

import React, {useCallback, useMemo} from 'react';
import {EditableHtmlInput, NotesCard} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {updateCustomerDeliveryNote} from '../../../../features/customerDeliverySlice';
import {StyleSheet} from 'react-native';

const CustomerDeliveryNotes = () => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();
  const {readonly: modelReadonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMove',
  });

  const {customerDelivery} = useSelector(state => state.customerDelivery);

  const handleValidate = useCallback(
    (value: string) => {
      dispatch(
        (updateCustomerDeliveryNote as any)({
          customerDeliveryId: customerDelivery.id,
          version: customerDelivery.version,
          note: value,
        }),
      );
    },
    [customerDelivery.id, customerDelivery.version, dispatch],
  );

  const isReadonly = useMemo(
    () =>
      modelReadonly ||
      customerDelivery?.statusSelect >= StockMove?.statusSelect.Realized,
    [
      StockMove?.statusSelect.Realized,
      customerDelivery?.statusSelect,
      modelReadonly,
    ],
  );

  return (
    <>
      {isReadonly ? (
        <NotesCard
          style={styles.notes}
          title={I18n.t('Stock_NotesOnStockMove')}
          data={customerDelivery?.note}
        />
      ) : (
        <EditableHtmlInput
          style={styles.notes}
          title={I18n.t('Stock_NotesOnStockMove')}
          onValidate={handleValidate}
          defaultValue={customerDelivery?.note}
        />
      )}
      <NotesCard
        style={styles.notes}
        title={I18n.t('Stock_PickingOrderComments')}
        data={customerDelivery?.pickingOrderComments}
      />
      <NotesCard
        style={styles.notes}
        title={I18n.t('Stock_DeliveryCondition')}
        data={customerDelivery?.deliveryCondition}
      />
    </>
  );
};

const styles = StyleSheet.create({
  notes: {
    width: '100%',
  },
});

export default CustomerDeliveryNotes;
