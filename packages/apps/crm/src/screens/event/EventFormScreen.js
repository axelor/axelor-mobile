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
import {createEvent, updateEvent} from '../../features/eventSlice';

const MODELS = {
  lead: 'com.axelor.apps.crm.db.Lead',
  partner: 'com.axelor.apps.base.db.Partner',
};

const EventFormScreen = ({navigation, route}) => {
  const event = route?.params?.event;
  const lead = route?.params?.lead;
  const prospect = route?.params?.prospect;
  const client = route?.params?.client;
  const contact = route?.params?.contact;

  const {user} = useSelector(state => state.user);

  const defaultValue = useMemo(() => {
    const _defaultStartDate = new Date();
    const _defaultEndDate = new Date();

    _defaultEndDate.setHours(_defaultStartDate.getHours() + 1);

    const _default = {
      typeSelect: EventType.category.Meeting,
      statusSelect: EventType.status.Planned,
      startDateTime: _defaultStartDate.toISOString(),
      endDateTime: _defaultEndDate.toISOString(),
      user: user,
    };

    if (event != null) {
      return {
        ..._default,
        ...event,
      };
    } else if (lead != null) {
      return {
        ..._default,
        eventLead: lead,
        leadReadonly: true,
        isLead: true,
        relatedToSelect: MODELS.lead,
        relatedToSelectId: lead?.id,
      };
    } else if (prospect != null) {
      return {
        ..._default,
        partner: prospect,
        partnerReadonly: true,
        hideContactPartner: true,
        isProspect: true,
        relatedToSelect: MODELS.partner,
        relatedToSelectId: prospect?.id,
      };
    } else if (client != null) {
      return {
        ..._default,
        partner: client,
        partnerReadonly: true,
        isPartner: true,
        relatedToSelect: MODELS.partner,
        relatedToSelectId: client?.id,
      };
    } else if (contact != null) {
      return {
        ..._default,
        contactPartner: contact,
        partnerReadonly: true,
        partner: contact?.mainPartner,
        contactPartnerReadonly: true,
        isContact: true,
        relatedToSelect: MODELS.partner,
        relatedToSelectId: contact?.id,
      };
    }

    return _default;
  }, [user, event, lead, prospect, client, contact]);

  const createEventAPI = useCallback(
    (_event, dispatch) => {
      dispatch(createEvent({event: _event}));
      navigation.pop();
    },
    [navigation],
  );

  const updateEventAPI = useCallback(
    (_event, dispatch) => {
      dispatch(updateEvent({event: _event}));
      navigation.pop();
    },
    [navigation],
  );

  return (
    <FormView
      defaultValue={defaultValue}
      formKey="crm_event"
      actions={[
        {
          key: 'create-event',
          type: 'create',
          needRequiredFields: true,
          needValidation: true,
          hideIf: () => event != null,
          customAction: ({dispatch, objectState}) => {
            createEventAPI(objectState, dispatch);
          },
        },
        {
          key: 'update-event',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          hideIf: () => event == null,
          customAction: ({dispatch, objectState}) => {
            updateEventAPI(objectState, dispatch);
          },
        },
      ]}
    />
  );
};

export default EventFormScreen;
