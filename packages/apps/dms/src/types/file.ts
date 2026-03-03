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

import {ThemeColors} from '@axelor/aos-mobile-ui';

class File {
  static fileExtensions = [
    'pdf',
    'jpeg',
    'jpg',
    'svg',
    'png',
    'csv',
    'zip',
    'docx',
    'doc',
    'odt',
    'txt',
    'potx',
    'pptx',
    'ppt',
    'odp',
    'ods',
    'xls',
    'xlsx',
    'xltm',
    'mp4',
    'mp3',
  ];

  static getFileExtension = (fileName: string) => {
    if (fileName == null) {
      return fileName;
    }
    return fileName.split('.').pop();
  };

  static getFileIcon = (fileName: string) => {
    switch (this.getFileExtension(fileName)) {
      case 'pdf':
        return 'file-earmark-pdf-fill';
      case 'jpeg':
      case 'jpg':
      case 'svg':
      case 'png':
        return 'file-earmark-image-fill';
      case 'csv':
        return 'filetype-csv';
      case 'zip':
        return 'file-earmark-zip-fill';
      case 'docx':
      case 'doc':
      case 'odt':
      case 'txt':
        return 'file-earmark-word-fill';
      case 'potx':
      case 'pptx':
      case 'ppt':
      case 'odp':
        return 'file-earmark-ppt-fill';
      case 'ods':
      case 'xls':
      case 'xlsx':
      case 'xltm':
        return 'file-earmark-spreadsheet-fill';
      case 'mp4':
      case 'mp3':
        return 'file-earmark-music-fill';
      default:
        return 'file-earmark-fill';
    }
  };

  static getFileColor = (fileName: string, Colors: ThemeColors) => {
    switch (this.getFileExtension(fileName)) {
      case 'pdf':
        return Colors.errorColor;
      case 'jpeg':
      case 'jpg':
      case 'svg':
      case 'png':
        return Colors.plannedColor;
      case 'csv':
        return Colors.successColor;
      case 'zip':
        return Colors.progressColor;
      case 'docx':
      case 'doc':
      case 'odt':
      case 'txt':
        return Colors.infoColor;
      case 'potx':
      case 'pptx':
      case 'ppt':
      case 'odp':
        return Colors.warningColor;
      case 'ods':
      case 'xls':
      case 'xlsx':
      case 'xltm':
        return Colors.successColor;
      case 'mp4':
      case 'mp3':
        return Colors.priorityColor;
      default:
        return Colors.primaryColor;
    }
  };

  static getFileExtensionList = (Colors: ThemeColors) => {
    return this.fileExtensions.map(extension => ({
      title: extension.toUpperCase(),
      color: this.getFileColor(extension, Colors),
      key: extension,
    }));
  };
}

export default File;
