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

import {useEffect, useMemo, useState} from 'react';
import {checkQuantityApi} from '../api';

export const useStockLinesCheckQty = stockMoveLineId => {
  const [checkQtyObject, setCheckQtyObject] = useState(null);

  useEffect(() => {
    if (stockMoveLineId) {
      checkQuantityApi({stockMoveLineId})
        .then(response => {
          if (response?.data?.object) {
            setCheckQtyObject(response?.data?.object);
          }
        })
        .catch(() => setCheckQtyObject(null));
    }
  }, [stockMoveLineId]);

  return useMemo(() => checkQtyObject, [checkQtyObject]);
};
