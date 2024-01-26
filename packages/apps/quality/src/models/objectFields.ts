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

export const quality_modelAPI: ObjectFields = {
  quality_controlEntry: schemaContructor.object({
    inspector: schemaContructor.subObject(),
    name: schemaContructor.string(),
    controlEntrySamplesList: schemaContructor
      .array()
      .of(schemaContructor.subObject()),
    entryDateTime: schemaContructor.string(),
    statusSelect: schemaContructor.number(),
    sampleCount: schemaContructor.number(),
    controlPlan: schemaContructor.subObject(),
  }),
  quality_controlEntrySample: schemaContructor.object({
    fullName: schemaContructor.string(),
    resultSelect: schemaContructor.number(),
    entrySampleNbr: schemaContructor.number(),
  }),
  quality_controlEntrySampleLine: schemaContructor.object({
    name: schemaContructor.string(),
    resultSelect: schemaContructor.number(),
  }),
};
