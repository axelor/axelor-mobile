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

import OpportunityDetailsScreen from './OpportunityDetailsScreen';
import OpportunityListScreen from './OpportunityListScreen';
import OpportunityFormScreen from './OpportunityFormScreen';

export default {
  OpportunityListScreen: {
    title: 'Crm_Opportunities',
    component: OpportunityListScreen,
    actionID: 'crm_opportunity_list',
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  OpportunityDetailsScreen: {
    title: 'Crm_Opportunity',
    component: OpportunityDetailsScreen,
    actionID: 'crm_opportunity_details',
    options: {
      shadedHeader: false,
    },
  },
  OpportunityFormScreen: {
    title: 'Crm_Opportunity',
    component: OpportunityFormScreen,
    isUsableOnShortcut: true,
  },
};

export {OpportunityDetailsScreen};
export {OpportunityListScreen};
export {OpportunityFormScreen};
