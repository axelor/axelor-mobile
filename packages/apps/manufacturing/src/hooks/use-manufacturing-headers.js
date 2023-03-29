import {useEffect} from 'react';
import {
  headerActionsProvider,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';

export const useManufacturingHeaders = () => {
  useManufacturingOrderActions();
  useProducedProductActions();
  useOperationOrderDetailsActions();
};

const useManufacturingOrderActions = () => {
  const {mobileSettings} = useSelector(state => state.config);
  const {manufOrder} = useSelector(state => state.manufacturingOrder);

  useEffect(() => {
    headerActionsProvider.registerModel(
      'manufacturing_manufacturingOrder_details',
      {
        model: 'com.axelor.apps.production.db.ManufOrder',
        modelId: manufOrder?.id,
        disableMailMessages: !mobileSettings?.isTrackerMessageOnProductionApp,
      },
    );
  }, [mobileSettings, manufOrder]);
};

const useProducedProductActions = () => {
  const navigation = useNavigation();
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {manufOrder} = useSelector(state => state.manufacturingOrder);

  useEffect(() => {
    headerActionsProvider.registerModel('manufacturing_producedProduct_list', {
      actions: [
        {
          key: 'wasteProduct',
          order: 10,
          title: I18n.t('Manufacturing_WasteDeclaration'),
          iconName: 'trash',
          iconColor: Colors.primaryColor.background,
          onPress: () =>
            navigation.navigate('WasteProductListScreen', {
              manufOrder: manufOrder,
            }),
          showInHeader: true,
        },
      ],
    });
  }, [I18n, navigation, manufOrder, Colors]);
};

const useOperationOrderDetailsActions = () => {
  const navigation = useNavigation();
  const I18n = useTranslator();

  const {mobileSettings} = useSelector(state => state.config);
  const {operationOrder} = useSelector(state => state.operationOrder);

  useEffect(() => {
    headerActionsProvider.registerModel(
      'manufacturing_operationOrder_details',
      {
        model: 'com.axelor.apps.production.db.OperationOrder',
        modelId: operationOrder?.id,
        disableMailMessages: !mobileSettings?.isTrackerMessageOnProductionApp,
        actions: [
          {
            key: 'productionFile',
            order: 10,
            iconName: 'folder-open',
            title: I18n.t('Manufacturing_ProductionFile'),
            onPress: () =>
              navigation.navigate('ProductionFileScreen', {
                prodProcessLineId: operationOrder?.prodProcessLine?.id,
              }),
          },
        ],
      },
    );
  }, [I18n, mobileSettings, navigation, operationOrder]);
};
