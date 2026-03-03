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
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, LabelText} from '@axelor/aos-mobile-ui';
import {clipboardProvider, useTranslator} from '@axelor/aos-mobile-core';

interface ClipableSaleOrderLabelProps {
  saleOrderLine: {
    sequence: string;
    saleOrder: {
      saleOrderSeq: string;
      clientPartner: {fullName: string};
    };
  };
}

const ClipableSaleOrderLabel = ({
  saleOrderLine,
}: ClipableSaleOrderLabelProps) => {
  const I18n = useTranslator();

  const {sequence, lineNumber, clientName} = useMemo(
    () => ({
      sequence: saleOrderLine?.saleOrder?.saleOrderSeq,
      lineNumber: saleOrderLine?.sequence,
      clientName: saleOrderLine?.saleOrder?.clientPartner.fullName ?? '',
    }),
    [saleOrderLine],
  );

  if (!saleOrderLine) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => clipboardProvider.copyToClipboard(sequence)}>
      <LabelText
        style={styles.text}
        title={`${I18n.t('Stock_SaleOrder')} :`}
        value={`${sequence}-${lineNumber} (${clientName})`}
      />
      <Icon name="copy" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginHorizontal: 24,
  },
  text: {
    flex: 1,
  },
});

export default ClipableSaleOrderLabel;
