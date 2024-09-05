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

export {
  searchCart as searchCartApi,
  updateCart as updateCartApi,
} from './cart-api';
export {
  searchCartLine as searchCartLineApi,
  updateCartLine as updateCartLineApi,
  deleteCartLine as deleteCartLineApi,
  fetchCartLineById as fetchCartLineByIdApi,
} from './cart-line-api';
export {fetchComplementaryProduct as fetchComplementaryProductApi} from './complementary-product-api';
export {
  fetchCustomerById as fetchCustomerByIdApi,
  searchCustomer as searchCustomerApi,
  searchCustomerCategory as searchCustomerCategoryApi,
} from './customer-api';
export {fetchCustomerDelivery as fetchCustomerDeliveryApi} from './customer-delivery-api';
export {fetchPriceListLine as fetchPriceListLineApi} from './price-list-line-api';
export {
  fetchProductById as fetchProductByIdApi,
  fetchProductCompanyConfig as fetchProductCompanyConfigApi,
  fetchVariantAttributes as fetchVariantAttributesApi,
  fetchVariantProduct as fetchVariantProductApi,
  searchProduct as searchProductApi,
} from './product-api';
export {fetchSaleConfig as fetchSaleConfigApi} from './sale-config-api';
export {
  fetchSaleOrder as fetchSaleOrderApi,
  fetchSaleOrderById as fetchSaleOrderByIdApi,
} from './sale-order-api';
export {
  fetchSaleOrderLine as fetchSaleOrderLineApi,
  fetchSaleOrderLineById as fetchSaleOrderLineByIdApi,
} from './sale-order-line-api';
