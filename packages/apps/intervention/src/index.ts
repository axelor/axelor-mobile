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

import {Module} from '@axelor/aos-mobile-core';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import InterventionScreens from './screens/intervention';

export const InterventionModule: Module = {
  name: 'app-intervention',
  title: 'Intervention_Intervention',
  subtitle: 'Intervention_Intervention',
  icon: 'car-front-fill',
  compatibilityAOS: {
    moduleName: 'axelor-intervention',
    // downToVersion: '8.1.0',
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
    intervention_menu_dayInterventions: {
      title: 'Intervention_DayInterventions',
      icon: 'calendar-event',
      screen: 'DayInterventionsScreen',
    },
    intervention_menu_plannedInterventions: {
      title: 'Intervention_Planned',
      icon: 'calendar-week',
      screen: 'PlannedInterventionsScreen',
    },
    intervention_menu_interventionsHistory: {
      title: 'Intervention_History',
      icon: 'clock-history',
      screen: 'InterventionsHistoryScreen',
    },
  },
  screens: {
    ...InterventionScreens,
  },
};

export * from './components';
export * from './screens/intervention';
export * from './types';
