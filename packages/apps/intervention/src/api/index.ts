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

export {searchClientAndProspect as searchClientAndProspectApi} from './client-and-prospect-api';
export {searchContract as searchContractApi} from './contract-api';
export {
  getEquipmentById as getEquipmentByIdApi,
  searchEquipment as searchEquipmentApi,
  searchPlaceEquipment as searchPlaceEquipmentApi,
  updateEquipment as updateEquipmentApi,
} from './equipment-api';
export {searchEquipmentFamily as searchEquipmentFamilyApi} from './equipment-family-api';
export {searchEquipmentLine as searchEquipmentLineApi} from './equipment-line-api';
export {
  createEquipmentPicture as createEquipmentPictureApi,
  deleteEquipmentPicture as deleteEquipmentPictureApi,
  searchEquipmentPicture as searchEquipmentPictureApi,
} from './equipment-picture-api';
export {
  fetchIntervention as fetchInterventionApi,
  fetchInterventionById as fetchInterventionByIdApi,
  searchHistoryInterventionByEquipment as searchHistoryInterventionByEquipmentApi,
} from './intervention-api';
export {
  createInterventionNote as createInterventionNoteApi,
  deleteInterventionNote as deleteInterventionNoteApi,
  fetchInterventionNote as fetchInterventionNoteApi,
  fetchInterventionNoteById as fetchInterventionNoteByIdApi,
  fetchInterventionNoteType as fetchInterventionNoteTypeApi,
  updateInterventionNote as updateInterventionNoteApi,
} from './intervention-note-api';
export {
  fetchQuestion as fetchQuestionApi,
  fetchRange as fetchRangeApi,
} from './question-api';
