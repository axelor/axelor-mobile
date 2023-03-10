import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer, NotesCard} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchEventById} from '../../features/eventSlice';
import {
  EventContactCard,
  EventDatesCard,
  EventHeader,
  EventLabelsCard,
  EventLeadCard,
  EventPartnerCard,
} from '../../components';

function EventDetailsScreen({navigation, route}) {
  const eventId = route.params.eventId;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {event} = useSelector(state => state.event);

  useEffect(() => {
    dispatch(fetchEventById({eventId: eventId}));
  }, [dispatch, eventId]);

  if (event?.id !== eventId) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer expandableFilter={false} fixedItems={<EventHeader />} />
      <ScrollView>
        <EventDatesCard />
        <EventLabelsCard />
        <EventLeadCard navigation={navigation} />
        <EventPartnerCard navigation={navigation} />
        <EventContactCard navigation={navigation} />
        <NotesCard title={I18n.t('Crm_Description')} data={event.description} />
      </ScrollView>
    </Screen>
  );
}

export default EventDetailsScreen;
