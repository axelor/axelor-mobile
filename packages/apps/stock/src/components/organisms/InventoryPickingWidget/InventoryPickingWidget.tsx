import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {showToastMessage, useTranslator} from '@axelor/aos-mobile-core';
import {MassScannerButton} from '../../molecules';
import {
  searchInventoryLinesApi,
  updateInventoryLineDetailsApi,
} from '../../../api/';

interface InventoryPickingWidgetProps {
  scanKey: string;
  inventoryId: number;
  totalLines: number;
  onRefresh?: () => void;
  handleShowLine?: (line: any) => void;
}

const InventoryPickingWidget = ({
  scanKey,
  inventoryId,
  totalLines,
  onRefresh,
  handleShowLine,
}: InventoryPickingWidgetProps) => {
  const I18n = useTranslator();
  const [validatedLines, setValidatedLines] = useState(0);

  const getValidatedLines = useCallback(async () => {
    if (!inventoryId) return;
    const total = await searchInventoryLinesApi({
      inventoryId,
    })
      .then(res => Number(res?.data?.total) ?? 0)
      .catch(() => 0);
    setValidatedLines(total);
  }, [inventoryId]);

  useEffect(() => {
    if (totalLines > 0) getValidatedLines();
  }, [getValidatedLines, totalLines]);

  const progress = useMemo(() => {
    if (totalLines > 0) return validatedLines / totalLines;
    return 0;
  }, [totalLines, validatedLines]);

  const handleScanValue = useCallback(
    async (scanValue: string, {disableScan}) => {
      const data = await searchInventoryLinesApi({
        inventoryId,
        searchValue: scanValue,
      }).then(res => {
        return res?.data?.data;
      });
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Stock_Picking_NoLineFound');
      } else if (data.length > 1) {
        throw new Error('Stock_Picking_MultipleLinesFound');
      }

      const line = data[0];
      const {id, version, realQty, stockLocation} = line;
      const result = await updateInventoryLineDetailsApi({
        inventoryLineId: id,
        version,
        stockLocationId: stockLocation.id,
        realQty: (parseFloat(realQty) || 0) + 1,
      }).then((res: any) => res?.data);

      if (result?.codeStatus !== 200)
        throw new Error('Stock_Picking_ErrorLineUpdate');
      onRefresh?.();

      showToastMessage({
        position: 'bottom',
        type: 'success',
        text1: I18n.t('Base_Success'),
        text2: I18n.t('Stock_Picking_LineUpdated', {
          id,
          newQty: (parseFloat(realQty) || 0) + 1,
        }),
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
    error => {
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
      scanKey={scanKey}
      progress={progress}
      titleKey="Stock_StartPicking"
      backgroundAction={handleScanValue}
      fallbackAction={handleError}
      scanInterval={1500}
    />
  );
};

export default InventoryPickingWidget;
