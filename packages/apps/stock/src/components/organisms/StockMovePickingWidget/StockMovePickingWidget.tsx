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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  showToastMessage,
  usePermitted,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {searchStockMoveLineApi, updateStockMoveLineApi} from '../../../api';
import {MassScannerButton} from '../../molecules';

interface StockMovePickingWidgetProps {
  scanKey: string;
  stockMoveId: number;
  stockMoveStatus?: number;
  totalLines: number;
  onRefresh?: () => void;
  handleShowLine?: (line: any) => void;
}

const StockMovePickingWidget = ({
  scanKey,
  stockMoveId,
  stockMoveStatus,
  totalLines,
  onRefresh,
  handleShowLine,
}: StockMovePickingWidgetProps) => {
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });

  const [validatedLines, setValidatedLines] = useState(4);

  const getValidatedLines = useCallback(async () => {
    if (!stockMoveId) return;

    const total = await searchStockMoveLineApi({
      stockMoveId,
      checkValidated: true,
    })
      .then(res => Number(res?.data?.total) ?? 0)
      .catch(() => 0);

    setValidatedLines(total);
  }, [stockMoveId]);

  useEffect(() => {
    if (totalLines > 0) getValidatedLines();
  }, [getValidatedLines, totalLines]);

  const progress = useMemo(() => {
    if (totalLines > 0) return validatedLines / totalLines;

    return 0;
  }, [totalLines, validatedLines]);

  const handleScanValue = useCallback(
    async (scanValue: string, {disableScan}: {disableScan: () => void}) => {
      const data = await searchStockMoveLineApi({stockMoveId, scanValue}).then(
        res => res?.data?.data,
      );

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Stock_Picking_NoLineFound');
      } else if (data.length > 1) {
        throw new Error('Stock_Picking_MultipleLinesFound');
      }

      const line = data[0];
      const {id, version, realQty: currentQty} = line;

      const result = await updateStockMoveLineApi({
        stockMoveLineId: id,
        version,
        realQty: parseFloat(currentQty) + 1,
      }).then((res: any) => res?.data);

      if (result?.codeStatus !== 200) {
        throw new Error('Stock_Picking_ErrorLineUpdate');
      }

      onRefresh?.();
      getValidatedLines();

      showToastMessage({
        position: 'bottom',
        type: 'success',
        text1: I18n.t('Base_Success'),
        text2: I18n.t('Stock_Picking_LineUpdated', {
          id,
          newQty: result?.object?.realQty,
        }),
        onPress: !handleShowLine
          ? undefined
          : () => {
              disableScan();
              handleShowLine(line);
            },
      });
    },
    [I18n, getValidatedLines, handleShowLine, onRefresh, stockMoveId],
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
    () => !readonly && stockMoveStatus < StockMove?.statusSelect.Realized,
    [StockMove?.statusSelect.Realized, readonly, stockMoveStatus],
  );

  if (!isAvailable) {
    return null;
  }

  return (
    <MassScannerButton
      scanKey={scanKey}
      progress={progress}
      titleKey="Stock_StartPicking"
      backgroundAction={handleScanValue}
      fallbackAction={handleError}
      scanInterval={1500}
    />
  );
};

export default StockMovePickingWidget;
