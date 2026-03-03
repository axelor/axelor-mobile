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

import TourListScreen from './TourListScreen';
import TourDetailsScreen from './TourDetailsScreen';

export default {
  TourListScreen: {
    title: 'Crm_Tours',
    actionID: 'crm_tour_list',
    component: TourListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  TourDetailsScreen: {
    title: 'Crm_Tours',
    component: TourDetailsScreen,
    actionID: 'crm_tour_details',
    options: {
      shadedHeader: false,
    },
  },
};

export {TourListScreen};
