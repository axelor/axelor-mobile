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

import {ModuleSelections} from '@axelor/aos-mobile-core';

export const intervention_typeObjects: ModuleSelections = [
  {
    modelName: 'com.axelor.apps.intervention.db.Equipment',
    fields: {
      serviceSelect: {
        content: [
          {
            key: 'InService',
            value: true,
            title: 'Intervention_EquipmentStatus_InService',
            color: 'successColor',
          },
          {
            key: 'NotInService',
            value: false,
            title: 'Intervention_EquipmentStatus_NotInService',
            color: 'cautionColor',
          },
        ],
      },
      typeSelect: {
        content: [
          {
            key: 'Equipment',
            value: 'equipment',
            title: 'Intervention_EquipmentType_Equipment',
          },
          {
            key: 'Place',
            value: 'place',
            title: 'Intervention_EquipmentType_Place',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.intervention.db.Intervention',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Planned',
            value: 20,
            title: 'Intervention_Status_Planned',
            color: 'plannedColor',
          },
          {
            key: 'Started',
            value: 30,
            title: 'Intervention_Status_Started',
            color: 'progressColor',
          },
          {
            key: 'Suspended',
            value: 40,
            title: 'Intervention_Status_Suspended',
            color: 'cautionColor',
          },
          {
            key: 'Finished',
            value: 50,
            title: 'Intervention_Status_Finished',
            color: 'successColor',
          },
        ],
      },
    },
  },
  {
    modelName: 'com.axelor.apps.intervention.db.InterventionQuestion',
    fields: {
      statusSelect: {
        content: [
          {
            key: 'Answered',
            value: 1,
            title: null,
            color: 'successColor',
          },
          {
            key: 'Required',
            value: 2,
            title: 'Intervention_QuestionRequired',
            color: 'importantColor',
          },
          {
            key: 'Info',
            value: 3,
            title: null,
            color: 'infoColor',
          },
          {
            key: 'Conditional',
            value: 4,
            title: 'Intervention_QuestionConditional',
            color: 'plannedColor',
          },
          {
            key: 'Default',
            value: 5,
            title: null,
            color: 'secondaryColor',
          },
          {
            key: 'Hidden',
            value: 6,
            title: null,
          },
        ],
      },
      answerTypeSelect: {
        content: [
          {
            key: 'AdvancedMonitoring',
            value: 'advancedMonitoring',
            title: null,
          },
          {
            key: 'CheckBox',
            value: 'checkbox',
            title: null,
          },
          {
            key: 'Date',
            value: 'date',
            title: null,
          },
          {
            key: 'Indication',
            value: 'indication',
            title: null,
          },
          {
            key: 'Measure',
            value: 'measure',
            title: null,
          },
          {
            key: 'Picture',
            value: 'picture',
            title: null,
          },
          {
            key: 'Signature',
            value: 'signature',
            title: null,
          },
          {
            key: 'Text',
            value: 'text',
            title: null,
          },
          {
            key: 'ValueList',
            value: 'list',
            title: null,
          },
        ],
      },
      advancedMonitoringAnswer: {
        content: [
          {
            key: 'Home',
            value: 'home',
            title: 'Intervention_AdvancedMonitoringAnswerHome',
          },
          {
            key: 'Office',
            value: 'office',
            title: 'Intervention_AdvancedMonitoringAnswerOffice',
          },
          {
            key: 'PreviousIntervention',
            value: 'previous',
            title: 'Intervention_AdvancedMonitoringAnswerPreviousIntervention',
          },
          {
            key: 'NextIntervention',
            value: 'next',
            title: 'Intervention_AdvancedMonitoringAnswerNextIntervention',
          },
        ],
      },
    },
  },
];
