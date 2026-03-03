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

import React, {useCallback, useMemo} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {
  FormView,
  useIsNavigationRoot,
  useNavigation,
  useTypes,
} from '@axelor/aos-mobile-core';
import {createMaintenanceRequest} from '../features/maintenanceRequestSlice';

const MaintenanceRequestFormScreen = ({route}) => {
  const {machineId} = route?.params ?? {};
  const {MaintenanceRequest} = useTypes();
  const navigation = useNavigation();
  const isRoot = useIsNavigationRoot();

  const defaultValue = useMemo(
    () => ({
      actionSelect: MaintenanceRequest?.actionSelect.Corrective,
      machineId,
    }),
    [MaintenanceRequest?.actionSelect.Corrective, machineId],
  );

  const handleRequestCreation = useCallback(
    ({objectState, dispatch, handleReset}: any) => {
      dispatch(
        (createMaintenanceRequest as any)({
          ...objectState,
          equipementMaintenanceId: objectState.equipementMaintenance?.id,
        }),
      );

      handleReset();

      if (!isRoot) {
        navigation.pop();
      }
    },
    [isRoot, navigation],
  );

  return (
    <Screen>
      <FormView
        formKey="maintenance_maintenanceRequest"
        creationDefaultValue={defaultValue}
        defaultEditMode
        actions={[
          {
            key: 'create-maintenance-request',
            type: 'create',
            needValidation: true,
            needRequiredFields: true,
            customAction: handleRequestCreation,
          },
        ]}
      />
    </Screen>
  );
};

export default MaintenanceRequestFormScreen;
