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

import {useEffect, useMemo} from 'react';
import {
  headerActionsProvider,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';

export const useSaleHeaders = () => {
  useSaleOrderDetailsActions();
  useSaleOrderLineDetailsActions();
  useProductDetailsActions();
  useClientDetailsActions();
  useCartLineDetailsActions();
  useSaleQuotationsActions();
};

const useSaleOrderDetailsActions = () => {
  const I18n = useTranslator();
  const {SaleOrder} = useTypes();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {saleOrder} = useSelector((state: any) => state.sale_saleOrder);

  const title = useMemo(
    () =>
      saleOrder?.statusSelect > SaleOrder?.statusSelect.Finalized
        ? I18n.t('Sale_SaleOrder')
        : I18n.t('Sale_SaleQuotation'),
    [I18n, saleOrder, SaleOrder?.statusSelect.Finalized],
  );

  useEffect(() => {
    headerActionsProvider.registerModel('sale_saleOrder_details', {
      model: 'com.axelor.apps.sale.db.SaleOrder',
      modelId: saleOrder?.id,
      headerTitle: title,
    });
  }, [mobileSettings, saleOrder?.id, title]);
};

const useSaleOrderLineDetailsActions = () => {
  const I18n = useTranslator();
  const {SaleOrder} = useTypes();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {saleOrder} = useSelector((state: any) => state.sale_saleOrder);
  const {saleOrderLine} = useSelector((state: any) => state.sale_saleOrderLine);

  const title = useMemo(
    () =>
      saleOrder?.statusSelect > SaleOrder?.statusSelect.Finalized
        ? I18n.t('Sale_SaleOrder')
        : I18n.t('Sale_SaleQuotation'),
    [I18n, saleOrder, SaleOrder?.statusSelect.Finalized],
  );

  useEffect(() => {
    headerActionsProvider.registerModel('sale_saleOrderLine_details', {
      model: 'com.axelor.apps.sale.db.SaleOrderLine',
      modelId: saleOrderLine?.id,
      headerTitle: title,
    });
  }, [mobileSettings, saleOrderLine?.id, title]);
};

const useProductDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {product} = useSelector((state: any) => state.sale_product);

  useEffect(() => {
    headerActionsProvider.registerModel('sale_product_details', {
      model: 'com.axelor.apps.base.db.Product',
      modelId: product?.id,
    });
  }, [mobileSettings, product?.id]);
};

const useClientDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {customer} = useSelector((state: any) => state.sale_customer);

  useEffect(() => {
    headerActionsProvider.registerModel('sale_client_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: customer?.id,
    });
  }, [customer, mobileSettings]);
};

const useCartLineDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {cartLine} = useSelector((state: any) => state.sale_cartLine);

  useEffect(() => {
    headerActionsProvider.registerModel('sale_cartLine_details', {
      model: 'com.axelor.apps.sale.db.CartLine',
      modelId: cartLine?.id,
    });
  }, [cartLine?.id, mobileSettings]);
};

const useSaleQuotationsActions = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.sale.db.SaleOrder',
  });

  useEffect(() => {
    headerActionsProvider.registerModel('sale_saleQuotation_list', {
      actions: [
        {
          key: 'newSaleQuotation',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Sale_NewSaleQuotation'),
          iconColor: Colors.primaryColor.background,
          onPress: () => navigation.navigate('SaleQuotationCreationScreen'),
          showInHeader: true,
          hideIf: !canCreate,
        },
      ],
    });
  }, [Colors.primaryColor.background, I18n, canCreate, navigation]);
};
