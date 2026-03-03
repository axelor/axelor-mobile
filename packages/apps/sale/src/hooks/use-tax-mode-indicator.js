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
import {fetchSaleConfig} from '../features/saleConfigSlice';

const CONFIG = {
  Always_WT: 1,
  Always_ATI: 2,
  WT_by_default: 3,
  ATI_by_default: 4,
};

export const useTaxModeIndicator = (inAti, type = 'base') => {
  const dispatch = useDispatch();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {saleConfig} = useSelector(state => state.sale_saleConfig);
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchSaleConfig({companyId: user?.activeCompany?.id}));
  }, [dispatch, user?.activeCompany?.id]);

  const selectedConfig = useMemo(() => {
    return type === 'sale'
      ? saleConfig?.saleOrderInAtiSelect
      : baseConfig?.productInAtiSelect;
  }, [type, baseConfig, saleConfig]);

  const shouldDisplayIndicator = useMemo(() => {
    return (
      (inAti &&
        (selectedConfig === CONFIG.Always_WT ||
          selectedConfig === CONFIG.WT_by_default)) ||
      (!inAti &&
        (selectedConfig === CONFIG.Always_ATI ||
          selectedConfig === CONFIG.ATI_by_default))
    );
  }, [inAti, selectedConfig]);

  return shouldDisplayIndicator;
};
