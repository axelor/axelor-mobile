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

export {searchAlternativeBarcode as searchAlternativeBarcodeApi} from './alternative-barcode-api';
export {
  addProductToActiveCart as addProductToActiveCartApi,
  emptyCart as emptyCartApi,
  searchCart as searchCartApi,
  updateCart as updateCartApi,
  validateCart as validateCartApi,
} from './cart-api';
export {
  addCartLine as addCartLineApi,
  deleteCartLine as deleteCartLineApi,
  fetchCartLineById as fetchCartLineByIdApi,
  searchCartLine as searchCartLineApi,
  updateCartLine as updateCartLineApi,
} from './cart-line-api';
export {fetchComplementaryProduct as fetchComplementaryProductApi} from './complementary-product-api';
export {
  fetchCustomerById as fetchCustomerByIdApi,
  searchCustomer as searchCustomerApi,
  searchCustomerCategory as searchCustomerCategoryApi,
} from './customer-api';
export {fetchCustomerDelivery as fetchCustomerDeliveryApi} from './customer-delivery-api';
export {searchDeliveryPartnerLinks as searchDeliveryPartnerLinksApi} from './partner-link-api';
export {fetchPriceListLine as fetchPriceListLineApi} from './price-list-line-api';
export {
  fetchMatchingProduct as fetchMatchingProductApi,
  fetchProductById as fetchProductByIdApi,
  fetchProductCompanyConfig as fetchProductCompanyConfigApi,
  fetchProductVariantConfig as fetchProductVariantConfigApi,
  fetchVariantAttributes as fetchVariantAttributesApi,
  fetchVariantProduct as fetchVariantProductApi,
  searchProduct as searchProductApi,
  searchProductCategory as searchProductCategoryApi,
} from './product-api';
export {fetchSaleConfig as fetchSaleConfigApi} from './sale-config-api';
export {
  createSaleOrder as createSaleOrderApi,
  fetchSaleOrder as fetchSaleOrderApi,
  fetchSaleOrderById as fetchSaleOrderByIdApi,
  updateSaleOrderStatus as updateSaleOrderStatusApi,
} from './sale-order-api';
export {
  fetchSaleOrderLine as fetchSaleOrderLineApi,
  fetchSaleOrderLineById as fetchSaleOrderLineByIdApi,
} from './sale-order-line-api';
