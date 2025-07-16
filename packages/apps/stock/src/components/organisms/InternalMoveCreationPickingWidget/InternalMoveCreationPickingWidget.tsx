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
import {useTranslator, showToastMessage} from '@axelor/aos-mobile-core';
import {MassScannerButton} from '../../molecules';
import {searchAvailableProductsApi} from '../../../api';

interface InternalMoveCreationPickingWidgetProps {
  scanKey: string;
  stockLocationId: number;
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
}

const InternalMoveCreationPickingWidget = ({
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
      const id = scanned.id;
      const qty = 1;

      setLines(prev => {
        const updated = [...prev];
        const index = updated.findIndex(line => line.id === id);

        if (index >= 0) {
          updated[index].realQty += qty;
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
        type: 'success',
        text1: I18n.t('Base_Success'),
        text2: I18n.t('Stock_Picking_LineUpdated', {
          id,
          newQty: qty,
        }),
      });
    },
    [I18n, stockLocationId, setLines],
  );

  const handleError = useCallback(
    (error: any) => {
      showToastMessage({
        type: 'error',
        text1: I18n.t('Base_Error'),
        text2: I18n.t(error.message),
      });
    },
    [I18n],
  );

  return (
    <MassScannerButton
      scanKey={scanKey}
      titleKey="Stock_StartMassScan"
      backgroundAction={handleScanValue}
      fallbackAction={handleError}
      scanInterval={1500}
    />
  );
};

export default InternalMoveCreationPickingWidget;
