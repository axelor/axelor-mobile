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

import ProspectsListScreen from './ProspectsListScreen';
import ProspectDetailsScreen from './ProspectDetailsScreen';
import ProspectFormScreen from './ProspectFormScreen';

export default {
  ProspectsListScreen: {
    title: 'Crm_Prospect',
    actionID: 'crm_prospect_list',
    component: ProspectsListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  ProspectDetailsScreen: {
    title: 'Crm_Prospect',
    component: ProspectDetailsScreen,
    actionID: 'crm_prospect_details',
    options: {
      shadedHeader: false,
    },
  },
  ProspectFormScreen: {
    title: 'Crm_Prospect',
    component: ProspectFormScreen,
  },
};

export {ProspectsListScreen};
export {ProspectDetailsScreen};
export {ProspectFormScreen};
