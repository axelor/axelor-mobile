import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {
  Screen,
  useThemeColor,
  HeaderContainer,
  ChipSelect,
  AutoCompleteSearch,
  ToggleSwitch,
  getCommonStyles,
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
import {PlanningEventCard} from '../../components';

function EventPlanningScreen({navigation}) {
  const dispatch = useDispatch();
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {eventList, loading} = useSelector(state => state.event);
  const {userId} = useSelector(state => state.auth);

  const [filteredList, setFilteredList] = useState(eventList);
  const [filter, setFilter] = useState(null);
  const [assigned, setAssigned] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [plannedEvent, setPlannedEvent] = useState(null);
  const [dateSave, setDateSave] = useState(null);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const listItem = useMemo(() => {
    return EventType.getCalendarListItems(filteredList, Colors);
  }, [Colors, filteredList]);

  const fetchEventFilter = useCallback(
    searchValue => {
      setFilter(searchValue === '' ? null : searchValue);
      dispatch(
        fetchPlannedEvent({
          date: dateSave,
          searchValue: searchValue === '' ? null : searchValue,
        }),
      );
    },
    [dispatch, dateSave],
  );

  const fetchItemsByMonth = useCallback(
    date => {
      dateSave === null && setDateSave(date);
      dispatch(fetchPlannedEvent({date: date, searchValue: filter}));
    },
    [dispatch, dateSave, filter],
  );

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'typeSelect');
    },
    [selectedStatus],
  );

  const filterOnUserAssigned = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (assigned) {
          return list?.filter(item => item?.user?.id === userId);
        } else {
          return list;
        }
      }
    },
    [assigned, userId],
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
      <PlanningEventCard
        style={rendBorderColor(event.border)}
        onPress={() => navigateToEvent(event.id)}
        id={id}
        subject={event.subject}
        contactPartner={event.contactPartner}
        location={event.location}
      />
    );
  };

  const renderDayEvent = ({id, data: event}) => {
    if (event == null) {
      return null;
    }

    return (
      <PlanningEventCard
        style={rendBorderColor(event.border)}
        onPress={() => navigateToEvent(event.id)}
        id={id}
        subject={event.subject}
      />
    );
  };

  useEffect(() => {
    setFilteredList(filterOnUserAssigned(filterOnStatus(eventList)));
  }, [filterOnUserAssigned, filterOnStatus, eventList]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View>
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
            <AutoCompleteSearch
              objectList={eventList}
              value={plannedEvent}
              onChangeValue={setPlannedEvent}
              fetchData={fetchEventFilter}
              placeholder={I18n.t('Crm_Clients')}
              oneFilter={true}
              selectLastItem={false}
            />
            <ToggleSwitch
              styleContainer={[
                commonStyles.filter,
                commonStyles.filterSize,
                styles.toggleSwitchContainer,
              ]}
              styleToogle={styles.toggle}
              leftTitle={I18n.t('Crm_All')}
              rightTitle={I18n.t('Crm_AssignedToMe')}
              onSwitch={() => setAssigned(!assigned)}
            />
          </View>
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

export default EventPlanningScreen;
