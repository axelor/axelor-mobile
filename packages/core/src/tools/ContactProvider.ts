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

import {Platform} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  PERMISSIONS,
  Permission,
  requestMultiple,
} from 'react-native-permissions';
import * as Contacts from 'react-native-contacts';
import {
  ContactData,
  PermissionResult,
  parseContactData,
} from './contact.helper';

class ContactProvider {
  constructor() {}

  private _getContactsPermission = (): Permission[] => {
    switch (Platform.OS) {
      case 'ios':
        return [PERMISSIONS.IOS.CONTACTS];
      case 'android':
        return [
          PERMISSIONS.ANDROID.WRITE_CONTACTS,
          PERMISSIONS.ANDROID.READ_CONTACTS,
        ];
      default:
        throw new Error('Unsupported device.');
    }
  };

  private _showToast = (type: string, message: string): void => {
    Toast.show({
      type,
      position: 'bottom',
      bottomOffset: 20,
      text1: type === 'success' ? 'Success' : 'Error',
      text2: message,
    });
  };

  private _requestReadContactsPermission =
    async (): Promise<PermissionResult> => {
      try {
        const contactsPermission = this._getContactsPermission();
        await requestMultiple(contactsPermission);
        return PermissionResult.GRANTED;
      } catch (error) {
        console.error('Error requesting contacts permission:', error);
        return PermissionResult.DENIED;
      }
    };

  saveContact = async (contactData: ContactData): Promise<boolean> => {
    try {
      if (!contactData.firstName) {
        throw new Error('Required contact data is missing.');
      }

      const permissionResult = await this._requestReadContactsPermission();

      switch (permissionResult) {
        case PermissionResult.GRANTED:
          const _contactData = parseContactData(contactData);
          await Contacts.addContact(_contactData);
          this._showToast(
            'success',
            `Contact ${contactData.firstName} added successfully.`,
          );
          return true;
        case PermissionResult.DENIED:
          this._showToast('error', 'Contacts permission denied.');
          return false;
        default:
          this._showToast('error', 'Unknown permission result.');
          return false;
      }
    } catch (error) {
      this._showToast('error', `Error adding contact: ${error}`);
      return false;
    }
  };
}

export const contactProvider = new ContactProvider();
