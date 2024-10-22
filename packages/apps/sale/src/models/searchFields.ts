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

import {SearchFields} from '@axelor/aos-mobile-core';

export const sale_searchFields: SearchFields = {
  sale_product: [
    'name',
    'code',
    'productFamily.name',
    'productCategory.name',
    'description',
  ],
  sale_productCategory: ['name'],
  sale_saleOrder: ['saleOrderSeq', 'externalReference'],
  sale_customer: ['fullName', 'name', 'partnerSeq'],
  sale_customerCategory: ['name'],
  sale_complementaryProduct: ['product.name', 'product.code'],
  sale_priceListLine: ['priceList.title'],
  sale_cartLine: ['product.name', 'product.code'],
};
