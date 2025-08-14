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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen, HeaderContainer} from '@axelor/aos-mobile-ui';
import {
  filterChip,
  PlanningView,
  useDispatch,
  useSelector,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {fetchPlannedEvent} from '../../features/eventSlice';
import {
  EventCategoryPicker,
  EventSearchBar,
  PlanningEventCard,
} from '../../components';

function EventPlanningScreen({navigation}) {
  const dispatch = useDispatch();
  const {Event} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const {eventList, loadingEventList} = useSelector(state => state.event);
  const {userId} = useSelector(state => state.auth);

  const [searchValue, setSearchValue] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [planningDate, setPlanningDate] = useState();
  const [assigned, setAssigned] = useState(true);

  const filterOnStatus = useCallback(
    list => filterChip(list, selectedTypes, 'typeSelect'),
    [selectedTypes],
  );

  const filteredList = useMemo(() => {
    if (eventList == null || eventList.length === 0) return [];

    return filterOnStatus(eventList).map(event => ({
      id: event.id,
      startDate: event.startDateTime,
      endDate: event.endDateTime,
      data: {
        id: event.id,
        subject: event.subject,
        contactPartner: event.contactPartner?.fullName,
        location: event.location,
        border: {
          borderLeftWidth: 7,
          borderLeftColor: getItemColor(Event?.typeSelect, event.typeSelect)
            ?.background,
        },
        partner: event.partner?.fullName,
        eventLead: event.eventLead?.fullName,
        partnerTypeSelect: event.partner?.partnerTypeSelect,
        userId: event.user?.id,
      },
    }));
  }, [Event?.typeSelect, eventList, filterOnStatus, getItemColor]);

  const fetchItemsByMonth = useCallback(
    ({date, isAssigned}) => {
      setPlanningDate(date?.toDateString());
      setAssigned(isAssigned);
      dispatch(
        (fetchPlannedEvent as any)({date, isAssigned, userId, searchValue}),
      );
    },
    [dispatch, searchValue, userId],
  );

  const navigateToEvent = useCallback(
    id => {
      if (id != null) {
        navigation.navigate('EventDetailsScreen', {eventId: id});
      }
    },
    [navigation],
  );

  const renderDayEventDetails = useCallback(
    ({id, data: event}) => {
      if (event == null) return null;

      return (
        <PlanningEventCard
          style={event.border}
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
    },
    [navigateToEvent],
  );

  const renderDayEvent = useCallback(
    ({id, data: event}) => {
      if (event == null) return null;

      return (
        <PlanningEventCard
          style={event.border}
          onPress={() => navigateToEvent(event.id)}
          id={id}
          subject={event.subject}
        />
      );
    },
    [navigateToEvent],
  );

  const fetchData = useMemo(
    () => ({date: planningDate, isAssigned: assigned, userId}),
    [assigned, planningDate, userId],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <EventCategoryPicker onChange={setSelectedTypes} />
            <EventSearchBar
              onChange={setSearchValue}
              showDetailsPopup={false}
              oneFilter={true}
              fetchData={fetchData}
            />
          </View>
        }
      />
      <PlanningView
        loading={loadingEventList}
        itemList={filteredList}
        renderItem={renderDayEventDetails}
        renderFullDayItem={renderDayEvent}
        fetchbyMonth={fetchItemsByMonth}
        manageAssignment
        computeAssignmentLocally={false}
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
