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

import {Module} from '@axelor/aos-mobile-core';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import InterventionScreens from './screens/intervention';
import EquipmentsScreens from './screens/equipment/';
import * as interventionReducers from './features';
import {
  intervention_formsRegister,
  intervention_modelAPI,
  intervention_searchFields,
  intervention_sortFields,
  intervention_typeObjects,
} from './models';
import {useInterventionHeaders} from './hooks/use-intervention-header-actions';

export const InterventionModule: Module = {
  name: 'app-intervention',
  title: 'Intervention_Intervention',
  subtitle: 'Intervention_Intervention',
  icon: 'tools',
  compatibilityAOS: {
    moduleName: 'axelor-intervention',
    downToVersion: '8.1.0',
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  menus: {
    intervention_menu_interventionSeparator: {
      title: 'Intervention_Interventions',
      separator: true,
    },
    intervention_menu_activeIntervention: {
      title: 'Intervention_ActiveIntervention',
      icon: 'calendar-check',
      screen: 'ActiveInterventionScreen',
    },
    intervention_menu_dayInterventions: {
      title: 'Intervention_DayInterventions',
      icon: 'calendar-event',
      screen: 'DayInterventionsScreen',
    },
    intervention_menu_plannedInterventions: {
      title: 'Intervention_PlannedInterventions',
      icon: 'calendar-week',
      screen: 'PlannedInterventionsScreen',
    },
    intervention_menu_interventionsHistory: {
      title: 'Intervention_InterventionsHistory',
      icon: 'clock-history',
      screen: 'InterventionsHistoryScreen',
    },
    intervention_separator_equipments: {
      title: 'Intervention_Equipments',
      separator: true,
    },
    intervention_menu_customerPark: {
      title: 'Intervention_CustomerPark',
      icon: 'wrench',
      screen: 'CustomerParkScreen',
    },
  },
  screens: {
    ...InterventionScreens,
    ...EquipmentsScreens,
  },
  reducers: {
    ...interventionReducers,
  },
  models: {
    objectFields: {...intervention_modelAPI},
    searchFields: {...intervention_searchFields},
    sortFields: {...intervention_sortFields},
    formsRegister: {...intervention_formsRegister},
    headerRegisters: useInterventionHeaders,
    typeObjects: intervention_typeObjects,
  },
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens/intervention';
export * from './types';
