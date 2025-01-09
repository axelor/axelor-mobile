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
import {Screen, HeaderContainer, MultiValuePicker} from '@axelor/aos-mobile-ui';
import {
  filterChip,
  PlanningView,
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {fetchPlannedEvent} from '../../features/eventSlice';
import {EventSearchBar, PlanningEventCard} from '../../components';

function EventPlanningScreen({navigation}) {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const {Event} = useTypes();
  const {getItemColor, getSelectionItems} = useTypeHelpers();

  const {eventList, loading} = useSelector(state => state.event);

  const [filteredList, setFilteredList] = useState(eventList);
  const [filter, setFilter] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [dateSave, setDateSave] = useState(null);

  const listItem = useMemo(() => {
    if (filteredList == null || filteredList.length === 0) {
      return [];
    }

    return filteredList.map(event => {
      return {
        id: event.id,
        startDate: event.startDateTime,
        endDate: event.endDateTime,
        data: {
          id: event.id,
          subject: event.subject,
          contactPartner: event.contactPartner?.fullName,
          location: event.location,
          border: getItemColor(Event?.typeSelect, event.typeSelect)?.background,
          partner: event.partner?.fullName,
          eventLead: event.eventLead?.fullName,
          partnerTypeSelect: event.partner?.partnerTypeSelect,
          userId: event.user?.id,
        },
      };
    });
  }, [Event?.typeSelect, filteredList, getItemColor]);

  const eventCategoryList = useMemo(
    () => getSelectionItems(Event?.typeSelect),
    [getSelectionItems, Event?.typeSelect],
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
    setFilteredList(filterOnStatus(eventList));
  }, [filterOnStatus, eventList]);

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
          </View>
        }
      />
      <PlanningView
        itemList={listItem}
        manageAssignment={true}
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
