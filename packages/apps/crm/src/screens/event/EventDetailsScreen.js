import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchEventById} from '../../features/eventSlice';
import {fetchLeadById, fetchLeadStatus} from '../../features/leadSlice';
import {fetchPartner} from '../../features/partnerSlice';
import {getContact} from '../../features/contactSlice';
import {EventBody, EventHeader} from '../../components';

function EventDetailsScreen({navigation, route}) {
  const eventId = route.params.eventId;
  const dispatch = useDispatch();

  const {event} = useSelector(state => state.event);

  useEffect(() => {
    dispatch(fetchEventById({eventId: eventId}));
  }, [dispatch, eventId]);

  useEffect(() => {
    event.lead && dispatch(fetchLeadById({leadId: event.lead.id}));
    event.lead && dispatch(fetchLeadStatus());
  }, [dispatch, event.lead]);

  useEffect(() => {
    event?.partner && dispatch(fetchPartner({partnerId: event?.partner?.id}));
  }, [dispatch, event?.partner]);

  useEffect(() => {
    event?.contactPartner &&
      dispatch(getContact({contactId: event?.contactPartner.id}));
  }, [dispatch, event?.contactPartner]);

  if (event?.id !== eventId) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer expandableFilter={false} fixedItems={<EventHeader />} />
      <ScrollView>
        <EventBody navigation={navigation} />
      </ScrollView>
    </Screen>
  );
}

export default EventDetailsScreen;
