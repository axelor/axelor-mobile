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

import LeadListScreen from './LeadListScreen';
import LeadDetailsScreen from './LeadDetailsScreen';
import LeadFormScreen from './LeadFormScreen';

export default {
  LeadListScreen: {
    title: 'Crm_Leads',
    component: LeadListScreen,
    actionID: 'crm_lead_list',
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  LeadDetailsScreen: {
    title: 'Crm_Lead',
    component: LeadDetailsScreen,
    actionID: 'crm_lead_details',
    options: {
      shadedHeader: false,
    },
  },
  LeadFormScreen: {
    title: 'Crm_Lead',
    component: LeadFormScreen,
    isUsableOnShortcut: true,
  },
};

export {LeadListScreen};
export {LeadDetailsScreen};
export {LeadFormScreen};
