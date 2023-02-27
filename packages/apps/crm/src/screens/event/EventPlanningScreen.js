import React, {useCallback, useMemo, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Card,
  LabelText,
  Screen,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {PlanningView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchPlannedEvent} from '../../features/eventSlice';
import EventType from '../../types/event-type';

function EventPlanningScreen({navigation}) {
  const dispatch = useDispatch();
  const Colors = useThemeColor();
  const {eventList, loading} = useSelector(state => state.event);

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const listItem = useMemo(() => {
    return EventType.getCalendarListItems(eventList, Colors);
  }, [Colors, eventList]);

  const fetchItemsByMonth = useCallback(
    date => {
      dispatch(fetchPlannedEvent(date));
    },
    [dispatch],
  );

  const navigateToEvent = id => {
    if (id != null) {
      navigation.navigate('EventDetailsScreen', {
        eventId: id,
      });
    }
  };

  const rendBorderColor = borderColor => {
    return {
      borderLeftWidth: 7,
      borderLeftColor: borderColor,
    };
  };

  const renderDayEventDetails = ({id, data: event}) => {
    if (event == null) {
      return null;
    }
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => navigateToEvent(id)}>
        <Card
          key={id}
          style={[styles.container, rendBorderColor(event.border)]}>
          <Text style={styles.bold}>{event.subject}</Text>
          {event.contactPartner && (
            <LabelText iconName="map-pin" title={event.contactPartner} />
          )}
          {event.location && (
            <LabelText iconName="map-pin" title={event.location} />
          )}
        </Card>
      </TouchableOpacity>
    );
  };

  const renderDayEvent = ({id, data: event}) => {
    if (event == null) {
      return null;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigateToOperationOrder(id)}>
        <Card
          key={id}
          style={[styles.container, rendBorderColor(event.border)]}>
          <Text style={styles.bold}>{event.subject}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <PlanningView
        itemList={listItem}
        renderItem={renderDayEventDetails}
        renderFullDayItem={renderDayEvent}
        fetchbyMonth={fetchItemsByMonth}
        loading={loading}
      />
    </Screen>
  );
}

const getStyles = Colors =>
  StyleSheet.create({
    containerDetails: {
      alignSelf: 'center',
      width: '100%',
    },
    container: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
    },
    bold: {
      fontWeight: 'bold',
    },
  });

export default EventPlanningScreen;
