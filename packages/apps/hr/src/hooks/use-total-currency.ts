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

import {useMemo} from 'react';
import {useSelector} from '@axelor/aos-mobile-core';

function getCurrencyLabel(_currency: any): string {
  return _currency?.symbol ?? _currency?.code;
}

export const useTotalCurrency = ({
  currency,
  inTaxTotal,
  companyInTaxTotal,
}: {
  currency: any;
  inTaxTotal: string;
  companyInTaxTotal: string;
}) => {
  const {user} = useSelector(state => state.user);

  const companyCurrency = useMemo(
    () => user.activeCompany?.currency,
    [user.activeCompany?.currency],
  );

  const displayCompanyCurrency = useMemo(
    () => currency?.id !== companyCurrency?.id,
    [currency?.id, companyCurrency?.id],
  );

  return useMemo(
    () => ({
      displayCompanyCurrency,
      expenseTotal: {
        inTaxTotal: inTaxTotal,
        currency: getCurrencyLabel(currency),
      },
      companyTotal: {
        inTaxTotal: companyInTaxTotal,
        currency: getCurrencyLabel(companyCurrency),
      },
    }),
    [
      companyInTaxTotal,
      currency,
      inTaxTotal,
      companyCurrency,
      displayCompanyCurrency,
    ],
  );
};
