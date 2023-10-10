/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {FormConfigs, UserSearchBar} from '@axelor/aos-mobile-core';
import {
  CatalogTypePicker,
  CivilityPicker,
  ClientProspectSearchBar,
  ContactSearchBar,
  EventStatusPicker,
  EventTypePicker,
  FunctionSearchBar,
  LeadSearchBar,
  OpportunityStatusPicker,
  PartnerSearchBar,
} from '../components';

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
  crm_client: {
    modelName: 'com.axelor.apps.base.db.Partner',
    fields: {
      name: {
        titleKey: 'Crm_Name',
        type: 'string',
        widget: 'default',
      },
      fixedPhone: {
        titleKey: 'Crm_Phone',
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
  crm_contact: {
    modelName: 'com.axelor.apps.base.db.Partner',
    fields: {
      titleSelect: {
        titleKey: 'Crm_Civility',
        type: 'string',
        widget: 'custom',
        customComponent: CivilityPicker,
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
      },
      mainPartner: {
        titleKey: 'Crm_ClientProspect',
        type: 'object',
        widget: 'custom',
        customComponent: ClientProspectSearchBar,
        required: true,
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
      primaryAddress: {
        titleKey: 'Crm_Adress',
        type: 'string',
        widget: 'default',
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
      },
      contact: {
        titleKey: 'Crm_Contact',
        type: 'object',
        widget: 'custom',
        customComponent: ContactSearchBar,
        required: true,
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
        hideIf: ({storeState}) =>
          !storeState.crmConfig.crmConfig?.isManageRecurrent,
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
  crm_prospect: {
    modelName: 'com.axelor.apps.base.db.Partner',
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
      leadScoringSelect: {
        type: 'number',
        widget: 'star',
        parentPanel: 'headerRight',
      },
      name: {
        titleKey: 'Crm_Name',
        type: 'string',
        widget: 'default',
      },
      fixedPhone: {
        titleKey: 'Crm_Phone',
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
  crm_event: {
    modelName: 'com.axelor.apps.crm.db.Event',
    fields: {
      subject: {
        titleKey: 'Crm_Subject',
        type: 'string',
        widget: 'default',
        required: true,
      },
      type: {
        titleKey: 'Crm_Type',
        type: 'number',
        widget: 'custom',
        required: true,
        customComponent: EventTypePicker,
      },
      status: {
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
      },
      contact: {
        titleKey: 'Crm_Contact',
        type: 'object',
        widget: 'custom',
        customComponent: ContactSearchBar,
      },
      eventLead: {
        titleKey: 'Crm_Lead',
        type: 'object',
        widget: 'custom',
        customComponent: LeadSearchBar,
      },
      startDateTime: {
        titleKey: 'Crm_StartDate',
        type: 'datetime',
        widget: 'date',
      },
      endDateTime: {
        titleKey: 'Crm_EndDate',
        type: 'datetime',
        widget: 'date',
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
        titleKey: 'Crm_User',
        type: 'object',
        widget: 'custom',
        customComponent: UserSearchBar,
      },
    },
  },
};
