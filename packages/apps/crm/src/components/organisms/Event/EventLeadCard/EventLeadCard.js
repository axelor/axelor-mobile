import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {LeadsCard} from '../../../molecules';
import {fetchLeadById, fetchLeadStatus} from '../../../../features/leadSlice';

const EventLeadCard = ({navigation}) => {
  const dispatch = useDispatch();

  const {event} = useSelector(state => state.event);
  const {lead, leadStatusList} = useSelector(state => state.lead);

  useEffect(() => {
    if (event.lead) {
      dispatch(fetchLeadById({leadId: event.lead.id}));
      dispatch(fetchLeadStatus());
    }
  }, [dispatch, event.lead]);

  const handleCardPress = useCallback(() => {
    navigation.navigate('LeadDetailsScreen', {
      idLead: lead.id,
      versionLead: lead.version,
      colorIndex: leadStatusList?.findIndex(
        status => status.id === lead.leadStatus.id,
      ),
    });
  }, [lead, leadStatusList, navigation]);

  if (!event.lead) {
    return null;
  }

  return (
    <LeadsCard
      style={styles.item}
      leadsFullname={lead.simpleFullName}
      leadsCompany={lead.enterpriseName}
      leadsAddress={lead.primaryAddress}
      leadsFixedPhone={lead.fixedPhone}
      leadsPhoneNumber={lead.mobilePhone}
      leadsEmail={lead['emailAddress.address'] || lead.emailAddress?.address}
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
