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

import RequestCreationScreen from './RequestCreationScreen';
import RequestDetailsScreen from './RequestDetailsScreen';
import RequestLineFormScreen from './RequestLineFormScreen';
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
    actionID: 'purchase_purchaseRequest_list',
  },
  RequestDetailsView: {
    title: 'Purchase_InternalRequest',
    actionID: 'purchase_purchaseRequest_details',
    component: RequestDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  RequestLineListScreen: {
    title: 'Purchase_InternalRequest',
    component: RequestLineListScreen,
    options: {
      shadedHeader: false,
    },
  },
  RequestCreationScreen: {
    title: 'Purchase_CreateRequest',
    component: RequestCreationScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  RequestLineFormScreen: {
    title: 'Purchase_InternalRequest',
    actionID: 'purchase_purchaseRequestLine_details',
    component: RequestLineFormScreen,
  },
};

export {RequestDetailsScreen};
export {RequestListScreen};
export {RequestLineFormScreen};
export {RequestLineListScreen};
export {RequestCreationScreen};
