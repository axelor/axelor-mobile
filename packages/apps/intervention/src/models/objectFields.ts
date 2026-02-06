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
    equipmentSet: schemaContructor.array().of(schemaContructor.subObject()),
    updatedOn: schemaContructor.string(),
  }),
  intervention_equipment: schemaContructor.object({
    sequence: schemaContructor.string(),
    name: schemaContructor.string(),
    code: schemaContructor.string(),
    inService: schemaContructor.boolean(),
    equipmentFamily: schemaContructor.subObject(),
    parentEquipment: schemaContructor.subObject(),
    partner: schemaContructor.subObject(),
    typeSelect: schemaContructor.string(),
    commissioningDate: schemaContructor.string(),
    customerWarrantyOnPartEndDate: schemaContructor.string(),
    scheduleOfOperation: schemaContructor.string(),
    specificAccessSchedule: schemaContructor.string(),
    comments: schemaContructor.string(),
    contract: schemaContructor.subObject(),
  }),
  intervention_equipmentLine: schemaContructor.object({
    trackingNumber: schemaContructor.subObject('trackingNumberSeq'),
    product: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
        code: schemaContructor.string(),
        unit: schemaContructor.subObject(),
      }),
    ),
    comments: schemaContructor.string(),
    quantity: schemaContructor.string(),
  }),
  intervention_equipmentFamily: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  intervention_contract: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  intervention_partner: schemaContructor.object({
    simpleFullName: schemaContructor.string(),
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
    partnerSeq: schemaContructor.string(),
    user: schemaContructor.subObject('fullName'),
  }),
  intervention_question: schemaContructor.object({
    orderSeq: schemaContructor.number(),
    interventionRange: schemaContructor.subObject().concat(
      schemaContructor.object({
        name: schemaContructor.string(),
        orderSeq: schemaContructor.number(),
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
    indication: schemaContructor.string(),
    answerTypeSelect: schemaContructor.string(),
    advancedMonitoringAnswer: schemaContructor.string(),
    checkboxName: schemaContructor.string(),
    checkboxAnswer: schemaContructor.boolean(),
    dateAnswer: schemaContructor.string(),
    desiredUnit: schemaContructor.subObject(),
    measureAnswer: schemaContructor.number(),
    pictureAnswer: schemaContructor.subObject(),
    signatureAnswer: schemaContructor.subObject(),
    textAnswer: schemaContructor.string(),
    answerValueList: schemaContructor.array().of(schemaContructor.subObject()),
  }),
  intervention_range: schemaContructor.object({
    equipment: schemaContructor.subObject('name'),
    rangeVal: schemaContructor.subObject('title'),
  }),
  intervention_interventionNote: schemaContructor.object({
    type: schemaContructor.subObject('attachedFile'),
    partner: schemaContructor.subObject(),
    metaFile: schemaContructor.subObject('fileName'),
    description: schemaContructor.string(),
    createdOn: schemaContructor.string(),
    updatedOn: schemaContructor.string(),
    createdBy: schemaContructor.subObject(),
    updatedBy: schemaContructor.subObject(),
  }),
  intervention_equipmentPicture: schemaContructor.object({
    pictureFile: schemaContructor.subObject(),
  }),
  intervention_interventionNoteType: schemaContructor.object({
    name: schemaContructor.string(),
  }),
};
