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

import {ObjectFields, schemaContructor} from '@axelor/aos-mobile-core';

export const intervention_modelAPI: ObjectFields = {
  intervention_intervention: schemaContructor.object({
    statusSelect: schemaContructor.number(),
    deliveredPartner: schemaContructor.subObject().concat(
      schemaContructor.object({
        fullName: schemaContructor.string(),
        picture: schemaContructor.subObject(),
      }),
    ),
    sequence: schemaContructor.string(),
    planifStartDateTime: schemaContructor.string(),
    startDateTime: schemaContructor.string(),
    totalDuration: schemaContructor.number(),
    lastStartDateTime: schemaContructor.string(),
    interventionType: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
      }),
    ),
    address: schemaContructor.subObject().concat(
      schemaContructor.object({
        fullName: schemaContructor.string(),
      }),
    ),
    assignedTo: schemaContructor.subObject(),
    contact: schemaContructor.subObject().concat(
      schemaContructor.object({
        mobilePhone: schemaContructor.string(),
        fixedPhone: schemaContructor.string(),
        emailAddress: schemaContructor.subObject('address'),
      }),
    ),
    customerRequest: schemaContructor.subObject().concat(
      schemaContructor.object({
        maxGitDateTime: schemaContructor.string(),
        maxGrtDateTime: schemaContructor.string(),
        realGit: schemaContructor.number(),
        realGrt: schemaContructor.number(),
        onCallManagement: schemaContructor.boolean(),
      }),
    ),
    description: schemaContructor.string(),
    contract: schemaContructor.subObject().concat(
      schemaContructor.object({
        guaranteedInterventionTime: schemaContructor.number(),
        guaranteedRecoveryTime: schemaContructor.number(),
      }),
    ),
  }),
  intervention_equipment: schemaContructor.object({
    sequence: schemaContructor.string(),
    name: schemaContructor.string(),
    code: schemaContructor.string(),
    inService: schemaContructor.boolean(),
    equipmentFamily: schemaContructor.subObject(),
  }),
  intervention_partner: schemaContructor.object({
    simpleFullName: schemaContructor.string(),
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
    partnerSeq: schemaContructor.string(),
    user: schemaContructor.subObject('fullName'),
  }),
  intervention_question: schemaContructor.object({
    interventionRange: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
        equipment: schemaContructor.subObject('name'),
        rangeVal: schemaContructor.subObject('title'),
      }),
    ),
    title: schemaContructor.string(),
    isAnswered: schemaContructor.boolean(),
    isConditional: schemaContructor.boolean(),
    conditionalAnswerValueSet: schemaContructor.subObject(),
    conditionalInterventionQuestion: schemaContructor.subObject(),
    isRequired: schemaContructor.boolean(),
    indicationText: schemaContructor.string(),
    isPrivate: schemaContructor.boolean(),
    listAnswer: schemaContructor.subObject(),
  }),
  intervention_range: schemaContructor.object({
    equipment: schemaContructor.subObject('name'),
    rangeVal: schemaContructor.subObject('title'),
  }),
};
