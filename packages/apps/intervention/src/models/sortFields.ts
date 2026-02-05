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

import {SortFields} from '@axelor/aos-mobile-core';

export const intervention_sortFields: SortFields = {
  intervention_intervention: ['planifStartDateTime'],
  intervention_activeIntervention: ['-updatedOn'],
  intervention_contract: ['name'],
  intervention_equipment: ['sequence'],
  intervention_equipmentFamily: ['name'],
  intervention_equipmentLine: ['product.name'],
  intervention_question: ['interventionRange.orderSeq', 'orderSeq'],
  intervention_question_reversed: ['-interventionRange.orderSeq', '-orderSeq'],
  intervention_interventionNote: ['-createdOn'],
};
