import React, {useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  Text,
  LabelText,
  NotesCard,
  DropdownCardSwitch,
  CircleButton,
} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useTranslator,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {
  ContactHeader,
  DropdownContactView,
  DropdownEventView,
  PartnerCard,
} from '../../components';
import {getLastEvent, getNextEvent} from '../../utils/dateEvent';
import {fetchContactEventById} from '../../features/eventSlice';
import {fetchPartner} from '../../features/partnerSlice';
import {getContact} from '../../features/contactSlice';

const ContactDetailsScreen = ({navigation, route}) => {
  const idContact = route.params.idContact;
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const {mobileSettings} = useSelector(state => state.config);
  const {listEventContact} = useSelector(state => state.event);
  const {partner} = useSelector(state => state.partner);
  const {contact} = useSelector(state => state.contact);

  const lastEventClient = useMemo(() => {
    return getLastEvent(listEventContact);
  }, [listEventContact]);

  const nextEventClient = useMemo(() => {
    return getNextEvent(listEventContact);
  }, [listEventContact]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.base.db.Partner"
          modelId={contact?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={contact?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, contact]);

  useEffect(() => {
    dispatch(getContact({contactId: idContact}));
  }, [dispatch, idContact]);

  useEffect(() => {
    dispatch(fetchContactEventById(idContact));
  }, [dispatch, idContact]);

  useEffect(() => {
    contact?.mainPartner &&
      dispatch(fetchPartner({partnerId: contact?.mainPartner?.id}));
  }, [dispatch, contact?.mainPartner?.id, contact?.mainPartner]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ContactHeader />}
      />
      <ScrollView>
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
      </ScrollView>
      <View style={styles.bottomContainer}>
        <CircleButton
          iconName="pen"
          onPress={() =>
            navigation.navigate('ContactFormScreen', {
              idContact: idContact,
            })
          }
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 20,
    marginVertical: 7,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainerChildren: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center',
  },
  headerInfo: {
    flexDirection: 'column',
    marginLeft: '7%',
  },
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
  bottomContainer: {
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
    marginBottom: 25,
  },
});

export default ContactDetailsScreen;
