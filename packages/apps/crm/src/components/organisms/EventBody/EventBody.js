import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  Text,
  FromTo,
  TitledValue,
  LabelText,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useTranslator,
  formatDateTime,
} from '@axelor/aos-mobile-core';
import {LeadsCard, LiteContactCard, PartnerCard} from '../../molecules';

const EventBody = ({navigation}) => {
  const I18n = useTranslator();
  const {event} = useSelector(state => state.event);
  const {lead, leadStatusList} = useSelector(state => state.lead);
  const {partner} = useSelector(state => state.partner);
  const {contact} = useSelector(state => state.contact);

  return (
    <>
      <View style={styles.contentContainer}>
        {(event.startDateTime || event.endDateTime) && (
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
        )}
        {event.location && (
          <LabelText
            style={styles.detailsContainer}
            iconName="map-pin"
            title={event.location}
          />
        )}
        {event.user?.fullName && (
          <Text style={styles.detailsContainer}>
            {I18n.t('Crm_AssignedTo')}: {event.user?.fullName}
          </Text>
        )}
        {event.organizer && (
          <Text style={styles.detailsContainer}>
            {I18n.t('Crm_Organisator')}: {event.organizer?.name?.split(' [')[0]}
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
    </>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 10,
    marginHorizontal: 10,
  },
  detailsContainer: {
    marginVertical: 5,
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default EventBody;
