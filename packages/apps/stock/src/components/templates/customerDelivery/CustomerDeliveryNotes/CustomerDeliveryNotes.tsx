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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {EditableHtmlInput, NotesCard} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {updateCustomerDeliveryNote} from '../../../../features/customerDeliverySlice';

interface CustomerDeliveryNotesProps {
  titleKey?: string;
  notes: string;
  readonly?: boolean;
}

const CustomerDeliveryNotes = ({
  titleKey = 'Stock_NotesOnStockMove',
  notes,
  readonly = false,
}: CustomerDeliveryNotesProps) => {
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
      readonly ||
      modelReadonly ||
      customerDelivery?.statusSelect >= StockMove?.statusSelect.Realized,
    [
      StockMove?.statusSelect.Realized,
      customerDelivery?.statusSelect,
      modelReadonly,
      readonly,
    ],
  );

  if (isReadonly) {
    return <NotesCard title={I18n.t(titleKey)} data={notes} />;
  }

  return (
    <EditableHtmlInput
      style={styles.input}
      title={I18n.t(titleKey)}
      onValidate={handleValidate}
      defaultValue={notes}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 30,
  },
});

export default CustomerDeliveryNotes;
