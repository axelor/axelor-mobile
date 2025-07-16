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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {EditableHtmlInput, Text} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {updateCustomerDeliveryNote} from '../../../../features/customerDeliverySlice';

const CustomerDeliveryNotes = ({notes, readonly = false}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {customerDelivery} = useSelector(state => state.customerDelivery);

  const handleNotesChange = value => {
    dispatch(
      updateCustomerDeliveryNote({
        customerDeliveryId: customerDelivery.id,
        version: customerDelivery.version,
        note: value,
      }),
    );
  };

  return (
    <View>
      <Text style={styles.title}>{I18n.t('Stock_NotesOnStockMove')}</Text>
      <EditableHtmlInput
        onValidate={handleNotesChange}
        defaultValue={notes}
        readonly={readonly}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    marginLeft: 30,
  },
});

export default CustomerDeliveryNotes;
