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
import {headerActionsProvider, useSelector} from '@axelor/aos-mobile-core';

const useEquipmentFormActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {equipment} = useSelector((state: any) => state.intervention_equipment);

  useEffect(() => {
    headerActionsProvider.registerModel('intervention_equipment_form', {
      model: 'com.axelor.apps.intervention.db.Equipment',
      modelId: equipment?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: equipment?.name,
    });
  }, [mobileSettings, equipment]);
};

export const useInterventionHeaders = () => {
  useEquipmentFormActions();
};
