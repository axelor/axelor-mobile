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
  addCartLine,
  deleteCartLine,
  fetchCartLineById,
  searchCartLine,
  updateCartLine,
} from './cartLineSlice';
export {
  addProductToActiveCart,
  emptyCart,
  fetchActiveCart,
  updateCart,
  validateCart,
} from './cartSlice';
export {fetchComplementaryProduct} from './complementaryProductSlice';
export {fetchCustomerDelivery} from './customerDeliverySlice';
export {
  fetchCustomerById,
  searchCustomer,
  searchCustomerCategory,
} from './customerSlice';
export {fetchPriceListLine} from './priceListLineSlice';
export {
  fetchMatchingProduct,
  fetchProductById,
  fetchProductCompanyConfig,
  fetchProductVariantConfig,
  fetchVariantProduct,
  searchProduct,
  searchProductCategory,
} from './productSlice';
export {fetchSaleConfig} from './saleConfigSlice';
export {fetchSaleOrderLine, fetchSaleOrderLineById} from './saleOrderLineSlice';
export {
  createSaleOrder,
  fetchSaleOrder,
  fetchSaleOrderById,
  updateSaleOrderStatus,
} from './saleOrderSlice';
