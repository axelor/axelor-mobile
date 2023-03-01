import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, Text, FromTo, TitledValue} from '@axelor/aos-mobile-ui';
import {useTranslator, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchEventById} from '../../features/eventSlice';

function EventDetailsScreen({navigation, route}) {
  const eventId = route.params.eventId;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {event} = useSelector(state => state.event);

  useEffect(() => {
    dispatch(fetchEventById({eventId: eventId}));
  }, [dispatch, eventId]);

  console.log(event);

  return (
    <Screen>
      <FromTo
        fromComponent={
          <TitledValue title={I18n.t('Base_Start')} value={'startDate'} />
        }
        toComponent={
          <TitledValue title={I18n.t('Base_end')} value={'endDate'} />
        }
      />
      <Text>Test</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  toggleSwitchContainer: {
    width: '90%',
    marginLeft: '4%',
  },
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
});

export default EventDetailsScreen;
