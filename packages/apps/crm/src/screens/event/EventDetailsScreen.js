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

import React, {useCallback, useEffect} from 'react';
import {
  Screen,
  HeaderContainer,
  NotesCard,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchEventById} from '../../features/eventSlice';
import {
  EventBottom,
  EventContactCard,
  EventDatesCard,
  EventHeader,
  EventLabelsCard,
  EventLeadCard,
  EventPartnerCard,
} from '../../components';

function EventDetailsScreen({route}) {
  const {eventId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingEvent, event} = useSelector(state => state.event);

  const fetchEvent = useCallback(() => {
    dispatch(fetchEventById({eventId: eventId}));
  }, [dispatch, eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  if (event?.id !== eventId) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer expandableFilter={false} fixedItems={<EventHeader />} />
      <ScrollView refresh={{loading: loadingEvent, fetcher: fetchEvent}}>
        <EventDatesCard />
        <EventLabelsCard />
        <EventLeadCard />
        <EventPartnerCard />
        <EventContactCard />
        <NotesCard title={I18n.t('Crm_Description')} data={event.description} />
        <EventBottom event={event} />
      </ScrollView>
    </Screen>
  );
}

export default EventDetailsScreen;
