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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslator, showToastMessage} from '@axelor/aos-mobile-core';
import {MassScannerButton} from '../../molecules';
import {searchAvailableProductsApi} from '../../../api';

type SetterFunction<T> = (value: T | ((_current: T) => T)) => void;

interface InternalMoveCreationPickingWidgetProps {
  style?: any;
  scanKey: string;
  stockLocationId: number;
  setLines: SetterFunction<any[]>;
  handleEditLine?: (line: any) => void;
}

const InternalMoveCreationPickingWidget = ({
  style,
  scanKey,
  stockLocationId,
  setLines,
  handleEditLine,
}: InternalMoveCreationPickingWidgetProps) => {
  const I18n = useTranslator();

  const handleScanValue = useCallback(
    async (scanValue: string, {disableScan}: {disableScan: () => void}) => {
      const data = await searchAvailableProductsApi({
        stockLocationId,
        searchValue: scanValue,
      }).then(res => res?.data?.data);

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Stock_Picking_NoProductFound');
      } else if (data.length > 1) {
        throw new Error('Stock_Picking_MultipleProductsFound');
      }

      let line = {...data[0], unit: data[0].product?.unit, realQty: 1};
      const _id = line.id;

      setLines(prev => {
        const updated = [...prev];
        const index = updated.findIndex(_i => _i.id === _id);

        if (index >= 0) {
          updated[index].realQty += line.realQty;
          line = updated[index];
        } else {
          updated.push(line);
        }

        return updated;
      });

      showToastMessage({
        position: 'bottom',
        type: 'success',
        text1: I18n.t('Base_Success'),
        text2: I18n.t('Stock_Picking_LineUpdatedProduct', {
          productName: line.product?.name,
          newQty: line.realQty,
        }),
        onPress: !handleEditLine
          ? undefined
          : () => {
              disableScan();
              handleEditLine(line);
            },
      });
    },
    [stockLocationId, setLines, I18n, handleEditLine],
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
