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

import {isEmpty} from '@axelor/aos-mobile-core';

class ContactInfoType {
  static type = {
    Address: 0,
    MobilePhone: 1,
    FixedPhone: 2,
    Email: 3,
    WebSite: 4,
  };

  static getContactInfo = (contactInfoType: number, contact: any) => {
    if (isEmpty(contact)) {
      return {};
    }

    switch (contactInfoType) {
      case this.type.Address:
        return {
          displayText: contact.address?.fullName,
          id: contact.id,
          version: contact.version,
        };
      case this.type.MobilePhone:
        return {
          displayText: contact.mobilePhone,
          id: contact.id,
          version: contact.version,
        };
      case this.type.FixedPhone:
        return {
          displayText: contact.fixedPhone,
          id: contact.id,
          version: contact.version,
        };
      case this.type.Email:
        return {
          displayText: contact.emailAddress?.address,
          id: contact.emailAddress?.id,
          version: contact.emailAddress?.$version,
        };
      case this.type.WebSite:
        return {
          displayText: contact.webSite,
          id: contact.id,
          version: contact.version,
        };
      default:
        return {};
    }
  };
}

export default ContactInfoType;
