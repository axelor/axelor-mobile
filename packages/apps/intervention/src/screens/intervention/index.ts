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

import DayInterventionsScreen from './DayInterventionsScreen';
import PlannedInterventionsScreen from './PlannedInterventionsScreen';
import InterventionsHistoryScreen from './InterventionsHistoryScreen';
import InterventionDetailsScreen from './InterventionDetailsScreen';

export default {
  DayInterventionsScreen: {
    title: 'Intervention_Interventions',
    component: DayInterventionsScreen,
    options: {
      shadedHeader: false,
    },
  },
  PlannedInterventionsScreen: {
    title: 'Intervention_Interventions',
    component: PlannedInterventionsScreen,
    options: {
      shadedHeader: false,
    },
  },
  InterventionsHistoryScreen: {
    title: 'Intervention_Interventions',
    component: InterventionsHistoryScreen,
    options: {
      shadedHeader: false,
    },
  },
  InterventionDetailsScreen: {
    title: 'Intervention_Intervention',
    component: InterventionDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {DayInterventionsScreen};
export {PlannedInterventionsScreen};
export {InterventionsHistoryScreen};
export {InterventionDetailsScreen};
