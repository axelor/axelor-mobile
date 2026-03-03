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

import Contacts from 'react-native-contacts';
import {isEmpty} from '../utils';
import {Platform} from 'react-native';

export interface ContactData {
  firstName: string;
  lastName?: string;
  company?: string;
  mobilePhone?: string;
  fixedPhone?: string;
  email?: string;
  address?: {
    street?: string;
    postCode?: string;
    city?: string;
    country?: string;
  };
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
    label: 'work',
  },
  address: {
    key: 'postalAddresses',
    type: 'address',
    label: 'main address',
  },
};

const manageAndroidName = (data: ContactData) => {
  let result = '';

  if (data.firstName != null) {
    result = result.concat(data.firstName);
  }

  if (data.lastName != null) {
    result = result.concat(' ').concat(data.lastName);
  }

  return result;
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

const manageAddressField = (value, label) => {
  const DEFAULT = '';
  const street = value?.street || DEFAULT;
  const postCode = value?.postCode || DEFAULT;
  const city = value?.city || DEFAULT;
  const country = value?.country || DEFAULT;

  return {
    label: label,
    formattedAddress: `${street} ${postCode} ${city} ${country}`,
    street,
    pobox: DEFAULT,
    neighborhood: DEFAULT,
    city,
    region: DEFAULT,
    state: DEFAULT,
    postCode,
    country,
  };
};

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

  if (Platform.OS === 'android') {
    result.displayName = manageAndroidName(contact);
  }

  return result;
};
