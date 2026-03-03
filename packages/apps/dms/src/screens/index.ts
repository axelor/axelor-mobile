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

import AllDocumentsScreen from './AllDocumentsScreen';
import MyFavoriteDocumentsScreen from './MyFavoriteDocumentsScreen';
import DocumentFormScreen from './DocumentFormScreen';
import AttachedFilesScreen from './AttachedFilesScreen';

export default {
  AllDocumentsScreen: {
    title: 'Dms_AllDocuments',
    component: AllDocumentsScreen,
    actionID: 'dms_all_documents',
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  FavoriteDocuments: {
    title: 'Dms_MyFavoriteDocuments',
    component: MyFavoriteDocumentsScreen,
    options: {
      shadedHeader: false,
    },
  },
  DocumentFormScreen: {
    title: 'Dms_Document',
    component: DocumentFormScreen,
    isUsableOnShortcut: true,
  },
  AttachedFilesScreen: {
    title: 'Dms_AttachedFiles',
    actionID: 'dms_attachedFiles_tree',
    component: AttachedFilesScreen,
    options: {
      shadedHeader: false,
    },
  },
};

export {AllDocumentsScreen};
export {MyFavoriteDocumentsScreen};
export {DocumentFormScreen};
export {AttachedFilesScreen};
