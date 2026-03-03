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

import {
  FormConfigs,
  UserSearchBar,
  getTypes,
  isEmpty,
} from '@axelor/aos-mobile-core';
import {
  CatalogTypePicker,
  CivilityPicker,
  ClientProspectSearchBar,
  ContactSearchBar,
  EventPeriodInput,
  EventStatusPicker,
  EventTypePicker,
  FunctionSearchBar,
  LeadSearchBar,
  OpportunityStatusPicker,
  PartnerSearchBar,
  PartnerTypeRadioSelect,
} from '../components';
import {updatePartner} from '../features/partnerSlice';

const MODELS = {
  lead: 'com.axelor.apps.crm.db.Lead',
  partner: 'com.axelor.apps.base.db.Partner',
};

const isPartnerCreation = (state: any) => state?.id != null;

const isIndividualPartner = (state: any) =>
  state?.partnerTypeSelect ===
  getTypes().Partner?.partnerTypeSelect?.Individual;

const checkPartnerType = (
  state: any,
  type: 'contact' | 'client' | 'prospect',
) => state?.[`is${type.charAt(0).toUpperCase() + type.slice(1)}`] === true;

export const crm_formsRegister: FormConfigs = {
  crm_catalog: {
    modelName: 'com.axelor.apps.crm.db.Catalog',
    fields: {
      name: {
        titleKey: 'Crm_Name',
        type: 'string',
        required: true,
      },
      catalogType: {
        titleKey: 'Crm_Catalog_Type',
        type: 'object',
        widget: 'custom',
        required: true,
        customComponent: CatalogTypePicker,
      },
      description: {
        titleKey: 'Crm_Description',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
        },
      },
      image: {
        titleKey: 'Crm_Image',
        type: 'string',
        widget: 'file',
        options: {
          documentTypesAllowed: 'images',
          returnBase64String: true,
          displayPreview: true,
        },
      },
      pdfFile: {
        titleKey: 'Crm_PdfFile',
        type: 'object',
        required: true,
        widget: 'file',
        options: {
          documentTypesAllowed: 'pdf',
        },
      },
    },
  },
  crm_partner: {
    modelName: MODELS.partner,
    panels: {
      booleanContainer: {
        direction: 'column',
        colSpan: 12,
      },
    },
    fields: {
      partnerTypeSelect: {
        titleKey: 'Crm_PartnerType',
        type: 'number',
        widget: 'custom',
        customComponent: PartnerTypeRadioSelect,
        hideIf: ({objectState}) => checkPartnerType(objectState, 'contact'),
      },
      isProspect: {
        titleKey: 'Crm_Prospect',
        type: 'boolean',
        widget: 'checkbox',
        parentPanel: 'booleanContainer',
        options: {iconSize: 20},
        dependsOn: {isCustomer: ({newValue}) => !newValue},
        hideIf: ({objectState}) =>
          isPartnerCreation(objectState) ||
          checkPartnerType(objectState, 'contact'),
      },
      isCustomer: {
        titleKey: 'Crm_Client',
        type: 'boolean',
        widget: 'checkbox',
        parentPanel: 'booleanContainer',
        options: {iconSize: 20},
        dependsOn: {isProspect: ({newValue}) => !newValue},
        hideIf: ({objectState}) =>
          isPartnerCreation(objectState) ||
          checkPartnerType(objectState, 'contact'),
      },
      titleSelect: {
        titleKey: 'Crm_Civility',
        type: 'string',
        widget: 'custom',
        customComponent: CivilityPicker,
        hideIf: ({objectState}) => !isIndividualPartner(objectState),
      },
      firstName: {
        titleKey: 'Crm_FirstName',
        type: 'string',
        widget: 'default',
        hideIf: ({objectState}) => !isIndividualPartner(objectState),
      },
      name: {
        titleKey: 'Crm_Name',
        type: 'string',
        widget: 'default',
        required: true,
      },
      mainPartner: {
        titleKey: 'Crm_ClientProspect',
        type: 'object',
        widget: 'custom',
        customComponent: ClientProspectSearchBar,
        hideIf: ({objectState}) => !checkPartnerType(objectState, 'contact'),
        requiredIf: ({objectState}) => checkPartnerType(objectState, 'contact'),
      },
      description: {
        titleKey: 'Crm_Notes',
        type: 'string',
        widget: 'HTML',
      },
    },
  },
  crm_lead: {
    modelName: 'com.axelor.apps.crm.db.Lead',
    panels: {
      header: {
        direction: 'row',
        colSpan: 12,
      },
      headerLeft: {
        direction: 'column',
        colSpan: 6,
        parent: 'header',
      },
      headerRight: {
        direction: 'column',
        colSpan: 6,
        parent: 'header',
      },
    },
    fields: {
      titleSelect: {
        titleKey: 'Crm_Civility',
        type: 'string',
        widget: 'custom',
        customComponent: CivilityPicker,
        parentPanel: 'headerLeft',
      },
      leadScoringSelect: {
        type: 'number',
        widget: 'star',
        parentPanel: 'headerRight',
      },
      isDoNotSendEmail: {
        titleKey: 'Crm_NoEmail',
        type: 'boolean',
        widget: 'checkbox',
        parentPanel: 'headerRight',
        options: {
          iconSize: 20,
        },
      },
      isDoNotCall: {
        titleKey: 'Crm_NoPhoneCall',
        type: 'boolean',
        widget: 'checkbox',
        parentPanel: 'headerRight',
        options: {
          iconSize: 20,
        },
      },
      firstName: {
        titleKey: 'Crm_FirstName',
        type: 'string',
        widget: 'default',
      },
      name: {
        titleKey: 'Crm_Name',
        type: 'string',
        widget: 'default',
        required: true,
      },
      enterpriseName: {
        titleKey: 'Crm_Company',
        type: 'string',
        widget: 'default',
      },
      jobTitleFunction: {
        titleKey: 'Crm_JobTitle',
        type: 'object',
        widget: 'custom',
        customComponent: FunctionSearchBar,
      },
      fixedPhone: {
        titleKey: 'Crm_Phone',
        type: 'phone',
        widget: 'default',
      },
      mobilePhone: {
        titleKey: 'Crm_MobilePhone',
        type: 'phone',
        widget: 'default',
      },
      email: {
        titleKey: 'Crm_Email',
        type: 'email',
        widget: 'default',
      },
      webSite: {
        titleKey: 'Crm_WebSite',
        type: 'url',
        widget: 'default',
      },
      description: {
        titleKey: 'Crm_Notes',
        type: 'string',
        widget: 'HTML',
      },
    },
  },
  crm_opportunity: {
    modelName: 'com.axelor.apps.crm.db.Opportunity',
    panels: {
      header: {
        direction: 'row',
        colSpan: 12,
      },
      headerLeft: {
        direction: 'column',
        colSpan: 8,
        parent: 'header',
      },
      headerRight: {
        direction: 'column',
        colSpan: 4,
        parent: 'header',
      },
    },
    fields: {
      opportunityRating: {
        type: 'number',
        widget: 'star',
        parentPanel: 'headerRight',
      },
      name: {
        titleKey: 'Crm_Name',
        type: 'string',
        widget: 'default',
      },
      partner: {
        titleKey: 'Crm_ClientProspect',
        type: 'object',
        widget: 'custom',
        customComponent: ClientProspectSearchBar,
        required: true,
        dependsOn: {
          contact: ({newValue, objectState, dispatch}) => {
            if (newValue != null) {
              dispatch(updatePartner(newValue?.mainPartner));
              return newValue?.mainPartner;
            } else {
              return objectState?.partner;
            }
          },
        },
      },
      contact: {
        titleKey: 'Crm_Contact',
        type: 'object',
        widget: 'custom',
        customComponent: ContactSearchBar,
        options: {
          showTitle: true,
        },
        requiredIf: ({objectState}) => objectState.partner == null,
        dependsOn: {
          partner: ({newValue, objectState, dispatch}) => {
            dispatch(updatePartner(newValue));
            if (objectState.contact?.mainPartner?.id !== newValue?.id) {
              return null;
            } else {
              return objectState.contact;
            }
          },
        },
      },
      expectedCloseDate: {
        titleKey: 'Crm_Opportunity_ExpectedCloseDate',
        type: 'date',
        widget: 'date',
      },
      amount: {
        titleKey: 'Crm_Opportunity_Amount',
        type: 'number',
        widget: 'increment',
      },
      recurrentAmount: {
        titleKey: 'Crm_Opportunity_RecurrentAmount',
        type: 'number',
        widget: 'increment',
        hideIf: ({storeState}) => !storeState.appConfig.crm?.isManageRecurrent,
      },
      description: {
        titleKey: 'Base_Description',
        type: 'string',
        widget: 'HTML',
      },
      opportunityStatus: {
        titleKey: 'Crm_Opportunity_Status',
        type: 'object',
        widget: 'custom',
        customComponent: OpportunityStatusPicker,
        required: true,
      },
    },
  },
  crm_event: {
    modelName: 'com.axelor.apps.crm.db.Event',
    fields: {
      subject: {
        titleKey: 'Crm_Subject',
        type: 'string',
        widget: 'default',
        required: true,
      },
      typeSelect: {
        titleKey: 'Crm_Type',
        type: 'number',
        widget: 'custom',
        required: true,
        customComponent: EventTypePicker,
      },
      statusSelect: {
        titleKey: 'Crm_Status',
        type: 'number',
        widget: 'custom',
        required: true,
        customComponent: EventStatusPicker,
      },
      partner: {
        titleKey: 'Crm_Partner',
        type: 'object',
        widget: 'custom',
        customComponent: PartnerSearchBar,
        hideIf: ({objectState}) => !isEmpty(objectState.eventLead),
        readonlyIf: ({objectState}) => objectState.partnerReadonly,
      },
      contactPartner: {
        titleKey: 'Crm_Contact',
        type: 'object',
        widget: 'custom',
        customComponent: ContactSearchBar,
        hideIf: ({objectState}) =>
          !isEmpty(objectState.eventLead) || objectState.hideContactPartner,
        readonlyIf: ({objectState}) => objectState.contactPartnerReadonly,
        options: {
          showTitle: true,
        },
      },
      eventLead: {
        titleKey: 'Crm_Lead',
        type: 'object',
        widget: 'custom',
        customComponent: LeadSearchBar,
        hideIf: ({objectState}) =>
          !isEmpty(objectState.contactPartner) || !isEmpty(objectState.partner),
        readonlyIf: ({objectState}) => objectState.leadReadonly,
        options: {
          showTitle: true,
        },
      },
      perdiodDateTime: {
        type: 'object',
        widget: 'custom',
        customComponent: EventPeriodInput,
      },
      perdiodDateTimeError: {
        type: 'string',
        validationOptions: {
          required: {
            customErrorKey: 'Base_PeriodError',
          },
        },
        dependsOn: {
          perdiodDateTime: ({newValue}) => {
            if (newValue.isError) {
              return '';
            } else {
              return 'OK';
            }
          },
        },
        hideIf: () => true,
      },
      allDay: {
        titleKey: 'Crm_AllDay',
        type: 'boolean',
        widget: 'checkbox',
        options: {
          iconSize: 20,
        },
      },
      description: {
        titleKey: 'Crm_Description',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
        },
      },
      location: {
        titleKey: 'Crm_Location',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
        },
      },
      user: {
        titleKey: 'Crm_AssignedTo',
        type: 'object',
        widget: 'custom',
        customComponent: UserSearchBar,
      },
      relatedToSelect: {
        type: 'string',
        hideIf: () => {
          return true;
        },
        dependsOn: {
          eventLead: () => {
            return MODELS.lead;
          },
          contactPartner: () => {
            return MODELS.partner;
          },
          partner: () => {
            return MODELS.partner;
          },
        },
      },
      relatedToSelectId: {
        type: 'number',
        hideIf: () => {
          return true;
        },
        dependsOn: {
          eventLead: ({newValue}) => {
            return newValue?.id;
          },
          contactPartner: ({newValue}) => {
            return newValue?.id;
          },
          partner: ({newValue}) => {
            return newValue?.id;
          },
        },
      },
    },
  },
};
