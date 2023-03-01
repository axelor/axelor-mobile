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
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useDispatch,
  useSelector,
  formatDateTime,
} from '@axelor/aos-mobile-core';
import {fetchEventById} from '../../features/eventSlice';
import {fetchLeadById, fetchLeadStatus} from '../../features/leadSlice';
import {fetchPartner} from '../../features/partnerSlice';
import {getContact} from '../../features/contactSlice';
import EventType from '../../types/event-type';
import {LeadsCard, LiteContactCard, PartnerCard} from '../../components';

function EventDetailsScreen({navigation, route}) {
  const eventId = route.params.eventId;
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {event} = useSelector(state => state.event);
  const {lead, leadStatusList} = useSelector(state => state.lead);
  const {partner} = useSelector(state => state.partner);
  const {contact} = useSelector(state => state.contact);

  useEffect(() => {
    dispatch(fetchEventById({eventId: eventId}));
  }, [dispatch, eventId]);

  useEffect(() => {
    event.lead && dispatch(fetchLeadById({leadId: event.lead.id}));
    event.lead && dispatch(fetchLeadStatus());
  }, [dispatch, event.lead]);

  useEffect(() => {
    event?.partner && dispatch(fetchPartner({partnerId: event?.partner?.id}));
  }, [dispatch, event?.partner]);

  useEffect(() => {
    event?.contactPartner &&
      dispatch(getContact({contactId: event?.contactPartner.id}));
  }, [dispatch, event?.contactPartner]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
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
              value={formatDateTime(
                event.startDateTime,
                I18n.t('Base_DateTimeFormat'),
              )}
            />
          }
          toComponent={
            <TitledValue
              title={I18n.t('Crm_End')}
              value={formatDateTime(
                event.endDateTime,
                I18n.t('Base_DateTimeFormat'),
              )}
            />
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
            {I18n.t('Crm_Organisator')} : {event.organizer?.name}
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
      {event.partner &&
        partner?.isCustomer === true &&
        partner?.isProspect === false && (
          <PartnerCard
            style={styles.item}
            partnerFullName={partner.simpleFullName}
            partnerReference={partner.partnerSeq}
            partnerAdress={partner.mainAddress?.fullName}
            partnerFixedPhone={partner.fixedPhone}
            partnerEmail={partner.emailAddress?.address}
            partnerPicture={partner.picture}
            onPress={() =>
              navigation.navigate('ClientDetailsScreen', {
                idClient: partner.id,
              })
            }
          />
        )}
      {event.partner &&
        partner?.isCustomer === false &&
        partner?.isProspect === true && (
          <PartnerCard
            style={styles.item}
            partnerFullName={partner.simpleFullName}
            partnerReference={partner.partnerSeq}
            partnerScoring={partner.leadScoringSelect || 0}
            partnerAdress={partner.mainAddress?.fullName}
            partnerFixedPhone={partner.fixedPhone}
            partnerEmail={partner.emailAddress?.address}
            partnerPicture={partner.picture}
            onPress={() =>
              navigation.navigate('ProspectDetailsScreen', {
                idProspect: partner.id,
              })
            }
          />
        )}

      {event?.contactPartner && (
        <LiteContactCard
          contactFullname={contact.simpleFullName}
          fixedPhoneNumber={contact.fixedPhone}
          email={contact['emailAddress.address']}
          style={styles.item}
          onPress={() =>
            navigation.navigate('ContactDetailsScreen', {
              idContact: contact.id,
            })
          }
        />
      )}
      {event.description && (
        <NotesCard title={I18n.t('Crm_Description')} data={event.description} />
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
