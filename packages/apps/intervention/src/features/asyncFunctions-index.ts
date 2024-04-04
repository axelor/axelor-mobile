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
  fetchNumberClientEquipment,
  fetchNumberInterventionEquipment,
  getEquipmentById,
  searchEquipment,
  searchInterventionEquipment,
  searchPlaceEquipment,
  updateEquipment,
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
  fetchIntervention,
  fetchInterventionById,
  searchHistoryInterventionByEquipment,
} from './interventionSlice';
export {
  fetchQuestion,
  fetchQuestionById,
  fetchRange,
  updateQuestion,
} from './questionSlice';
