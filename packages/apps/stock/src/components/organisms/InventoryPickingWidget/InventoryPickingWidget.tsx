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
import {
  showToastMessage,
  usePermitted,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {MassScannerButton} from '../../molecules';
import {
  searchInventoryLinesApi,
  updateInventoryLineDetailsApi,
} from '../../../api';

interface InventoryPickingWidgetProps {
  scanKey: string;
  inventoryId: number;
  inventoryStatus?: number;
  onRefresh?: () => void;
  handleShowLine?: (line: any) => void;
}

const InventoryPickingWidget = ({
  scanKey,
  inventoryId,
  inventoryStatus,
  onRefresh,
  handleShowLine,
}: InventoryPickingWidgetProps) => {
  const I18n = useTranslator();
  const {Inventory} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.InventoryLine',
  });

  const handleScanValue = useCallback(
    async (scanValue: string, {disableScan}: {disableScan: () => void}) => {
      const data = await searchInventoryLinesApi({
        inventoryId,
        searchValue: scanValue,
        useMassScanSortKey: true,
      }).then(res => res?.data?.data);

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Stock_Picking_NoInventoryLineFound');
      } else if (data.length > 1) {
        throw new Error('Stock_Picking_MultipleInventoryLinesFound');
      }

      const line = data[0];
      const {
        id,
        version,
        realQty: currentQty,
        stockLocation,
        description,
      } = line;

      const newQty = parseFloat(currentQty ?? 0) + 1;

      const result = await updateInventoryLineDetailsApi({
        inventoryLineId: id,
        version,
        stockLocationId: stockLocation?.id,
        realQty: newQty,
        description,
      }).then((res: any) => res?.data);

      if (result?.codeStatus !== 200) {
        throw new Error('Stock_Picking_ErrorLineUpdate');
      }

      onRefresh?.();

      showToastMessage({
        position: 'bottom',
        type: 'success',
        text1: I18n.t('Base_Success'),
        text2: I18n.t('Stock_Picking_LineUpdated', {id, newQty}),
        onPress: !handleShowLine
          ? undefined
          : () => {
              disableScan();
              handleShowLine(line);
            },
      });
    },
    [I18n, inventoryId, onRefresh, handleShowLine],
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

  const isAvailable = useMemo(
    () => !readonly && inventoryStatus < Inventory?.statusSelect.Completed,
    [Inventory?.statusSelect.Completed, inventoryStatus, readonly],
  );

  if (!isAvailable) {
    return null;
  }

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

export default InventoryPickingWidget;
