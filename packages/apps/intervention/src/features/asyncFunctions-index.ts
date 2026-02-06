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

export {searchClientAndProspect} from './clientAndProspectSlice';
export {searchContract} from './contractSlice';
export {searchEquipmentFamily} from './equipmentFamilySlice';
export {searchEquipmentLine} from './equipmentLineSlice';
export {
  createEquipmentPicture,
  deleteEquipmentPicture,
  searchEquipmentPicture,
} from './equipmentPictureSlice';
export {
  archiveEquipment,
  copyEquipment,
  deleteEquipment,
  fetchNumberClientEquipment,
  fetchNumberInterventionEquipment,
  getEquipmentById,
  saveEquipment,
  searchEquipment,
  searchEquipmentToLink,
  searchInterventionEquipment,
  searchPlaceEquipment,
} from './equipmentSlice';
export {
  createInterventionNote,
  deleteInterventionNote,
  fetchInterventionNote,
  fetchInterventionNoteById,
  fetchInterventionNoteType,
  updateInterventionNote,
} from './interventionNoteSlice';
export {
  fetchActiveIntervention,
  fetchIntervention,
  fetchInterventionById,
  linkEquipment,
  searchHistoryInterventionByEquipment,
  unlinkEquipment,
  updateInterventionStatus,
} from './interventionSlice';
export {
  fetchQuestion,
  fetchQuestionById,
  fetchRange,
  setSelectedRangeId,
  updateQuestion,
} from './questionSlice';
