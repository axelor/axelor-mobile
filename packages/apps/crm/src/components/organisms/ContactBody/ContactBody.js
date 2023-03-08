import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  LabelText,
  NotesCard,
  DropdownCardSwitch,
} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {PartnerCard} from '../../molecules';
import DropdownContactView from '../DropdownContactView/DropdownContactView';
import DropdownEventView from '../DropdownEventView/DropdownEventView';
import {getLastEvent, getNextEvent} from '../../../utils/dateEvent';

const ContactBody = ({navigation}) => {
  const {contact} = useSelector(state => state.contact);
  const {partner} = useSelector(state => state.partner);
  const {listEventContact} = useSelector(state => state.event);

  const I18n = useTranslator();
  const lastEventClient = useMemo(() => {
    return getLastEvent(listEventContact);
  }, [listEventContact]);

  const nextEventClient = useMemo(() => {
    return getNextEvent(listEventContact);
  }, [listEventContact]);

  return (
    <>
      {partner?.isCustomer === true && partner?.isProspect === false && (
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
      {partner?.isCustomer === false && partner?.isProspect === true && (
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
      <NotesCard title={I18n.t('Crm_Notes')} data={contact.description} />
      <View style={styles.container}>
        <DropdownCardSwitch
          styleTitle={styles.textTitle}
          dropdownItems={[
            {
              title: I18n.t('Crm_Contact'),
              key: 5,
              childrenComp: (
                <DropdownContactView
                  address={contact.mainAddress?.fullName}
                  fixedPhone={contact.fixedPhone}
                  mobilePhone={contact.mobilePhone}
                  emailAddress={contact.emailAddress?.address}
                  webSite={contact.webSite}
                />
              ),
            },
            {
              title: I18n.t('Crm_GeneralInformation'),
              key: 6,
              childrenComp: (
                <View>
                  {contact.user?.fullName && (
                    <LabelText
                      title={I18n.t('Crm_AssignedTo')}
                      iconName={'user-tie'}
                      value={contact.user?.fullName}
                    />
                  )}
                  {contact.language?.name && (
                    <LabelText
                      title={I18n.t('Crm_Language')}
                      value={contact.language?.name}
                    />
                  )}
                  {!contact.user?.fullName && !contact.language?.name && (
                    <View>
                      <Text>{I18n.t('Crm_NoGeneralInformation')}</Text>
                    </View>
                  )}
                </View>
              ),
            },
            {
              title: I18n.t('Crm_Events'),
              key: 7,
              childrenComp: (
                <DropdownEventView
                  lastEvent={lastEventClient}
                  nextEvent={nextEventClient}
                  navigation={navigation}
                />
              ),
            },
          ]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 20,
    marginVertical: 7,
  },
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default ContactBody;
