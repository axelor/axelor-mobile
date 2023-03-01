import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Screen,
  Text,
  FromTo,
  TitledValue,
  HeaderContainer,
  Badge,
  useThemeColor,
  LabelText,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {fetchEventById} from '../../features/eventSlice';
import {fetchLeadById, fetchLeadStatus} from '../../features/leadSlice';
import EventType from '../../types/event-type';
import {LeadsCard} from '../../components';

function EventDetailsScreen({navigation, route}) {
  const eventId = route.params.eventId;
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {event} = useSelector(state => state.event);
  const {lead, leadStatusList} = useSelector(state => state.lead);

  useEffect(() => {
    dispatch(fetchEventById({eventId: eventId}));
  }, [dispatch, eventId]);

  useEffect(() => {
    event.lead && dispatch(fetchLeadById({leadId: event.lead.id}));
    event.lead && dispatch(fetchLeadStatus());
  }, [dispatch, event.lead]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <View style={styles.headerContainer}>
            <View style={styles.halfContainer}>
              <Text style={styles.bold} numberOfLines={2}>
                {event.subject}
              </Text>
            </View>
            <View style={styles.halfContainer}>
              {event.statusSelect && (
                <Badge title={EventType.getStatus(event.statusSelect, I18n)} />
              )}
              {event.typeSelect && (
                <Badge
                  title={EventType.getCategory(event.typeSelect, I18n)}
                  color={Colors.plannedColor}
                />
              )}
            </View>
          </View>
        }
      />
      <View style={styles.contentContainer}>
        <FromTo
          style={styles.detailsContainer}
          fromComponent={
            <TitledValue
              title={I18n.t('Crm_Start')}
              value={event.startDateTime}
            />
          }
          toComponent={
            <TitledValue title={I18n.t('Crm_End')} value={event.endDateTime} />
          }
        />
        {event.location && (
          <LabelText
            style={styles.detailsContainer}
            iconName="map-pin"
            title={event.location}
          />
        )}
        {event.user?.fullName && (
          <Text style={styles.detailsContainer}>
            {I18n.t('Crm_AssignedTo')} : {event.user?.fullName}
          </Text>
        )}
        {event.organizer && (
          <Text style={styles.detailsContainer}>
            {I18n.t('Crm_Organisator')} : {event.organizer}
          </Text>
        )}
      </View>
      {event.lead && (
        <LeadsCard
          style={styles.item}
          leadsFullname={lead.simpleFullName}
          leadsCompany={lead.enterpriseName}
          leadsAddress={lead.primaryAddress}
          leadsFixedPhone={lead.fixedPhone}
          leadsPhoneNumber={lead.mobilePhone}
          leadsEmail={
            lead['emailAddress.address'] || lead.emailAddress?.address
          }
          leadScoring={lead.leadScoringSelect}
          leadVersion={lead.version}
          leadsId={lead.id}
          leadsStatus={lead.leadStatus}
          allLeadStatus={leadStatusList}
          isDoNotSendEmail={lead.isDoNotSendEmail}
          isDoNotCall={lead.isDoNotCall}
          onPress={() =>
            navigation.navigate('LeadDetailsScreen', {
              idLead: lead.id,
              versionLead: lead.version,
              colorIndex: leadStatusList?.findIndex(
                status => status.id === lead.leadStatus.id,
              ),
            })
          }
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  halfContainer: {
    flexDirection: 'row',
    width: '50%',
  },
  bold: {
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 10,
  },
  detailsContainer: {
    marginVertical: 5,
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default EventDetailsScreen;
