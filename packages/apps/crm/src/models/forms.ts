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

import {FormConfigs} from '@axelor/aos-mobile-core';
import {CatalogTypePicker} from '../components';

export const crm_formsRegister: FormConfigs = {
  crm_catalog: {
    modelName: 'com.axelor.apps.crm.db.Catalog',
    fields: {
      name: {
        titleKey: 'Crm_Name',
        type: 'string',
        required: true,
      },
      catalogType: {
        titleKey: 'Crm_Catalog_Type',
        type: 'object',
        widget: 'custom',
        required: true,
        customComponent: CatalogTypePicker,
      },
      description: {
        titleKey: 'Crm_Description',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
        },
      },
      image: {
        titleKey: 'Crm_Image',
        type: 'string',
        widget: 'file',
        options: {
          documentTypesAllowed: 'images',
          returnBase64String: true,
          displayPreview: true,
        },
      },
      pdfFile: {
        titleKey: 'Crm_PdfFile',
        type: 'object',
        required: true,
        widget: 'file',
        options: {
          documentTypesAllowed: 'pdf',
        },
      },
    },
  },
  crm_client: {
    modelName: 'com.axelor.apps.base.db.Partner',
    fields: {
      name: {
        titleKey: 'Crm_Name',
        type: 'string',
        widget: 'default',
      },
      fixedPhone: {
        titleKey: 'Crm_Phone',
        type: 'phone',
        widget: 'default',
      },
      email: {
        titleKey: 'Crm_Email',
        type: 'email',
        widget: 'default',
      },
      webSite: {
        titleKey: 'Crm_WebSite',
        type: 'url',
        widget: 'default',
      },
      description: {
        titleKey: 'Crm_Notes',
        type: 'string',
        widget: 'HTML',
      },
    },
  },
};
