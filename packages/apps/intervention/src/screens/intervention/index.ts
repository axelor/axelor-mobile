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

import ActiveInterventionScreen from './ActiveInterventionScreen';
import DayInterventionsScreen from './DayInterventionsScreen';
import InterventionDetailsScreen from './InterventionDetailsScreen';
import InterventionNoteFormScreen from './InterventionNoteFormScreen';
import InterventionPlanningScreen from './InterventionPlanningScreen';
import InterventionQuestionFormScreen from './InterventionQuestionFormScreen';
import InterventionsHistoryScreen from './InterventionsHistoryScreen';
import PlannedInterventionsScreen from './PlannedInterventionsScreen';

export default {
  ActiveInterventionScreen: {
    title: 'Intervention_Intervention',
    component: ActiveInterventionScreen,
    actionID: 'intervention_active_intervention',
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  DayInterventionsScreen: {
    title: 'Intervention_Interventions',
    component: DayInterventionsScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
    actionID: 'intervention_intervention_list',
  },
  PlannedInterventionsScreen: {
    title: 'Intervention_Interventions',
    component: PlannedInterventionsScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
    actionID: 'intervention_intervention_list',
  },
  InterventionsHistoryScreen: {
    title: 'Intervention_Interventions',
    component: InterventionsHistoryScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
    actionID: 'intervention_intervention_list',
  },
  InterventionPlanningScreen: {
    title: 'Intervention_Planning',
    component: InterventionPlanningScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
    actionID: 'intervention_intervention_planning',
  },
  InterventionDetailsScreen: {
    title: 'Intervention_Intervention',
    component: InterventionDetailsScreen,
    actionID: 'intervention_intervention_details',
    options: {
      shadedHeader: false,
    },
  },
  InterventionNoteFormScreen: {
    title: 'Intervention_Note',
    component: InterventionNoteFormScreen,
    options: {
      shadedHeader: false,
    },
  },
  InterventionQuestionFormScreen: {
    title: 'Intervention_Survey',
    component: InterventionQuestionFormScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {ActiveInterventionScreen};
export {DayInterventionsScreen};
export {InterventionDetailsScreen};
export {InterventionNoteFormScreen};
export {InterventionPlanningScreen};
export {InterventionQuestionFormScreen};
export {InterventionsHistoryScreen};
export {PlannedInterventionsScreen};
