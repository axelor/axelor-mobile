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

import EventPlanningScreen from './EventPlanningScreen';
import EventDetailsScreen from './EventDetailsScreen';
import EventFormScreen from './EventFormScreen';

export default {
  EventPlanningScreen: {
    title: 'Crm_Events',
    component: EventPlanningScreen,
    actionID: 'crm_event_planning',
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  EventDetailsScreen: {
    title: 'Crm_Event',
    component: EventDetailsScreen,
    actionID: 'crm_event_details',
    options: {
      shadedHeader: false,
    },
  },
  EventFormScreen: {
    title: 'Crm_Event',
    component: EventFormScreen,
  },
};

export {EventPlanningScreen};
export {EventDetailsScreen};
export {EventFormScreen};
