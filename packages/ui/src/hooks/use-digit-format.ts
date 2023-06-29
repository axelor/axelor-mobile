/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {useCallback} from 'react';
import {useConfig} from '../config/ConfigContext';
import {checkNullString} from '../utils';

export const useDigitFormat = () => {
  const {nbDecimalDigitForQty} = useConfig();

  return useCallback(
    (numberToFormat: number | string) => {
      if (typeof numberToFormat === 'number') {
        numberToFormat = numberToFormat.toString();
      }

      if (checkNullString(numberToFormat)) {
        return parseFloat('0').toFixed(nbDecimalDigitForQty);
      }

      return parseFloat(numberToFormat).toFixed(nbDecimalDigitForQty);
    },
    [nbDecimalDigitForQty],
  );
};
