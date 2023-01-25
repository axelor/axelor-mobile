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

import {axiosApiProvider} from '@axelor/aos-mobile-core';

export async function searchSupplierProduct({supplierId, productId}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.purchase.db.SupplierCatalog/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: [
              {
                fieldName: 'supplierPartner.id',
                operator: '=',
                value: supplierId,
              },
              {
                fieldName: 'product.id',
                operator: '=',
                value: productId,
              },
            ],
          },
        ],
      },
      fields: ['id', 'productSupplierName', 'productSupplierCode'],
      sortBy: ['id'],
      limit: 1,
      offset: 0,
    },
  });
}
