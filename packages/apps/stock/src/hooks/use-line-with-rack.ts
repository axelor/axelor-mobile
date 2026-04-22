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

import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {getRacks} from '../features/racksListSlice';

export const useLinesWithRacks = (stockLocationId: number, lineSet: any[]) => {
  const dispatch = useDispatch();

  const {loadingRacks, racksMap} = useSelector(state => state.rack);

  useEffect(() => {
    dispatch((getRacks as any)({stockId: stockLocationId, LineList: lineSet}));
  }, [dispatch, stockLocationId, lineSet]);

  return useMemo(
    () => ({
      lineList: lineSet?.map(item => ({
        ...item,
        locker: !loadingRacks && (racksMap?.[item.product?.id] ?? ''),
      })),
    }),
    [lineSet, loadingRacks, racksMap],
  );
};

export const useLineWithRack = (stockLocationId: number, line: any) => {
  const dispatch = useDispatch();

  const {loadingRacks, racksMap} = useSelector(state => state.rack);

  useEffect(() => {
    if (line?.product?.id != null && stockLocationId != null) {
      dispatch((getRacks as any)({stockId: stockLocationId, LineList: [line]}));
    }
  }, [dispatch, stockLocationId, line]);

  return useMemo(
    () => !loadingRacks && (racksMap?.[line?.product?.id] ?? ''),
    [line?.product?.id, loadingRacks, racksMap],
  );
};
