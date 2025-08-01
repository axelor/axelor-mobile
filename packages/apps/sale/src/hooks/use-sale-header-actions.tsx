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

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  ActionType,
  headerActionsProvider,
  useModules,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {DoubleIcon, useThemeColor} from '@axelor/aos-mobile-ui';

export const useSaleHeaders = () => {
  useProductListActions();
  useSaleOrderDetailsActions();
  useSaleOrderLineDetailsActions();
  useProductDetailsActions();
  useClientListActions();
  useClientDetailsActions();
  useCRMOverrideActions();
  useCartLineDetailsActions();
  useSaleQuotationsActions();
  useSaleOrdersActions();
};

const useProductListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('sale_product_list', {
      model: 'com.axelor.apps.base.db.Product',
    });
  }, []);
};

const useSaleOrderDetailsActions = () => {
  const I18n = useTranslator();
  const {SaleOrder} = useTypes();

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
  }, [saleOrder?.id, title]);
};

const useSaleOrderLineDetailsActions = () => {
  const I18n = useTranslator();
  const {SaleOrder} = useTypes();

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
  }, [saleOrderLine?.id, title]);
};

const useProductDetailsActions = () => {
  const {product} = useSelector((state: any) => state.sale_product);

  useEffect(() => {
    headerActionsProvider.registerModel('sale_product_details', {
      model: 'com.axelor.apps.base.db.Product',
      modelId: product?.id,
    });
  }, [product?.id]);
};

const useClientListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('sale_client_list', {
      model: 'com.axelor.apps.base.db.Partner',
      options: {
        core_modelFilters: {name: 'partner-filters'},
      },
    });
  }, []);
};

const useCreateSaleOrderHeaderActionGetter = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.sale.db.SaleOrder',
  });

  const getCreationHeaderAction = useCallback(
    (clientPartner: any, options?: Partial<ActionType>) => {
      return {
        key: 'client-createSaleOrder',
        order: 10,
        iconName: 'plus-lg',
        title: I18n.t('Sale_NewSaleQuotation'),
        iconColor: Colors.primaryColor.background,
        onPress: () =>
          navigation.navigate('SaleQuotationCreationScreen', {
            clientPartner,
          }),
        showInHeader: true,
        ...(options ?? {}),
        hideIf: !canCreate || (options?.hideIf ?? false),
        customComponent: (
          <DoubleIcon
            topIconConfig={{
              name: 'plus-lg',
              color: Colors.primaryColor.background,
              size: 16,
            }}
            bottomIconConfig={{
              name: 'file-earmark-text',
              color: Colors.secondaryColor_dark.background,
            }}
            predefinedPosition="top-right"
            topIconPosition={{top: -9}}
          />
        ),
      };
    },
    [Colors, I18n, canCreate, navigation],
  );

  return useMemo(() => ({getCreationHeaderAction}), [getCreationHeaderAction]);
};

const useClientDetailsActions = () => {
  const {getCreationHeaderAction} = useCreateSaleOrderHeaderActionGetter();
  const {customer} = useSelector(state => state.sale_customer);
  const I18n = useTranslator();
  const {canCreate} = usePermitted({modelName: 'com.axelor.apps.crm.db.Event'});
  const navigation = useNavigation();

  useEffect(() => {
    headerActionsProvider.registerModel('sale_client_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: customer?.id,
      actions: [
        getCreationHeaderAction(customer),
        {
          key: 'client-openEventForm',
          order: 10,
          iconName: 'calendar-plus-fill',
          title: I18n.t('Crm_CreateEvent'),
          hideIf: !canCreate,
          onPress: () =>
            navigation.navigate('EventFormScreen', {client: customer}),
          showInHeader: true,
        },
      ],
    });
  }, [I18n, canCreate, customer, getCreationHeaderAction, navigation]);
};

const useCRMOverrideActions = () => {
  const {checkModule} = useModules();
  const {getCreationHeaderAction} = useCreateSaleOrderHeaderActionGetter();

  const {prospect} = useSelector(state => state.prospect);
  const {client} = useSelector(state => state.client);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_prospect_details', {
      actions: [
        getCreationHeaderAction(prospect, {hideIf: !checkModule('app-sale')}),
      ],
    });
  }, [checkModule, getCreationHeaderAction, prospect]);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_client_details', {
      actions: [
        getCreationHeaderAction(client, {hideIf: !checkModule('app-sale')}),
      ],
    });
  }, [checkModule, client, getCreationHeaderAction]);
};

const useCartLineDetailsActions = () => {
  const {cartLine} = useSelector((state: any) => state.sale_cartLine);

  useEffect(() => {
    headerActionsProvider.registerModel('sale_cartLine_details', {
      model: 'com.axelor.apps.sale.db.CartLine',
      modelId: cartLine?.id,
    });
  }, [cartLine?.id]);
};

const useSaleOrdersActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('sale_saleOrder_list', {
      model: 'com.axelor.apps.sale.db.SaleOrder',
      options: {
        core_modelFilters: {name: 'sale-order-filters'},
      },
    });
  }, []);
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
      model: 'com.axelor.apps.sale.db.SaleOrder',
      options: {
        core_modelFilters: {name: 'sale-order-filters'},
      },
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
