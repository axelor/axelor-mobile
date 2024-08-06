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

import AttachedFilesScreen from './AttachedFilesScreen';
import BarcodeDisplayScreen from './BarcodeDisplayScreen';
import JsonFieldScreen from './JsonFieldScreen';
import MailMessageScreen from './MailMessageScreen';
import ProcessListScreen from './ProcessListScreen';

export default {
  AttachedFilesScreen: {
    title: 'Base_AttachedFiles',
    component: AttachedFilesScreen,
    actionID: 'core_attachedFiles_details',
    options: {
      shadedHeader: false,
    },
  },
  MailMessageScreen: {
    title: 'Base_MailMessages',
    component: MailMessageScreen,
    actionID: 'core_mailMessage_details',
    options: {
      shadedHeader: false,
    },
  },
  BarcodeDisplayScreen: {
    title: 'Base_Barcode',
    component: BarcodeDisplayScreen,
    actionID: 'core_barcode_details',
    options: {
      shadedHeader: true,
    },
  },
  JsonFieldScreen: {
    title: 'Base_MetaJsonFields',
    component: JsonFieldScreen,
    actionID: 'core_metaJsonFields_details',
    options: {
      shadedHeader: true,
    },
  },
  ProcessListScreen: {
    title: 'Base_Loader_ProcessList',
    component: ProcessListScreen,
    options: {
      shadedHeader: false,
    },
  },
};
