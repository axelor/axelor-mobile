/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import {useMemo} from 'react';
import {useSelector} from '@axelor/aos-mobile-core';

const CONFIG = {
  Always_WT: 1,
  Always_ATI: 2,
  WT_by_default: 3,
  ATi_by_default: 4,
};

export const useTaxModeIndicator = (inAti, type = 'base') => {
  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {sale: saleConfig} = useSelector(state => state.appConfig);

  const selectedConfig = useMemo(() => {
    return type === 'sale'
      ? saleConfig?.saleOrderInAtiSelect
      : baseConfig?.productInAtiSelect;
  }, [type, baseConfig, saleConfig]);

  const shouldDisplayIndicator = useMemo(() => {
    if (
      (inAti &&
        (selectedConfig === CONFIG.Always_WT ||
          selectedConfig === CONFIG.WT_by_default)) ||
      (!inAti &&
        (selectedConfig === CONFIG.Always_ATI ||
          selectedConfig === CONFIG.ATi_by_default))
    ) {
      return true;
    }
    return false;
  }, [inAti, selectedConfig]);

  return shouldDisplayIndicator;
};
