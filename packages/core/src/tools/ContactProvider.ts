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

import {PermissionsAndroid, Platform} from 'react-native';
import Toast from 'react-native-toast-message';
import * as Contacts from 'react-native-contacts';
import {
  ContactData,
  PermissionResult,
  parseContactData,
} from './contact.helper';

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
          const _permAndroid = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
          ]);

          if (
            Object.values(_permAndroid).every(
              _perm => _perm === PermissionsAndroid.RESULTS.GRANTED,
            )
          ) {
            return PermissionResult.GRANTED;
          } else {
            return PermissionResult.DENIED;
          }

        default:
          throw new Error('Unsupported device.');
      }
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
      return PermissionResult.DENIED;
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

  saveContact = async (
    contactData: ContactData,
    editIfExist: boolean = true,
  ): Promise<boolean> => {
    try {
      if (!contactData.firstName) {
        throw new Error('Required contact data is missing.');
      }

      const permissionResult = await this._getContactsPermission();

      switch (permissionResult) {
        case PermissionResult.GRANTED:
          let record: Contacts.Contact = null;

          if (editIfExist) {
            record = await Contacts.getContactsMatchingString(
              contactData.firstName,
            ).then(_contacts => {
              if (Array.isArray(_contacts) && _contacts.length > 0) {
                console.log(_contacts);
                return _contacts[0];
              }

              return null;
            });
          }

          const _data = parseContactData(contactData);

          const contactAdded: boolean = await (record != null
            ? Contacts.editExistingContact({...record, ..._data})
            : Contacts.openContactForm(_data)
          ).then(_contact => {
            if (_contact != null) {
              this._showToast(
                'success',
                `Contact ${_contact.givenName} ${
                  record != null ? 'updated' : 'added'
                } successfully.`,
              );
              return true;
            } else {
              this._showToast('error', 'Contact addition was canceled.');
              return false;
            }
          });

          return contactAdded;
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
