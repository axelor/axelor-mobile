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

import {SearchFields} from '@axelor/aos-mobile-core';

export const quality_searchFields: SearchFields = {
  quality_controlEntry: ['entryDateTime'],
  quality_qualityImprovement: ['sequence'],
  quality_qiDetection: ['name', 'code'],
  quality_qiAnalysisMethod: ['objective'],
  quality_supplier: ['simpleFullName'],
  quality_supplierOrder: ['purchaseOrderSeq'],
  quality_supplierOrderLine: ['fullName'],
  quality_product: ['fullName', 'name'],
  quality_customer: ['simpleFullName'],
  quality_customerOrder: ['saleOrderSeq'],
  quality_customerOrderLine: ['productName'],
  quality_manufacturingOrder: ['manufOrderSeq'],
  quality_operationOrder: ['name'],
  quality_qiDefault: ['name'],
};
