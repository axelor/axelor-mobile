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
import {showToastMessage, useTranslator} from '@axelor/aos-mobile-core';
import {MassScannerButton} from '../../../molecules';
import {createPackagingLineApi, searchStockMoveLineApi} from '../../../../api';

interface LogisticalFormPackagingMassScannerProps {
  style?: any;
  title?: string;
  objectState?: any;
  readonly?: boolean;
  scanKey?: string;
}

const DEFAULT_SCAN_KEY = 'packaging-line_mass-scan';

const LogisticalFormPackagingMassScannerAux = ({
  style,
  title = 'Stock_StartMassScan',
  objectState,
  readonly,
  scanKey = DEFAULT_SCAN_KEY,
}: LogisticalFormPackagingMassScannerProps) => {
  const I18n = useTranslator();

  const packagingId = objectState?.packaging?.id;

  const stockMoveIds = useMemo(
    () => (objectState?.stockMoveSet ?? []).map((_m: any) => _m?.id),
    [objectState?.stockMoveSet],
  );

  const handleScan = useCallback(
    async (scanValue: string, _tools?: {disableScan: () => void}) => {
      const trimmedValue = scanValue?.trim();

      if (!trimmedValue) {
        throw new Error('Stock_PackagingMassScan_InvalidBarcode');
      }

      if (readonly) {
        throw new Error('Stock_PackagingMassScan_Readonly');
      }

      if (packagingId == null) {
        throw new Error('Stock_PackagingMassScan_SelectPackaging');
      }

      if (!Array.isArray(stockMoveIds) || stockMoveIds.length === 0) {
        throw new Error('Stock_PackagingMassScan_NoLinkedStockMove');
      }

      const responses = await Promise.all(
        stockMoveIds.map(stockMoveId =>
          searchStockMoveLineApi({
            stockMoveId,
            scanValue: trimmedValue,
          }).then(res => res?.data?.data ?? []),
        ),
      );

      const linesMap = new Map<number, any>();
      responses
        .flat()
        .filter((line: any) => line?.id != null)
        .forEach((line: any) => {
          linesMap.set(line.id, line);
        });

      const matchingLines = Array.from(linesMap.values());

      if (matchingLines.length === 0) {
        throw new Error('Stock_PackagingMassScan_InvalidBarcode');
      }

      const linesWithQty = matchingLines.filter(
        (line: any) => (line?.qtyRemainingToPackage ?? 0) > 0,
      );

      if (linesWithQty.length === 0) {
        throw new Error('Stock_PackagingMassScan_NoQuantity');
      }

      if (linesWithQty.length > 1) {
        throw new Error('Stock_PackagingMassScan_MultipleLinesFound');
      }

      const [line] = linesWithQty;
      const unitLabel =
        line?.unit?.name != null && line.unit.name !== ''
          ? ` ${line.unit.name}`
          : '';

      await createPackagingLineApi({
        packagingId,
        stockMoveLineId: line.id,
        quantity: line.qtyRemainingToPackage,
      });

      showToastMessage({
        position: 'bottom',
        type: 'success',
        text1: I18n.t('Base_Success'),
        text2: I18n.t('Stock_PackagingMassScan_LineCreated', {
          productName:
            line?.product?.fullName ?? line?.product?.name ?? trimmedValue,
          qty: line?.qtyRemainingToPackage,
          unit: unitLabel,
        }),
      });
    },
    [I18n, packagingId, readonly, stockMoveIds],
  );

  const handleError = useCallback(
    (error: any) => {
      const errorKey =
        typeof error?.message === 'string'
          ? error.message
          : 'Stock_PackagingMassScan_UnknownError';

      showToastMessage({
        position: 'bottom',
        type: 'error',
        text1: I18n.t('Base_Error'),
        text2: I18n.t(errorKey),
      });
    },
    [I18n],
  );

  if (readonly) {
    return null;
  }

  return (
    <MassScannerButton
      style={style}
      scanKey={scanKey}
      titleKey={title}
      backgroundAction={handleScan}
      fallbackAction={handleError}
      scanInterval={1500}
    />
  );
};

const LogisticalFormPackagingMassScanner = (
  props: LogisticalFormPackagingMassScannerProps,
) => <LogisticalFormPackagingMassScannerAux {...props} />;

export default LogisticalFormPackagingMassScanner;
