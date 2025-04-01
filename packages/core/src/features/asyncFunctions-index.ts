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

export {fetchRequiredConfig} from './appConfigSlice';
export {getAttachedFilesDetails} from './attachedFilesSlice';
export {
  clearError,
  isUrlValid,
  login,
  logout,
  setAppVersion,
  updateAuthState,
} from './authSlice';
export {
  clearBarcode,
  disableCameraScanner,
  enableCameraScanner,
  scanBarcode,
  useCameraScannerSelector,
  useCameraScannerValueByKey,
} from './cameraScannerSlice';
export {
  clearPhoto,
  disableCamera,
  enableCamera,
  takePhoto,
  useCameraSelector,
  useCameraValueByKey,
} from './cameraSlice';
export {getFileDetails} from './metafileSlice';
export {fetchMetaModules} from './metaModuleSlice';
export {
  enable as enableOnline,
  disable as disableOnline,
  useEffectOnline,
  useOnline,
} from './onlineSlice';
export {
  fetchAllMetaPermissionRules,
  fetchAllPermissions,
} from './permissionSlice';
export {searchPrintingTemplate} from './printTemplateSlice';
export {
  clearScan,
  disableScan,
  enableScan,
  scanValue,
  useScannedValueByKey,
  useScannerSelector,
} from './scannerSlice';
export {searchUser} from './userSlice';
