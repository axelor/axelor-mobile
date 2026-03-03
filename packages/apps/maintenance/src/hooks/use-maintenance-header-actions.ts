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

import {useEffect} from 'react';
import {
  headerActionsProvider,
  useNavigation,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';

export const useMaintenanceHeaders = () => {
  useMaintenanceRequestListActions();
};

const useMaintenanceRequestListActions = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.maintenance.db.MaintenanceRequest',
  });

  useEffect(() => {
    headerActionsProvider.registerModel('maintenance_maintenanceRequest_list', {
      model: 'com.axelor.apps.maintenance.db.MaintenanceRequest',
      options: {
        core_modelFilters: {
          name: 'act:maintenance.root.current.maintenance.requests',
        },
      },
      actions: [
        {
          key: 'createMaintenanceRequest',
          title: I18n.t('Maintenance_CreateMaintenanceRequest'),
          order: 30,
          iconName: 'plus-lg',
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate,
          showInHeader: true,
          onPress: () => navigation.navigate('MaintenanceRequestFormScreen'),
        },
      ],
    });
  }, [Colors, I18n, canCreate, navigation]);
};
