/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import {FormConfigs} from '@axelor/aos-mobile-core';
import {CrmModule} from '@axelor/aos-mobile-crm';

const crm_partner = CrmModule.models.formsRegister.crm_partner;

export const sale_formsRegister: FormConfigs = {
  sale_client: {
    modelName: 'com.axelor.apps.base.db.Partner',
    fields: {
      ...crm_partner.fields,
      isProspect: {
        titleKey: 'Crm_Prospect',
        type: 'boolean',
        widget: 'checkbox',
        hideIf: () => true,
      },
      isCustomer: {
        titleKey: 'Crm_Client',
        type: 'boolean',
        widget: 'checkbox',
        hideIf: () => true,
      },
    },
  },
};
