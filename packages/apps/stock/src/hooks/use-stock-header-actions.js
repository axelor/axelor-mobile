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

import {useEffect} from 'react';
import {
  headerActionsProvider,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {StockMove} from '../types';

export const useStockHeaders = () => {
  useCustomerDeliveryDetailsActions();
  useCustomerDeliveryLineDetailsActions();
  useCustomerDeliveryLineListActions();
  useInternalMoveDetailsActions();
  useInternalMoveLineDetailsActions();
  useInternalMoveListActions();
  useInventoryPlannedDetailsActions();
  useInventoryStartedDetailsActions();
  useInventoryLineDetailsActions();
  useProductDetailsActions();
  useProductStockDetailsActions();
  useStockCorrectionListActions();
  useStockCorrectionDetailsActions();
  useSupplierArrivalDetailsActions();
  useSupplierArrivalLineDetailsActions();
  useSupplierArrivalLineListActions();
};

const useCustomerDeliveryDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {customerDelivery} = useSelector(state => state.customerDelivery);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_customerDelivery_details', {
      model: 'com.axelor.apps.stock.db.StockMove',
      modelId: customerDelivery?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
    });
  }, [mobileSettings, customerDelivery]);
};

const useCustomerDeliveryLineListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

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
            !mobileSettings?.isCustomerDeliveryLineAdditionEnabled ||
            customerDelivery?.statusSelect >= StockMove.status.Realized,
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
    Colors.primaryColor.background,
    navigation,
  ]);
};

const useCustomerDeliveryLineDetailsActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {productFromId: product} = useSelector(state => state.product);
  const {customerDeliveryLine} = useSelector(
    state => state.customerDeliveryLine,
  );

  useEffect(() => {
    headerActionsProvider.registerModel('stock_customerDelivery_lineDetails', {
      model: 'com.axelor.apps.stock.db.StockMoveLine',
      modelId: customerDeliveryLine?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: product.name,
    });
  }, [
    Colors,
    I18n,
    customerDeliveryLine?.id,
    mobileSettings?.isTrackerMessageEnabled,
    navigation,
    product.name,
  ]);
};

const useInternalMoveDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {internalMove} = useSelector(state => state.internalMove);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_internalMove_details', {
      model: 'com.axelor.apps.stock.db.StockMove',
      modelId: internalMove?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
    });
  }, [mobileSettings, internalMove]);
};

const useInternalMoveListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  useEffect(() => {
    headerActionsProvider.registerModel('stock_internalMove_list', {
      actions: [
        {
          key: 'newInternalMove',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Stock_NewInternalMove'),
          iconColor: Colors.primaryColor.background,
          onPress: () => navigation.navigate('InternalMoveCreationScreen'),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, navigation]);
};

const useInternalMoveLineDetailsActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {productFromId: product} = useSelector(state => state.product);
  const {internalMoveLine} = useSelector(state => state.internalMoveLine);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_internalMove_lineDetails', {
      model: 'com.axelor.apps.stock.db.StockMoveLine',
      modelId: internalMoveLine?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: product.name,
    });
  }, [
    Colors,
    I18n,
    internalMoveLine?.id,
    mobileSettings?.isTrackerMessageEnabled,
    navigation,
    product.name,
  ]);
};

const useInventoryPlannedDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {inventory} = useSelector(state => state.inventory);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_inventory_plannedDetails', {
      model: 'com.axelor.apps.stock.db.Inventory',
      modelId: inventory?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
    });
  }, [mobileSettings, inventory]);
};

const useInventoryStartedDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {inventory} = useSelector(state => state.inventory);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_inventory_startedDetails', {
      model: 'com.axelor.apps.stock.db.Inventory',
      modelId: inventory?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
    });
  }, [mobileSettings, inventory]);
};

const useInventoryLineDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {inventoryLine} = useSelector(state => state.inventoryLine);
  const {productFromId} = useSelector(state => state.product);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_inventory_lineDetails', {
      model: 'com.axelor.apps.stock.db.InventoryLine',
      modelId: inventoryLine?.id,
      attachedFileScreenTitle: productFromId?.name,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
    });
  }, [mobileSettings, inventoryLine, productFromId]);
};

const useProductDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {productFromId: product} = useSelector(state => state.product);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_product_details', {
      model: 'com.axelor.apps.base.db.Product',
      modelId: product?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: product.name,
    });
  }, [mobileSettings, product]);
};

const useProductStockDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {productFromId: product} = useSelector(state => state.product);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_product_stockDetails', {
      model: 'com.axelor.apps.base.db.Product',
      modelId: product?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: product.name,
    });
  }, [mobileSettings, product]);
};

const useStockCorrectionListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  useEffect(() => {
    headerActionsProvider.registerModel('stock_stockCorrection_list', {
      actions: [
        {
          key: 'newStockCorrection',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Stock_NewStockCorrection'),
          iconColor: Colors.primaryColor.background,
          onPress: () =>
            navigation.navigate('StockCorrectionCreationScreen', {}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, navigation]);
};

const useStockCorrectionDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {stockCorrection} = useSelector(state => state.stockCorrection);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_stockCorrection_details', {
      model: 'com.axelor.apps.stock.db.StockCorrection',
      modelId: stockCorrection?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
    });
  }, [mobileSettings, stockCorrection]);
};

const useSupplierArrivalDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {supplierArrival} = useSelector(state => state.supplierArrival);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_supplierArrival_details', {
      model: 'com.axelor.apps.stock.db.StockMove',
      modelId: supplierArrival?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
    });
  }, [mobileSettings, supplierArrival]);
};

const useSupplierArrivalLineListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

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
            !mobileSettings?.isSupplierArrivalLineAdditionEnabled ||
            supplierArrival?.statusSelect >= StockMove.status.Realized,
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
    Colors.primaryColor.background,
    navigation,
    supplierArrival,
  ]);
};

const useSupplierArrivalLineDetailsActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {productFromId: product} = useSelector(state => state.product);
  const {supplierArrivalLine} = useSelector(state => state.supplierArrivalLine);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_supplierArrival_lineDetails', {
      model: 'com.axelor.apps.stock.db.StockMoveLine',
      modelId: supplierArrivalLine?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: product.name,
    });
  }, [
    Colors,
    I18n,
    supplierArrivalLine?.id,
    mobileSettings?.isTrackerMessageEnabled,
    navigation,
    product.name,
  ]);
};
