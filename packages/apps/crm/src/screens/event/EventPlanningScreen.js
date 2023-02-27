import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {
  Card,
  LabelText,
  Screen,
  Text,
  useThemeColor,
  HeaderContainer,
  ChipSelect,
} from '@axelor/aos-mobile-ui';
import {
  PlanningView,
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {fetchPlannedEvent} from '../../features/eventSlice';
import EventType from '../../types/event-type';

function EventPlanningScreen({navigation}) {
  const dispatch = useDispatch();
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {eventList, loading} = useSelector(state => state.event);
  const [filteredList, setFilteredList] = useState(eventList);
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    setFilteredList(filterOnStatus(eventList));
  }, [filterOnStatus, eventList]);

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'typeSelect');
    },
    [selectedStatus],
  );

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const listItem = useMemo(() => {
    return EventType.getCalendarListItems(filteredList, Colors);
  }, [Colors, filteredList]);

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
      <TouchableOpacity activeOpacity={0.9} onPress={() => navigateToEvent(id)}>
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
      <HeaderContainer
        chipComponent={
          <ChipSelect
            mode="multi"
            marginHorizontal={3}
            width={Dimensions.get('window').width * 0.3}
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Crm_Event_Category_Event'),
                color: EventType.getCategoryColor(
                  EventType.category.Event,
                  Colors,
                ),
                key: EventType.category.Event,
              },
              {
                title: I18n.t('Crm_Event_Category_Call'),
                color: EventType.getCategoryColor(
                  EventType.category.Call,
                  Colors,
                ),
                key: EventType.category.Call,
              },
              {
                title: I18n.t('Crm_Event_Category_Meeting'),
                color: EventType.getCategoryColor(
                  EventType.category.Meeting,
                  Colors,
                ),
                key: EventType.category.Meeting,
              },
              {
                title: I18n.t('Crm_Event_Category_Task'),
                color: EventType.getCategoryColor(
                  EventType.category.Task,
                  Colors,
                ),
                key: EventType.category.Task,
              },
              {
                title: I18n.t('Crm_Event_Category_Leave'),
                color: EventType.getCategoryColor(
                  EventType.category.Leave,
                  Colors,
                ),
                key: EventType.category.Leave,
              },
              {
                title: I18n.t('Crm_Event_Category_Note'),
                color: EventType.getCategoryColor(
                  EventType.category.Note,
                  Colors,
                ),
                key: EventType.category.Note,
              },
            ]}
          />
        }
      />
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
