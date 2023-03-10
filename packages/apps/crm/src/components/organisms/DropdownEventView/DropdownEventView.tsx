import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {EventCard} from '../../molecules';
import {Text} from '@axelor/aos-mobile-ui';
import {getLastEvent, getNextEvent} from '../../../utils/dateEvent';

type Event = {
  id: number;
  startDateTime: string;
  endDateTime: string;
  statusSelect: number;
  typeSelect: number;
  subject: string;
};

interface DropdownEventViewProps {
  eventList: Event[];
  navigation: any;
}

const DropdownEventView = ({eventList, navigation}: DropdownEventViewProps) => {
  const I18n = useTranslator();

  const lastEvent = useMemo(() => {
    return getLastEvent(eventList);
  }, [eventList]);

  const nextEvent = useMemo(() => {
    return getNextEvent(eventList);
  }, [eventList]);

  if (lastEvent == null && nextEvent == null) {
    return (
      <View>
        <Text>{I18n.t('Crm_NoEventPlanned')}</Text>
      </View>
    );
  }

  return (
    <View>
      {lastEvent && (
        <View>
          <Text>{I18n.t('Crm_LastEvent')}</Text>
          <EventCard
            style={styles.eventCard}
            startDate={new Date(lastEvent?.startDateTime)}
            endDate={new Date(lastEvent?.endDateTime)}
            status={lastEvent?.statusSelect}
            category={lastEvent?.typeSelect}
            eventName={lastEvent?.subject}
            onPress={() =>
              navigation.navigate('EventDetailsScreen', {
                eventId: lastEvent.id,
              })
            }
          />
        </View>
      )}
      {nextEvent && (
        <View>
          <Text>{I18n.t('Crm_NextEvent')}</Text>
          <EventCard
            style={styles.eventCard}
            startDate={new Date(nextEvent?.startDateTime)}
            endDate={new Date(nextEvent?.endDateTime)}
            status={nextEvent?.statusSelect}
            category={nextEvent?.typeSelect}
            eventName={nextEvent?.subject}
            onPress={() =>
              navigation.navigate('EventDetailsScreen', {
                eventId: nextEvent.id,
              })
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    marginVertical: 7,
    width: '100%',
  },
});

export default DropdownEventView;
