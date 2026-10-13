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

import {Platform} from 'react-native';
import Contacts from 'react-native-contacts';
import {
  ContactData,
  PermissionResult,
  parseContactData,
} from './contact.helper';
import {showToastMessage} from '../utils';

class ContactProvider {
  constructor() {}

  private _getContactsPermission = async () => {
    try {
      switch (Platform.OS) {
        case 'ios':
          const _permIOS = await Contacts.requestPermission();
          switch (_permIOS) {
            case 'authorized':
              return PermissionResult.GRANTED;
            default:
              return PermissionResult.DENIED;
          }
        case 'android':
          return PermissionResult.GRANTED;
        default:
          throw new Error('Unsupported device.');
      }
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
      return PermissionResult.DENIED;
    }
  };

  private _openContactForm = async (
    contactData: ContactData,
  ): Promise<string | null> => {
    try {
      const _contact = await Contacts.openContactForm(
        parseContactData(contactData),
      );
      return _contact != null ? _contact.givenName : null;
    } catch (error) {
      if (Platform.OS === 'android') {
        return contactData.firstName;
      }
      throw error;
    }
  };

  private _showToast = (type: string, message: string): void => {
    showToastMessage({
      type,
      position: 'bottom',
      bottomOffset: 20,
      text1: type === 'success' ? 'Success' : 'Error',
      text2: message,
    });
  };

  saveContact = async (contactData: ContactData): Promise<boolean> => {
    try {
      if (!contactData.firstName) {
        throw new Error('Required contact data is missing.');
      }

      const permissionResult = await this._getContactsPermission();

      switch (permissionResult) {
        case PermissionResult.GRANTED:
          const addedContactName = await this._openContactForm(contactData);

          if (addedContactName != null) {
            this._showToast(
              'success',
              `Contact ${addedContactName} added successfully.`,
            );
            return true;
          }

          this._showToast('error', 'Contact addition was canceled.');
          return false;
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
