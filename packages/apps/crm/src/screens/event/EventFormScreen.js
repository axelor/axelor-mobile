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

import React, {useCallback, useMemo} from 'react';
import {FormView, useSelector} from '@axelor/aos-mobile-core';
import {EventType} from '../../types';

const EventFormScreen = ({navigation, route}) => {
  const event = route?.params?.event;
  const lead = route?.params?.lead;

  const {user} = useSelector(state => state.user);

  const defaultValue = useMemo(() => {
    const _defaultStartDate = new Date().toISOString();
    const _defaultEndDate = new Date(
      new Date().setHours(new Date().getHours() + 1),
    ).toISOString();
    const _default = {
      typeSelect: EventType.category.Meeting,
      statusSelect: EventType.status.Planned,
      startDateTime: _defaultStartDate,
      endDateTime: _defaultEndDate,
      user: user,
      //relatedToSelect : default to origin object (Lead or Tiers/Contact)
    };

    if (event != null) {
      return {
        ..._default,
        ...event,
      };
    }

    return _default;
  }, [event, user]);

  const createEventAPI = useCallback((_event, dispatch) => {
    console.log(_event);
  }, []);

  return (
    <FormView
      defaultValue={defaultValue}
      formKey="crm_event"
      actions={[
        {
          key: 'create-lead',
          type: 'create',
          needRequiredFields: true,
          needValidation: true,
          //hideIf: () => idEvent != null,
          customAction: ({dispatch, objectState}) => {
            createEventAPI(objectState, dispatch);
          },
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
