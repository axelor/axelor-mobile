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
}

export default File;
