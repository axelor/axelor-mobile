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

import {PermissionsAndroid} from 'react-native';
import * as Contacts from 'react-native-contacts';

interface ContactData {
  lastName: string;
  firstName: string;
  phoneNumbers: {
    mobilePhone: string;
    fixedPhone: string;
  };
  email: string;
  address: string;
  notes?: string;
}

enum PermissionResult {
  GRANTED = 'granted',
  DENIED = 'denied',
  NEVER_ASK_AGAIN = 'never_ask_again',
}

class ContactProvider {
  constructor() {}

  private _requestReadContactsPermission =
    async (): Promise<PermissionResult> => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to read your contacts.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        return granted as PermissionResult;
      } catch (error) {
        console.error('Error requesting contacts permission:', error);
        return PermissionResult.DENIED;
      }
    };

  private _createContactData = (
    contactData: ContactData,
  ): Partial<Contacts.Contact> => {
    return {
      emailAddresses: [
        {
          label: 'contact email address',
          email: contactData.email,
        },
      ],
      familyName: contactData.lastName,
      givenName: contactData.firstName,
      phoneNumbers: [
        {
          label: 'mobile',
          number: contactData.phoneNumbers.mobilePhone,
        },
        {
          label: 'fixed',
          number: contactData.phoneNumbers.fixedPhone,
        },
      ],
      postalAddresses: [
        {
          label: 'main address',
          formattedAddress: contactData.address,
          street: null,
          pobox: null,
          neighborhood: null,
          city: null,
          region: null,
          state: null,
          postCode: null,
          country: null,
        },
      ],
      note: contactData.notes,
    };
  };

  saveContact = async (contactData: ContactData): Promise<string> => {
    try {
      if (
        !contactData.firstName ||
        !contactData.lastName ||
        !contactData.phoneNumbers.mobilePhone
      ) {
        throw new Error('Required contact data is missing.');
      }

      const permissionResult = await this._requestReadContactsPermission();

      switch (permissionResult) {
        case PermissionResult.GRANTED:
          const _contactData = this._createContactData(contactData);
          await Contacts.addContact(_contactData);
          return 'Contact added successfully.';
        case PermissionResult.DENIED:
          return 'Contacts permission denied.';
        case PermissionResult.NEVER_ASK_AGAIN:
          return 'Contacts permission denied permanently.';
        default:
          return 'Unknown permission result.';
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      return 'Error adding contact: ' + error.message;
    }
  };
}

export const contactProvider = new ContactProvider();
