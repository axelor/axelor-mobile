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
import {StyleSheet} from 'react-native';
import {useTranslator, showToastMessage} from '@axelor/aos-mobile-core';
import {MassScannerButton} from '../../molecules';
import {searchAvailableProductsApi} from '../../../api';

interface InternalMoveCreationPickingWidgetProps {
  style: any;
  scanKey: string;
  stockLocationId: number;
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
}

const InternalMoveCreationPickingWidget = ({
  style,
  scanKey,
  stockLocationId,
  setLines,
}: InternalMoveCreationPickingWidgetProps) => {
  const I18n = useTranslator();

  const handleScanValue = useCallback(
    async (scanValue: string, {}) => {
      const result = await (searchAvailableProductsApi as any)({
        stockLocationId,
        searchValue: scanValue,
      }).then(res => res?.data?.data);

      if (!Array.isArray(result) || result.length === 0) {
        throw new Error('Stock_Picking_NoLineFound');
      } else if (result.length > 1) {
        throw new Error('Stock_Picking_MultipleLinesFound');
      }

      const scanned = result[0];
      const productName = scanned.product?.name;
      const id = scanned.id;
      const qty = 1;
      let newQty = qty;

      setLines(prev => {
        const updated = [...prev];
        const index = updated.findIndex(line => line.id === id);

        if (index >= 0) {
          updated[index].realQty += qty;
          newQty = updated[index].realQty;
        } else {
          updated.push({
            product: scanned.product,
            trackingNumber: scanned.trackingNumber,
            realQty: qty,
            currentQty: scanned.currentQty,
            unit: scanned.product?.unit,
            id,
          });
        }

        return updated;
      });

      showToastMessage({
        position: 'bottom',
        type: 'success',
        text1: I18n.t('Base_Success'),
        text2: I18n.t('Stock_Picking_LineUpdatedProduct', {
          productName,
          id,
          newQty: newQty,
        }),
      });
    },
    [I18n, stockLocationId, setLines],
  );

  const handleError = useCallback(
    (error: any) => {
      showToastMessage({
        position: 'bottom',
        type: 'error',
        text1: I18n.t('Base_Error'),
        text2: I18n.t(error.message),
      });
    },
    [I18n],
  );

  return (
    <MassScannerButton
      style={[styles.container, style]}
      scanKey={scanKey}
      titleKey="Stock_StartMassScan"
      backgroundAction={handleScanValue}
      fallbackAction={handleError}
      scanInterval={1500}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
});

export default InternalMoveCreationPickingWidget;
