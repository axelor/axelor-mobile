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

export const helpdesk_modelAPI: ObjectFields = {
  helpdesk_ticket: schemaContructor.object({
    ticketSeq: schemaContructor.string(),
    subject: schemaContructor.string(),
    progressSelect: schemaContructor.number(),
    duration: schemaContructor.number(),
    deadlineDateT: schemaContructor.string(),
    responsibleUser: schemaContructor.subObject(),
    assignedToUser: schemaContructor.subObject(),
    ticketStatus: schemaContructor.subObject('name'),
    ticketType: schemaContructor.subObject(),
    prioritySelect: schemaContructor.number(),
    description: schemaContructor.string(),
    project: schemaContructor.subObject(),
    customerPartner: schemaContructor.subObject(),
    contactPartner: schemaContructor.subObject(),
    startDateT: schemaContructor.string(),
    endDateT: schemaContructor.string(),
    timerList: schemaContructor.array().of(schemaContructor.subObject()),
  }),
  helpdesk_ticketType: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  helpdesk_ticketStatus: schemaContructor.object({
    name: schemaContructor.string(),
  }),
  helpdesk_timerHistory: schemaContructor.object({
    startDateT: schemaContructor.string(),
    endDateT: schemaContructor.string(),
  }),
  helpdesk_customer: schemaContructor.object({
    simpleFullName: schemaContructor.string(),
    name: schemaContructor.string(),
    fullName: schemaContructor.string(),
    contactPartnerSet: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
  }),
  helpdesk_customerContact: schemaContructor.object({
    simpleFullName: schemaContructor.string(),
    name: schemaContructor.string(),
    fullName: schemaContructor.string(),
    contactPartnerSet: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
  }),
  helpdesk_project: schemaContructor.object({
    fullName: schemaContructor.string(),
    name: schemaContructor.string(),
    clientPartner: schemaContructor.subObject(),
    contactPartner: schemaContructor.subObject(),
  }),
};
