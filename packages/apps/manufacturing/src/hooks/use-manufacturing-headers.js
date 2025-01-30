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
        disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
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
        disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
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
