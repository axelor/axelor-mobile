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

class File {
  static getFileExtension = filename => {
    if (filename == null) {
      return filename;
    }
    return filename.split('.').pop();
  };

  static getFileIcon = filename => {
    switch (this.getFileExtension(filename)) {
      case 'pdf':
        return 'file-pdf';
      case 'jpeg':
      case 'jpg':
      case 'svg':
      case 'png':
        return 'file-image';
      case 'csv':
        return 'file-csv';
      case 'zip':
        return 'file-archive';
      case 'docx':
      case 'doc':
      case 'odt':
      case 'txt':
        return 'file-word';
      case 'potx':
      case 'pptx':
      case 'ppt':
      case 'odp':
        return 'file-powerpoint';
      case 'ods':
      case 'xls':
      case 'xlsx':
      case 'xltm':
        return 'file-excel';
      case 'mp4':
      case 'mp3':
        return 'file-audio';
      default:
        return 'file';
    }
  };
}

export default File;
