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
import {PERMISSIONS, Permission, request} from 'react-native-permissions';
import * as Contacts from 'react-native-contacts';

interface ContactData {
  firstName: string;
  lastName?: string;
  phoneNumbers?: {
    mobilePhone: string;
    fixedPhone: string;
  };
  email?: string;
  address?: string;
  notes?: string;
}

enum PermissionResult {
  UNAVAILABLE = 'unavailable',
  BLOCKED = 'blocked',
  DENIED = 'denied',
  GRANTED = 'granted',
  LIMITED = 'limited',
}

class ContactProvider {
  constructor() {}

  private _getReadContactPermission = (): Permission => {
    switch (Platform.OS) {
      case 'ios':
        return PERMISSIONS.IOS.CONTACTS;
      case 'android':
        return PERMISSIONS.ANDROID.READ_CONTACTS;
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
        const reactContactPermission = this._getReadContactPermission();
        const permissionStatus = await request(reactContactPermission);
        return permissionStatus as PermissionResult;
      } catch (error) {
        console.error('Error requesting contacts permission:', error);
        return PermissionResult.DENIED;
      }
    };

  private _createContactData = (
    contactData: ContactData,
  ): Partial<Contacts.Contact> => {
    const {firstName, lastName, email, phoneNumbers, address, notes} =
      contactData;

    const contact: Partial<Contacts.Contact> = {
      givenName: firstName,
      familyName: lastName || undefined,
      emailAddresses: email
        ? [
            {
              label: 'email',
              email,
            },
          ]
        : undefined,
      phoneNumbers: phoneNumbers
        ? [
            {
              label: 'mobile',
              number: phoneNumbers.mobilePhone,
            },
            {
              label: 'fixed',
              number: phoneNumbers.fixedPhone,
            },
          ]
        : undefined,
      postalAddresses: address
        ? [
            {
              label: 'main address',
              formattedAddress: address,
              street: null,
              pobox: null,
              neighborhood: null,
              city: null,
              region: null,
              state: null,
              postCode: null,
              country: null,
            },
          ]
        : undefined,
      note: notes || undefined,
    };

    return contact;
  };

  saveContact = async (contactData: ContactData): Promise<boolean> => {
    try {
      if (!contactData.firstName) {
        throw new Error('Required contact data is missing.');
      }

      const permissionResult = await this._requestReadContactsPermission();

      let toastType: string;
      let toastMessage: string;

      switch (permissionResult) {
        case PermissionResult.GRANTED:
        case PermissionResult.LIMITED:
          const _contactData = this._createContactData(contactData);
          await Contacts.addContact(_contactData);
          toastType = 'success';
          toastMessage = `Contact ${contactData.firstName} added successfully.`;
          break;
        case PermissionResult.DENIED:
        case PermissionResult.BLOCKED:
        case PermissionResult.UNAVAILABLE:
          toastType = 'error';
          toastMessage = 'Contacts permission denied.';
          break;
        default:
          toastType = 'error';
          toastMessage = 'Unknown permission result.';
          break;
      }

      this._showToast(toastType, toastMessage);
      return toastType === 'success';
    } catch (error) {
      this._showToast('error', `Error adding contact: ${error}`);
      return false;
    }
  };
}

export const contactProvider = new ContactProvider();
