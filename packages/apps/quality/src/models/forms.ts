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

import {FormConfigs} from '@axelor/aos-mobile-core';
import {
  GravityPicker,
  QIDetectionSearchBar,
  QIMethodAnalysisSearchBar,
  TypePicker,
} from '../components';
import {
  updateGravityForm,
  updateTypeForm,
} from '../features/qualityImprovementSlice';

export const quality_formsRegister: FormConfigs = {
  quality_qualityImprovement: {
    modelName: 'com.axelor.apps.quality.db.QualityImprovement',
    fields: {
      gravityTypeSelect: {
        titleKey: 'Quality_Gravity',
        widget: 'custom',
        type: 'number',
        required: true,
        customComponent: GravityPicker,
      },
      type: {
        titleKey: 'Quality_Type',
        widget: 'custom',
        type: 'number',
        required: true,
        customComponent: TypePicker,
      },
      qiDetection: {
        titleKey: 'Quality_QIDetection',
        type: 'object',
        widget: 'custom',
        customComponent: QIDetectionSearchBar,
        dependsOn: {
          type: ({newValue, dispatch}) => {
            dispatch(updateTypeForm(newValue));
          },
        },
      },
      analysisMethod: {
        titleKey: 'Quality_QIMethodAnalysis',
        type: 'object',
        widget: 'custom',
        customComponent: QIMethodAnalysisSearchBar,
        dependsOn: {
          type: ({newValue, dispatch}) => {
            dispatch(updateTypeForm(newValue));
          },
          gravityTypeSelect: ({newValue, dispatch}) => {
            dispatch(updateGravityForm(newValue));
          },
        },
      },
    },
  },
};
