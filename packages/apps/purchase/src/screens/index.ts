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

import RequestDetailsScreen from './RequestDetailsScreen';
import RequestLineListScreen from './RequestLineListScreen';
import RequestListScreen from './RequestListScreen';

export default {
  RequestListScreen: {
    title: 'Purchase_InternalRequests',
    component: RequestListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  RequestDetailsView: {
    title: 'Purchase_Request',
    component: RequestDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  RequestLineListScreen: {
    title: 'Purchase_InternalRequests',
    component: RequestLineListScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {RequestDetailsScreen};
export {RequestListScreen};
