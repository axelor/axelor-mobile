import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Screen,
  Text,
  FromTo,
  TitledValue,
  HeaderContainer,
  Badge,
  useThemeColor,
  LabelText,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchEventById} from '../../features/eventSlice';
import EventType from '../../types/event-type';

function EventDetailsScreen({navigation, route}) {
  const eventId = route.params.eventId;
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {event} = useSelector(state => state.event);

  useEffect(() => {
    dispatch(fetchEventById({eventId: eventId}));
  }, [dispatch, eventId]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <View style={styles.headerContainer}>
            <View style={styles.halfContainer}>
              <Text style={styles.bold} numberOfLines={2}>
                {event.subject}
              </Text>
            </View>
            <View style={styles.halfContainer}>
              {event.statusSelect && (
                <Badge title={EventType.getStatus(event.statusSelect, I18n)} />
              )}
              {event.typeSelect && (
                <Badge
                  title={EventType.getCategory(event.typeSelect, I18n)}
                  color={Colors.plannedColor}
                />
              )}
            </View>
          </View>
        }
      />
      <FromTo
        fromComponent={
          <TitledValue
            title={I18n.t('Crm_Start')}
            value={event.startDateTime}
          />
        }
        toComponent={
          <TitledValue title={I18n.t('Crm_End')} value={event.endDateTime} />
        }
      />
      {event.location && (
        <LabelText iconName="map-pin" title={event.location} />
      )}
      {event.user?.fullName && (
        <Text>
          {I18n.t('Crm_AssignedTo')} : {event.user?.fullName}
        </Text>
      )}
      {event.organizer && (
        <Text>
          {I18n.t('Crm_Organisator')} : {event.organizer}
        </Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  halfContainer: {
    flexDirection: 'row',
    width: '50%',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default EventDetailsScreen;
