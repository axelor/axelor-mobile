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

import {useMemo} from 'react';
import {useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

function extractQty(str: string) {
  const match = str?.match(/\(([^)]+)\)/);
  return match ? parseFloat(match[1]) : undefined;
}

export const useSaleOrderLineAvailability = ({
  availableStatus,
  availableStatusSelect,
}: {
  availableStatus?: string;
  availableStatusSelect?: number;
}) => {
  const {SaleOrderLine} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  return useMemo(
    () => ({
      availabilityTitle: getItemTitle(
        SaleOrderLine?.availableStatusSelect,
        availableStatusSelect,
      ),
      availabilityColor: getItemColor(
        SaleOrderLine?.availableStatusSelect,
        availableStatusSelect,
      ),
      missingQty: extractQty(availableStatus),
      isAvailabilityHidden:
        availableStatusSelect == null || availableStatusSelect === 0,
    }),
    [
      SaleOrderLine?.availableStatusSelect,
      availableStatus,
      availableStatusSelect,
      getItemColor,
      getItemTitle,
    ],
  );
};
