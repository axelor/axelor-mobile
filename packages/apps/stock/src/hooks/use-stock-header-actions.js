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

import {useEffect} from 'react';
import {
  headerActionsProvider,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';

export const useStockHeaders = () => {
  useCustomerDeliveryListActions();
  useCustomerDeliveryDetailsActions();
  useCustomerDeliveryLineDetailsActions();
  useCustomerDeliveryLineListActions();
  useInternalMoveDetailsActions();
  useInternalMoveLineDetailsActions();
  useInternalMoveListActions();
  useInventoryListActions();
  useInventoryPlannedDetailsActions();
  useInventoryStartedDetailsActions();
  useInventoryLineDetailsActions();
  useLogisticalFormListActions();
  useProductListActions();
  useProductDetailsActions();
  useProductStockDetailsActions();
  useStockCorrectionListActions();
  useStockCorrectionDetailsActions();
  useSupplierArrivalListActions();
  useSupplierArrivalDetailsActions();
  useSupplierArrivalLineDetailsActions();
  useSupplierArrivalLineListActions();
};

const useCustomerDeliveryListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('stock_customerDelivery_list', {
      model: 'com.axelor.apps.stock.db.StockMove',
      options: {
        core_modelFilters: {name: 'customer-deliveries-filters'},
      },
    });
  }, []);
};

const useCustomerDeliveryDetailsActions = () => {
  const {customerDelivery} = useSelector(state => state.customerDelivery);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_customerDelivery_details', {
      model: 'com.axelor.apps.stock.db.StockMove',
      modelId: customerDelivery?.id,
    });
  }, [customerDelivery]);
};

const useCustomerDeliveryLineListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {customerDelivery} = useSelector(state => state.customerDelivery);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_customerDelivery_lineList', {
      actions: [
        {
          key: 'newCustomerDeliveryLine',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Stock_AddLine'),
          iconColor: Colors.primaryColor.background,
          hideIf:
            !canCreate ||
            !mobileSettings?.isCustomerDeliveryLineAdditionEnabled ||
            customerDelivery?.statusSelect >= StockMove?.statusSelect.Realized,
          onPress: () =>
            navigation.navigate('CustomerDeliveryLineCreationScreen', {
              customerDelivery: customerDelivery,
            }),
          showInHeader: true,
        },
      ],
    });
  }, [
    mobileSettings,
    customerDelivery,
    I18n,
    Colors,
    navigation,
    canCreate,
    StockMove?.statusSelect.Realized,
  ]);
};

const useCustomerDeliveryLineDetailsActions = () => {
  const {productFromId: product} = useSelector(state => state.product);
  const {customerDeliveryLine} = useSelector(
    state => state.customerDeliveryLine,
  );

  useEffect(() => {
    headerActionsProvider.registerModel('stock_customerDelivery_lineDetails', {
      model: 'com.axelor.apps.stock.db.StockMoveLine',
      modelId: customerDeliveryLine?.id,
    });
  }, [customerDeliveryLine?.id, product?.name]);
};

const useInternalMoveDetailsActions = () => {
  const {internalMove} = useSelector(state => state.internalMove);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_internalMove_details', {
      model: 'com.axelor.apps.stock.db.StockMove',
      modelId: internalMove?.id,
    });
  }, [internalMove]);
};

const useInternalMoveListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMove',
  });

  useEffect(() => {
    headerActionsProvider.registerModel('stock_internalMove_list', {
      model: 'com.axelor.apps.stock.db.StockMove',
      options: {
        core_modelFilters: {name: 'internal-stock-move-filters'},
      },
      actions: [
        {
          key: 'newInternalMove',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Stock_NewInternalMove'),
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate,
          onPress: () => navigation.navigate('InternalMoveCreationScreen'),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, canCreate, navigation]);
};

const useInternalMoveLineDetailsActions = () => {
  const {productFromId: product} = useSelector(state => state.product);
  const {internalMoveLine} = useSelector(state => state.internalMoveLine);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_internalMove_lineDetails', {
      model: 'com.axelor.apps.stock.db.StockMoveLine',
      modelId: internalMoveLine?.id,
    });
  }, [internalMoveLine?.id, product?.name]);
};

const useInventoryListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('stock_inventory_list', {
      model: 'com.axelor.apps.stock.db.Inventory',
    });
  }, []);
};

const useInventoryPlannedDetailsActions = () => {
  const {inventory} = useSelector(state => state.inventory);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_inventory_plannedDetails', {
      model: 'com.axelor.apps.stock.db.Inventory',
      modelId: inventory?.id,
    });
  }, [inventory]);
};

const useInventoryStartedDetailsActions = () => {
  const {inventory} = useSelector(state => state.inventory);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_inventory_startedDetails', {
      model: 'com.axelor.apps.stock.db.Inventory',
      modelId: inventory?.id,
    });
  }, [inventory]);
};

const useInventoryLineDetailsActions = () => {
  const {productFromId: product} = useSelector(state => state.product);
  const {inventoryLine} = useSelector(state => state.inventoryLine);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_inventory_lineDetails', {
      model: 'com.axelor.apps.stock.db.InventoryLine',
      modelId: inventoryLine?.id,
    });
  }, [inventoryLine?.id, product?.name]);
};

const useProductListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('stock_product_list', {
      model: 'com.axelor.apps.base.db.Product',
    });
  }, []);
};

const useProductDetailsActions = () => {
  const {productFromId: product} = useSelector(state => state.product);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_product_details', {
      model: 'com.axelor.apps.base.db.Product',
      modelId: product?.id,
    });
  }, [product]);
};

const useProductStockDetailsActions = () => {
  const {productFromId: product} = useSelector(state => state.product);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_product_stockDetails', {
      model: 'com.axelor.apps.base.db.Product',
      modelId: product?.id,
    });
  }, [product]);
};

const useStockCorrectionListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockCorrection',
  });

  useEffect(() => {
    headerActionsProvider.registerModel('stock_stockCorrection_list', {
      model: 'com.axelor.apps.stock.db.StockCorrection',
      options: {
        core_modelFilters: {name: 'act:stock.root.stock.correction'},
      },
      actions: [
        {
          key: 'newStockCorrection',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Stock_NewStockCorrection'),
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate,
          onPress: () =>
            navigation.navigate('StockCorrectionCreationScreen', {}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, canCreate, navigation]);
};

const useStockCorrectionDetailsActions = () => {
  const {stockCorrection} = useSelector(state => state.stockCorrection);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_stockCorrection_details', {
      model: 'com.axelor.apps.stock.db.StockCorrection',
      modelId: stockCorrection?.id,
    });
  }, [stockCorrection]);
};

const useLogisticalFormListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('stock_logisticalForm_list', {
      model: 'com.axelor.apps.stock.db.LogisticalForm',
      options: {
        core_modelFilters: {name: 'logistical-form-filters'},
      },
    });
  }, []);
};

const useSupplierArrivalDetailsActions = () => {
  const {supplierArrival} = useSelector(state => state.supplierArrival);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_supplierArrival_details', {
      model: 'com.axelor.apps.stock.db.StockMove',
      modelId: supplierArrival?.id,
    });
  }, [supplierArrival]);
};

const useSupplierArrivalListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('stock_supplierArrival_list', {
      model: 'com.axelor.apps.stock.db.StockMoveLine',
      options: {
        core_modelFilters: {name: 'supplier-arrivals-filters'},
      },
    });
  }, []);
};

const useSupplierArrivalLineListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const {StockMove} = useTypes();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {supplierArrival} = useSelector(state => state.supplierArrival);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_supplierArrival_lineList', {
      actions: [
        {
          key: 'newSupplierArrivalLine',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Stock_AddLine'),
          iconColor: Colors.primaryColor.background,
          hideIf:
            !canCreate ||
            !mobileSettings?.isSupplierArrivalLineAdditionEnabled ||
            supplierArrival?.statusSelect >= StockMove?.statusSelect.Realized,
          onPress: () =>
            navigation.navigate('SupplierArrivalLineCreationScreen', {
              supplierArrival: supplierArrival,
            }),
          showInHeader: true,
        },
      ],
    });
  }, [
    mobileSettings,
    I18n,
    Colors,
    navigation,
    supplierArrival,
    canCreate,
    StockMove?.statusSelect.Realized,
  ]);
};

const useSupplierArrivalLineDetailsActions = () => {
  const {productFromId: product} = useSelector(state => state.product);
  const {supplierArrivalLine} = useSelector(state => state.supplierArrivalLine);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_supplierArrival_lineDetails', {
      model: 'com.axelor.apps.stock.db.StockMoveLine',
      modelId: supplierArrivalLine?.id,
    });
  }, [supplierArrivalLine?.id, product?.name]);
};
