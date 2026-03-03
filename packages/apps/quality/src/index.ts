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

import {getModelId, isModel, Module} from '@axelor/aos-mobile-core';
import ControlEntyScreens from './screens/ControlEntry';
import QualityImprovement from './screens/QualityImprovement';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import {
  quality_formsRegister,
  quality_modelAPI,
  quality_searchFields,
  quality_sortFields,
  quality_typeObjects,
} from './models';
import * as qualityReducers from './features';
import {useQualityHeaders} from './hooks/use-quality-header-actions';

export const QualityModule: Module = {
  name: 'app-quality',
  title: 'Quality_Quality',
  subtitle: 'Quality_Quality',
  icon: 'clipboard-check',
  compatibilityAOS: {
    moduleName: 'axelor-quality',
    downToVersion: '8.0.0',
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  menus: {
    quality_menu_controlEntrySeparator: {
      title: 'Quality_ControlEntries',
      separator: true,
    },
    quality_menu_controlEntry: {
      title: 'Quality_ControlEntries',
      icon: 'card-checklist',
      screen: 'ControlEntryListScreen',
    },
    quality_menu_qualityImprovementSeparator: {
      title: 'Quality_QualityImprovements',
      separator: true,
    },
    quality_menu_qualityImprovement: {
      title: 'Quality_QualityImprovements',
      icon: 'clipboard2-x',
      screen: 'QualityImprovementListScreen',
    },
  },
  screens: {
    ...ControlEntyScreens,
    ...QualityImprovement,
  },
  reducers: {...qualityReducers},
  models: {
    objectFields: {...quality_modelAPI},
    sortFields: {...quality_sortFields},
    searchFields: {...quality_searchFields},
    formsRegister: {...quality_formsRegister},
    headerRegisters: useQualityHeaders,
    typeObjects: quality_typeObjects,
  },
  globalTools: [
    {
      key: 'quality_accessQICreation',
      iconName: 'clipboard2-x',
      onPress: ({navigation, screenContext}) =>
        navigation.navigate('QualityImprovementFormScreen', {
          stockMoveId: getModelId(
            screenContext,
            'com.axelor.apps.stock.db.StockMove',
          ),
          stockMoveLineId: getModelId(
            screenContext,
            'com.axelor.apps.stock.db.StockMoveLine',
          ),
          manufOrderId: getModelId(
            screenContext,
            'com.axelor.apps.production.db.ManufOrder',
          ),
          operationOrderId: getModelId(
            screenContext,
            'com.axelor.apps.production.db.OperationOrder',
          ),
        }),
      title: 'Quality_DeclareNonConformity',
      hideIf: ({screenContext}) =>
        !isModel(screenContext, 'com.axelor.apps.stock.db.StockMove') &&
        !isModel(screenContext, 'com.axelor.apps.stock.db.StockMoveLine') &&
        !isModel(screenContext, 'com.axelor.apps.production.db.ManufOrder') &&
        !isModel(screenContext, 'com.axelor.apps.production.db.OperationOrder'),
    },
  ],
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens/ControlEntry';
export * from './screens/QualityImprovement';
export * from './types';
