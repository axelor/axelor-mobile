/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React from 'react';
import {FormView} from '@axelor/aos-mobile-core';
const EventFormScreen = ({navigation, route}) => {
  return (
    <FormView
      formKey="crm_event"
      actions={[
        {
          key: 'create-lead',
          type: 'create',
          needRequiredFields: true,
          needValidation: true,
          //hideIf: () => idEvent != null,
          customAction: ({dispatch, objectState}) => {},
          //createEventAPI(objectState, dispatch),
        },
        {
          key: 'update-lead',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          //hideIf: () => idEvent == null,
          customAction: ({dispatch, objectState}) => {},
          //updateEventAPI(objectState, dispatch),
        },
      ]}
    />
  );
};

export default EventFormScreen;
