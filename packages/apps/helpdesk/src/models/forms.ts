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

import {FormConfigs} from '@axelor/aos-mobile-core';
import {ProgressFormInput, ProjectSearchBar} from '../components';

export const helpdesk_formsRegister: FormConfigs = {
  helpdesk_ticket: {
    modelName: 'com.axelor.apps.helpdesk.db.Ticket',
    fields: {
      subject: {
        type: 'string',
        widget: 'default',
        titleKey: 'Hepdesk_Subject',
      },
      progressSelect: {
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
    },
  },
};
