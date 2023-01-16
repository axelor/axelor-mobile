import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {EventCard} from '../../molecules';
import {Text} from '@axelor/aos-mobile-ui';

type Event = {
  startDateTime: string;
  endDateTime: string;
  statusSelect: number;
  typeSelect: number;
  subject: string;
};

interface DropdownEventViewProps {
  lastEvent: Event;
  nextEvent: Event;
}

const DropdownEventView = ({lastEvent, nextEvent}: DropdownEventViewProps) => {
  const I18n = useTranslator();

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
            onPress={() => {}}
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
            onPress={() => {}}
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
