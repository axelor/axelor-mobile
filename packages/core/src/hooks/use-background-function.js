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

import {useCallback, useEffect, useRef} from 'react';

const TIME_BETWEEN_CALL = 300000;

export const useBackgroundFunction = backgroundFunctions => {
  const interval = useRef(null);

  const handleListFunctions = useCallback(() => {
    backgroundFunctions?.forEach(backgroundFunction => {
      backgroundFunction();
    });
  }, [backgroundFunctions]);

  return useEffect(() => {
    if (backgroundFunctions?.length === 0) {
      return;
    }

    interval.current = setInterval(handleListFunctions, TIME_BETWEEN_CALL);
    return () => clearInterval(interval.current);
  }, [backgroundFunctions?.length, handleListFunctions]);
};
