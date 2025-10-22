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
import {
  showToastMessage,
  useNavigation,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {MassScannerButton} from '../../../molecules';
import {createPackagingLineApi, searchStockMoveLineApi} from '../../../../api';

const DEFAULT_SCAN_KEY = 'packaging-line_mass-scan';

interface PackagingLineMassScannerProps {
  style?: any;
  title?: string;
  readonly?: boolean;
  objectState?: any;
  scanKey?: string;
}

const PackagingLineMassScannerAux = ({
  style,
  title = 'Stock_StartMassScan',
  readonly = false,
  objectState,
  scanKey = DEFAULT_SCAN_KEY,
}: PackagingLineMassScannerProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const packaging = useMemo(
    () => objectState?.parentPackaging,
    [objectState?.parentPackaging],
  );

  const stockMoveId = useMemo(
    () => objectState?.stockMoveSet?.map((_m: any) => _m?.id) ?? [],
    [objectState?.stockMoveSet],
  );

  const handleScanValue = useCallback(
    async (scanValue: string, {disableScan}: {disableScan: () => void}) => {
      const data = await searchStockMoveLineApi({stockMoveId, scanValue}).then(
        res => res?.data?.data ?? [],
      );

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Stock_PackagingMassScan_InvalidBarcode');
      } else if (data.length > 1) {
        throw new Error('Stock_PackagingMassScan_MultipleLinesFound');
      }

      const line = data[0];
      const {id, product, trackingNumber, qtyRemainingToPackage, unit} = line;
      const _qty = parseFloat(qtyRemainingToPackage ?? '0');

      if (_qty === 0) {
        throw new Error('Stock_NoQtyRemainingToPackage');
      }

      const result = await createPackagingLineApi({
        packagingId: packaging.id,
        stockMoveLineId: id,
        quantity: _qty,
      }).then((res: any) => res?.data);

      if (result?.codeStatus !== 201) {
        throw new Error('Stock_PackagingMassScan_ErrorLineCreation');
      }

      showToastMessage({
        position: 'bottom',
        type: 'success',
        text1: I18n.t('Base_Success'),
        text2: I18n.t('Stock_PackagingMassScan_LineCreated', {
          product: `${product?.fullName}${trackingNumber?.id ? `(${trackingNumber.trackingNumberSeq})` : ''}`,
          qty: _qty,
          unit: unit?.name ?? '',
        }),
        onPress: () => {
          disableScan();
          navigation.replace('PackagingItemFormScreen', {
            packagingLine: {
              ...result.object,
              id: result.object.packagingLineId,
              stockMoveLine: {...line, qtyRemainingToPackage: '0'},
              qty: _qty,
              packaging,
            },
          });
        },
      });
    },
    [I18n, navigation, packaging, stockMoveId],
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
    () => !readonly && stockMoveId.length > 0,
    [readonly, stockMoveId.length],
  );

  if (!isAvailable) return null;

  return (
    <MassScannerButton
      style={style}
      scanKey={scanKey}
      titleKey={title}
      backgroundAction={handleScanValue}
      fallbackAction={handleError}
      scanInterval={1500}
    />
  );
};

const PackagingLineMassScanner = (props: PackagingLineMassScannerProps) => (
  <PackagingLineMassScannerAux {...props} />
);

export default PackagingLineMassScanner;
