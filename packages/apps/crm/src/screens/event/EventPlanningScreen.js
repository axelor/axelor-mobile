/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Screen,
  useThemeColor,
  HeaderContainer,
  ToggleSwitch,
  MultiValuePicker,
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
import {EventSearchBar, PlanningEventCard} from '../../components';

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
  const [dateSave, setDateSave] = useState(null);

  const listItem = useMemo(() => {
    return EventType.getCalendarListItems(filteredList, Colors);
  }, [Colors, filteredList]);

  const eventCategoryList = useMemo(
    () => [
      {
        title: I18n.t('Crm_Event_Category_Event'),
        color: EventType.getCategoryColor(EventType.category.Event, Colors),
        key: EventType.category.Event,
      },
      {
        title: I18n.t('Crm_Event_Category_Call'),
        color: EventType.getCategoryColor(EventType.category.Call, Colors),
        key: EventType.category.Call,
      },
      {
        title: I18n.t('Crm_Event_Category_Meeting'),
        color: EventType.getCategoryColor(EventType.category.Meeting, Colors),
        key: EventType.category.Meeting,
      },
      {
        title: I18n.t('Crm_Event_Category_Task'),
        color: EventType.getCategoryColor(EventType.category.Task, Colors),
        key: EventType.category.Task,
      },
      {
        title: I18n.t('Crm_Event_Category_Leave'),
        color: EventType.getCategoryColor(EventType.category.Leave, Colors),
        key: EventType.category.Leave,
      },
      {
        title: I18n.t('Crm_Event_Category_Note'),
        color: EventType.getCategoryColor(EventType.category.Note, Colors),
        key: EventType.category.Note,
      },
    ],
    [I18n, Colors],
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
      if (!Array.isArray(list) || list.length === 0) {
        return [];
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
        partner={event.partner}
        eventLead={event.eventLead}
        partnerTypeSelect={event.partnerTypeSelect}
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
          <View style={styles.headerContainer}>
            <MultiValuePicker
              listItems={eventCategoryList}
              title={I18n.t('Base_Status')}
              onValueChange={statusList => setSelectedStatus(statusList)}
            />
            <EventSearchBar
              onChange={setFilter}
              showDetailsPopup={false}
              oneFilter={true}
            />
            <ToggleSwitch
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
  headerContainer: {
    alignItems: 'center',
  },
});

export default EventPlanningScreen;
