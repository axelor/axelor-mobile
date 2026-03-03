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

import {useCallback, useMemo} from 'react';
import {useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

export function useLogisticalFormState() {
  const {LogisticalForm} = useTypes();
  const {getSelectionItems, getItemColor} = useTypeHelpers();

  const options = useMemo(
    () => getSelectionItems(LogisticalForm?.packagingState),
    [LogisticalForm?.packagingState, getSelectionItems],
  );

  const getLineStatus = useCallback(
    ({qty, qtyRemainingToPackage}) => {
      const _qtyRemainingToPackage = parseFloat(qtyRemainingToPackage ?? '0');
      const _qty = parseFloat(qty ?? '0');
      if (_qtyRemainingToPackage === 0) {
        return LogisticalForm?.packagingState.Processed;
      } else if (_qtyRemainingToPackage === _qty) {
        return LogisticalForm?.packagingState.NotProcessed;
      } else {
        return LogisticalForm?.packagingState.PartiallyProcessed;
      }
    },
    [LogisticalForm?.packagingState],
  );

  const getLineColor = useCallback(
    (line: any) =>
      getItemColor(LogisticalForm?.packagingState, getLineStatus(line)),
    [LogisticalForm?.packagingState, getItemColor, getLineStatus],
  );

  const filterLineState = useCallback(
    (items: any[], states: any[]) => {
      if (!Array.isArray(states) || states.length === 0) return items;

      return items.filter(_i =>
        states.map(_s => _s.key).includes(getLineStatus(_i)),
      );
    },
    [getLineStatus],
  );

  return useMemo(
    () => ({options, getLineColor, filterLineState}),
    [filterLineState, getLineColor, options],
  );
}
