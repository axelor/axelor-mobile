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

import {FormConfigs, UserSearchBar} from '@axelor/aos-mobile-core';
import {DurationInput} from '@axelor/aos-mobile-ui';
import {
  ContactPartnerSearchBar,
  CustomerSearchBar,
  ProgressFormInput,
  ProjectSearchBar,
  TicketStatusSearchBar,
  TicketTypeSearchBar,
  TicketPriorityPicker,
} from '../components';
import {getCustomerbyId} from '../features/customerSlice';

export const helpdesk_formsRegister: FormConfigs = {
  helpdesk_ticket: {
    modelName: 'com.axelor.apps.helpdesk.db.Ticket',
    fields: {
      subject: {
        type: 'string',
        widget: 'default',
        titleKey: 'Hepdesk_Subject',
        required: true,
      },
      progressSelect: {
        titleKey: 'Helpdesk_Progress',
        type: 'number',
        widget: 'custom',
        customComponent: ProgressFormInput,
      },
      project: {
        type: 'object',
        titleKey: 'Helpdesk_Project',
        widget: 'custom',
        customComponent: ProjectSearchBar,
      },
      customerPartner: {
        type: 'object',
        titleKey: 'Helpdesk_CustomPartner',
        widget: 'custom',
        customComponent: CustomerSearchBar,
        dependsOn: {
          project: ({newValue}) => {
            return newValue?.clientPartner;
          },
        },
      },
      contactPartner: {
        type: 'object',
        titleKey: 'Helpdesk_ContactPartner',
        widget: 'custom',
        customComponent: ContactPartnerSearchBar,
        dependsOn: {
          customerPartner: ({newValue, dispatch}) => {
            dispatch((getCustomerbyId as any)({customerId: newValue?.id}));
          },
          project: ({newValue, dispatch}) => {
            dispatch(
              (getCustomerbyId as any)({
                customerId: newValue?.clientPartner?.id,
              }),
            );
            return newValue?.contactPartner;
          },
        },
      },
      ticketType: {
        titleKey: 'Helpdesk_Type',
        type: 'object',
        widget: 'custom',
        customComponent: TicketTypeSearchBar,
      },
      ticketStatus: {
        titleKey: 'Helpdesk_Status',
        type: 'object',
        widget: 'custom',
        customComponent: TicketStatusSearchBar,
      },
      prioritySelect: {
        type: 'number',
        widget: 'custom',
        titleKey: 'Helpdesk_Priority',
        customComponent: TicketPriorityPicker,
      },
      startDateT: {
        type: 'datetime',
        widget: 'date',
        titleKey: 'Helpdesk_StartDate',
        options: {
          nullable: true,
        },
      },
      endDateT: {
        type: 'datetime',
        widget: 'date',
        titleKey: 'Helpdesk_EndDate',
        options: {
          nullable: true,
        },
      },
      deadlineDateT: {
        type: 'datetime',
        widget: 'date',
        titleKey: 'Helpdesk_DeadlineDate',
        options: {
          nullable: true,
        },
      },
      duration: {
        titleKey: 'Helpdesk_Duration',
        type: 'string',
        widget: 'custom',
        customComponent: DurationInput,
      },
      assignedToUser: {
        titleKey: 'Helpdesk_AssignedToUser',
        type: 'object',
        widget: 'custom',
        customComponent: UserSearchBar,
      },
      responsibleUser: {
        titleKey: 'Helpdesk_ResponsibleUser',
        type: 'object',
        widget: 'custom',
        customComponent: UserSearchBar,
      },
      description: {
        type: 'string',
        widget: 'HTML',
        titleKey: 'Base_Description',
      },
    },
  },
};
