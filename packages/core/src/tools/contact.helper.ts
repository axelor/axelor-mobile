/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import * as Contacts from 'react-native-contacts';
import {isEmpty} from '../utils';

export interface ContactData {
  firstName: string;
  lastName?: string;
  company?: string;
  mobilePhone?: string;
  fixedPhone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

export enum PermissionResult {
  DENIED = 'denied',
  GRANTED = 'granted',
}

const CONTACT_MAPPER: {
  [key: string]: {
    key: string;
    type: 'info' | 'phone' | 'email' | 'address';
    label?: string;
  };
} = {
  firstName: {
    key: 'givenName',
    type: 'info',
  },
  lastName: {
    key: 'familyName',
    type: 'info',
  },
  company: {
    key: 'company',
    type: 'info',
  },
  notes: {
    key: 'note',
    type: 'info',
  },
  mobilePhone: {
    key: 'phoneNumbers',
    type: 'phone',
    label: 'mobile',
  },
  fixedPhone: {
    key: 'phoneNumbers',
    type: 'phone',
    label: 'fixed',
  },
  email: {
    key: 'emailAddresses',
    type: 'email',
    label: 'email',
  },
  address: {
    key: 'postalAddresses',
    type: 'address',
    label: 'main address',
  },
};

const manageArrayField = (array: Array<any>, value?: any) => {
  const _array = Array.isArray(array) ? [...array] : [];
  _array.push(value);
  return _array;
};

const managePhoneField = (value, label) => ({
  label: label,
  number: value,
});

const manageEmailField = (value, label) => ({
  label: label,
  email: value,
});

const manageAddressField = (value, label) => ({
  label: label,
  formattedAddress: value,
  street: null,
  pobox: null,
  neighborhood: null,
  city: null,
  region: null,
  state: null,
  postCode: null,
  country: null,
});

export const parseContactData = (
  contact: ContactData,
): Partial<Contacts.Contact> => {
  if (isEmpty(contact)) {
    return {};
  }

  const result: Partial<Contacts.Contact> = {};

  Object.entries(CONTACT_MAPPER).forEach(([key, config]) => {
    const value = contact[key];

    if (value != null) {
      switch (config.type) {
        case 'info':
          result[config.key] = value;
          break;
        case 'phone':
          result[config.key] = manageArrayField(
            result[config.key],
            managePhoneField(value, config.label),
          );
          break;
        case 'email':
          result[config.key] = manageArrayField(
            result[config.key],
            manageEmailField(value, config.label),
          );
          break;
        case 'address':
          result[config.key] = manageArrayField(
            result[config.key],
            manageAddressField(value, config.label),
          );
          break;
        default:
          break;
      }
    }
  });

  return result;
};
