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

import {FormConfigs} from '@axelor/aos-mobile-core';
import {checkNullString} from '@axelor/aos-mobile-ui';
import {ParentDirectorySearchBar} from '../components';

export const dms_formsRegister: FormConfigs = {
  dms_document: {
    modelName: 'com.axelor.dms.db.DMSFile',
    fields: {
      parent: {
        titleKey: 'Dms_ParentFolder',
        type: 'object',
        widget: 'custom',
        customComponent: ParentDirectorySearchBar,
        requiredIf: ({objectState}) => !objectState.parent?.fileName,
      },
      fileName: {
        titleKey: 'Dms_Name',
        type: 'string',
        dependsOn: {
          metaFile: ({newValue, objectState}) => {
            if (checkNullString(objectState.fileName)) {
              return newValue?.fileName;
            } else {
              return objectState.fileName;
            }
          },
        },
        required: true,
      },
      isDirectory: {
        titleKey: 'Dms_Folder',
        type: 'boolean',
        widget: 'checkbox',
        hideIf: ({objectState}) => objectState.id,
        options: {
          iconSize: 20,
        },
      },
      metaFile: {
        titleKey: 'Dms_File',
        type: 'object',
        widget: 'file',
        hideIf: ({objectState}) => objectState.isDirectory,
        requiredIf: ({objectState}) => !objectState.isDirectory,
        options: {
          displayPreview: true,
        },
      },
    },
  },
};
