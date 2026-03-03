/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useNavigation, useSelector} from '@axelor/aos-mobile-core';
import {LeadsCard} from '../../../molecules';
import {fetchLeadById, fetchLeadStatus} from '../../../../features/leadSlice';

const EventLeadCard = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {event} = useSelector(state => state.event);
  const {lead, leadStatusList} = useSelector(state => state.lead);

  useEffect(() => {
    if (event.eventLead) {
      dispatch(fetchLeadById({leadId: event.eventLead.id}));
      dispatch(fetchLeadStatus());
    }
  }, [dispatch, event.eventLead]);

  const handleCardPress = useCallback(() => {
    navigation.navigate('LeadDetailsScreen', {idLead: lead.id});
  }, [lead, navigation]);

  if (!event.eventLead) {
    return null;
  }

  return (
    <LeadsCard
      style={styles.item}
      leadsFullname={lead.simpleFullName}
      leadsCompany={lead.enterpriseName}
      leadsAddress={lead.address?.fullName}
      leadsFixedPhone={lead.fixedPhone}
      leadsPhoneNumber={lead.mobilePhone}
      leadsEmail={lead.emailAddress?.address}
      leadScoring={lead.leadScoringSelect}
      leadVersion={lead.version}
      leadsId={lead.id}
      leadsStatus={lead.leadStatus}
      allLeadStatus={leadStatusList}
      isDoNotSendEmail={lead.isDoNotSendEmail}
      isDoNotCall={lead.isDoNotCall}
      onPress={handleCardPress}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default EventLeadCard;
