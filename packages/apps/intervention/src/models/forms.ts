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

import {FormConfigs, customComponentOptions} from '@axelor/aos-mobile-core';
import {
  ClientProspectSearchBar,
  ContractSearchBar,
  EquipmentFamilySearchBar,
  InterventionNoteTypePicker,
  PlaceEquipmentSearchBar,
  QuestionAdvancedMonitoring,
  QuestionCheckbox,
  QuestionList,
  QuestionMeasure,
  TypePicker,
} from '../components';
import {Equipment, Question} from '../types';

const CustomerComponentWrapper = component => {
  return ({objectState, ...props}: customComponentOptions) =>
    component({...props, customerId: objectState.partner?.id});
};

export const intervention_formsRegister: FormConfigs = {
  intervention_equipment: {
    modelName: 'com.axelor.apps.intervention.db.Equipment',
    fields: {
      partner: {
        titleKey: 'Intervention_Customer',
        type: 'object',
        widget: 'custom',
        required: true,
        customComponent: ClientProspectSearchBar,
        options: {
          showTitle: true,
          readonly: true,
        },
      },
      parentEquipment: {
        titleKey: 'Intervention_ParentPlace',
        type: 'object',
        widget: 'custom',
        customComponent: CustomerComponentWrapper(PlaceEquipmentSearchBar),
        options: {
          showTitle: true,
        },
      },
      code: {
        titleKey: 'Intervention_Code',
        type: 'string',
        widget: 'default',
      },
      name: {
        titleKey: 'Intervention_Designation',
        type: 'string',
        widget: 'default',
        required: true,
      },
      typeSelect: {
        titleKey: 'Intervention_Type',
        type: 'string',
        widget: 'custom',
        customComponent: TypePicker,
        required: true,
      },
      inService: {
        titleKey: 'Intervention_EquipmentStatus_InService',
        type: 'boolean',
        widget: 'checkbox',
        hideIf: ({objectState}) =>
          objectState?.typeSelect === Equipment.type.place,
      },
      commissioningDate: {
        titleKey: 'Intervention_CommissioningDate',
        type: 'date',
        widget: 'date',
        hideIf: ({objectState}) =>
          objectState?.typeSelect === Equipment.type.place,
      },
      customerWarrantyOnPartEndDate: {
        titleKey: 'Intervention_CustomerWarrantyOnPartEndDate',
        type: 'date',
        widget: 'date',
        hideIf: ({objectState}) =>
          objectState?.typeSelect === Equipment.type.place,
      },
      equipmentFamily: {
        titleKey: 'Intervention_EquipmentFamily',
        type: 'object',
        widget: 'custom',
        requiredIf: ({objectState}) =>
          objectState?.typeSelect === Equipment.type.equipment,
        customComponent: EquipmentFamilySearchBar,
        hideIf: ({objectState}) =>
          objectState?.typeSelect === Equipment.type.place,
      },
      scheduleOfOperation: {
        titleKey: 'Intervention_ScheduleOfOperation',
        type: 'string',
        widget: 'default',
        hideIf: ({objectState}) =>
          objectState?.typeSelect === Equipment.type.place,
      },
      specificAccessSchedule: {
        titleKey: 'Intervention_SpecificAccessSchedule',
        type: 'string',
        widget: 'default',
        hideIf: ({objectState}) =>
          objectState?.typeSelect === Equipment.type.place,
      },
      contract: {
        titleKey: 'Intervention_Contract',
        type: 'object',
        widget: 'custom',
        customComponent: CustomerComponentWrapper(ContractSearchBar),
        hideIf: ({objectState}) =>
          objectState?.typeSelect === Equipment.type.place,
      },
      comments: {
        titleKey: 'Intervention_Comments',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
          style: {marginBottom: 100, width: '90%', alignSelf: 'center'},
        },
      },
    },
  },
  intervention_interventionNote: {
    modelName: 'com.axelor.apps.intervention.db.InterventionNote',
    fields: {
      type: {
        titleKey: 'Intervention_Type',
        type: 'object',
        widget: 'custom',
        required: true,
        customComponent: InterventionNoteTypePicker,
        options: {
          isScrollViewContainer: true,
        },
      },
      description: {
        titleKey: 'Intervention_Description',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
        },
        requiredIf: ({objectState}) =>
          objectState.type && objectState.type.attachedFile === false,
        hideIf: ({objectState}) =>
          !objectState.type || objectState.type.attachedFile === true,
      },
      metaFile: {
        titleKey: 'Intervention_MetaFile',
        type: 'object',
        widget: 'file',
        options: {
          displayPreview: true,
        },
        requiredIf: ({objectState}) =>
          objectState.type && objectState.type.attachedFile === true,
        hideIf: ({objectState}) =>
          !objectState.type || objectState.type.attachedFile === false,
      },
    },
  },
  intervention_interventionQuestion: {
    modelName: 'com.axelor.apps.intervention.db.InterventionQuestion',
    fields: {
      advancedMonitoringAnswer: {
        type: 'string',
        widget: 'custom',
        customComponent: QuestionAdvancedMonitoring,
        requiredIf: ({objectState}) =>
          objectState.answerTypeSelect ===
            Question.answerType.AdvancedMonitoring && objectState.isRequired,
        hideIf: ({objectState}) =>
          objectState.answerTypeSelect !==
          Question.answerType.AdvancedMonitoring,
      },
      checkboxAnswer: {
        type: 'boolean',
        widget: 'custom',
        customComponent: QuestionCheckbox,
        requiredIf: ({objectState}) =>
          objectState.answerTypeSelect === Question.answerType.CheckBox &&
          objectState.isRequired,
        hideIf: ({objectState}) =>
          objectState.answerTypeSelect !== Question.answerType.CheckBox,
      },
      dateAnswer: {
        type: 'date',
        widget: 'date',
        options: {
          popup: true,
        },
        requiredIf: ({objectState}) =>
          objectState.answerTypeSelect === Question.answerType.Date &&
          objectState.isRequired,
        hideIf: ({objectState}) =>
          objectState.answerTypeSelect !== Question.answerType.Date,
      },
      indicationText: {
        type: 'string',
        widget: 'default',
        readonly: true,
        hideIf: ({objectState}) =>
          objectState.answerTypeSelect !== Question.answerType.Indication,
      },
      measureAnswer: {
        type: 'number',
        widget: 'custom',
        customComponent: QuestionMeasure,
        requiredIf: ({objectState}) =>
          objectState.answerTypeSelect === Question.answerType.Measure &&
          objectState.isRequired,
        hideIf: ({objectState}) =>
          objectState.answerTypeSelect !== Question.answerType.Measure,
      },
      pictureAnswer: {
        type: 'object',
        widget: 'file',
        options: {
          documentTypesAllowed: 'images',
          displayPreview: true,
        },
        requiredIf: ({objectState}) =>
          objectState.answerTypeSelect === Question.answerType.Picture &&
          objectState.isRequired,
        hideIf: ({objectState}) =>
          objectState.answerTypeSelect !== Question.answerType.Picture,
      },
      signatureAnswer: {
        type: 'object',
        widget: 'signature',
        requiredIf: ({objectState}) =>
          objectState.answerTypeSelect === Question.answerType.Signature &&
          objectState.isRequired,
        hideIf: ({objectState}) =>
          objectState.answerTypeSelect !== Question.answerType.Signature,
      },
      textAnswer: {
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
        },
        requiredIf: ({objectState}) =>
          objectState.answerTypeSelect === Question.answerType.Text &&
          objectState.isRequired,
        hideIf: ({objectState}) =>
          objectState.answerTypeSelect !== Question.answerType.Text,
      },
      listAnswer: {
        type: 'object',
        widget: 'custom',
        customComponent: QuestionList,
        requiredIf: ({objectState}) =>
          objectState.answerTypeSelect === Question.answerType.ValueList &&
          objectState.isRequired,
        hideIf: ({objectState}) =>
          objectState.answerTypeSelect !== Question.answerType.ValueList,
      },
    },
  },
};
