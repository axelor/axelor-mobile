/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

class ContactInfoType {
  static type = {
    Address: 0,
    MobilePhone: 1,
    FixedPhone: 2,
    Email: 3,
    WebSite: 4,
  };

  static getContactInfo = (
    contactInfoType: number,
    contact: any,
    isLead: boolean,
  ) => {
    switch (contactInfoType) {
      case this.type.Address:
        return {
          displayText: contact.address?.fullName,
          id: isLead ? contact.id : contact.address?.id,
          version: isLead ? contact.version : contact.address?.version,
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
        return null;
    }
  };
}

export default ContactInfoType;
