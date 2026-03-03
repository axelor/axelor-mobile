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

import React, {useCallback, useMemo} from 'react';
import {FormView, useSelector, useTypes} from '@axelor/aos-mobile-core';
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
  const tourlineData = route?.params?.tourlineData;
  const eventPlanningDate = route?.params?.eventPlanningDate;

  const {Event} = useTypes();

  const {user} = useSelector(state => state.user);

  const creationDefaultValue = useMemo(() => {
    const today = new Date();
    const baseDate = eventPlanningDate
      ? new Date(eventPlanningDate).setHours(
          today.getHours(),
          today.getMinutes(),
        )
      : today;
    const _defaultStartDate = new Date(baseDate);
    const _defaultEndDate = new Date(baseDate);
    _defaultEndDate.setHours(_defaultStartDate.getHours() + 1);

    const _default = {
      typeSelect: Event?.typeSelect.Meeting,
      statusSelect: Event?.statusSelect.Planned,
      perdiodDateTime: {
        startDateTime: _defaultStartDate,
        endDateTime: _defaultEndDate,
        isError: false,
      },
      perdiodDateTimeError: 'OK',
      user: user,
    };

    if (lead != null) {
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
  }, [
    eventPlanningDate,
    Event?.typeSelect.Meeting,
    Event?.statusSelect.Planned,
    user,
    lead,
    prospect,
    client,
    contact,
  ]);

  const defaultValue = useMemo(
    () =>
      event != null
        ? {
            ...creationDefaultValue,
            ...event,
            perdiodDateTime: {
              startDateTime: new Date(event.startDateTime),
              endDateTime: new Date(event.endDateTime),
              isError: false,
            },
          }
        : null,
    [event, creationDefaultValue],
  );

  const createEventAPI = useCallback(
    (_event, dispatch) => {
      dispatch(
        createEvent({
          event: {
            ..._event,
            startDateTime: _event.perdiodDateTime.startDateTime.toISOString(),
            endDateTime: _event.perdiodDateTime.endDateTime.toISOString(),
          },
          tourlineData: tourlineData,
          eventPlanningDate,
        }),
      );
      navigation.pop();
    },
    [eventPlanningDate, navigation, tourlineData],
  );

  const updateEventAPI = useCallback(
    (_event, dispatch) => {
      dispatch(
        updateEvent({
          event: {
            ..._event,
            startDateTime: _event.perdiodDateTime.startDateTime.toISOString(),
            endDateTime: _event.perdiodDateTime.endDateTime.toISOString(),
          },
        }),
      );
      navigation.pop();
    },
    [navigation],
  );

  return (
    <FormView
      formKey="crm_event"
      defaultValue={defaultValue}
      creationDefaultValue={creationDefaultValue}
      defaultEditMode
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
