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

import ContactListScreen from './ContactListScreen';
import ContactDetailsScreen from './ContactDetailsScreen';
import ContactFormScreen from './ContactFormScreen';

export default {
  ContactListScreen: {
    title: 'Crm_Contacts',
    actionID: 'crm_contact_list',
    component: ContactListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  ContactDetailsScreen: {
    title: 'Crm_Contact',
    component: ContactDetailsScreen,
    actionID: 'crm_contact_details',
    options: {
      shadedHeader: false,
    },
  },
  ContactFormScreen: {
    title: 'Crm_Contact',
    component: ContactFormScreen,
  },
};

export {ContactListScreen};
export {ContactDetailsScreen};
export {ContactFormScreen};
