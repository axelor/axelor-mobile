import React, {useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  Text,
  DropdownCardSwitch,
  NotesCard,
  LabelText,
  CircleButton,
} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
  AOSImageBubble,
} from '@axelor/aos-mobile-core';
import {
  DropdownContactView,
  DropdownEventView,
  LiteContactCard,
} from '../../components';
import {searchContactById} from '../../features/contactSlice';
import {fetchPartnerEventById} from '../../features/eventSlice';
import {getLastEvent, getNextEvent} from '../../utils/dateEvent';
import {fetchPartner} from '../../features/partnerSlice';

const ClientDetailsScreen = ({navigation, route}) => {
  const idClient = route.params.idClient;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {mobileSettings} = useSelector(state => state.config);
  const {listContactById} = useSelector(state => state.contact);
  const {listEventPartner} = useSelector(state => state.event);
  const {partner} = useSelector(state => state.partner);

  const lastEventClient = useMemo(() => {
    return getLastEvent(listEventPartner);
  }, [listEventPartner]);

  const nextEventClient = useMemo(() => {
    return getNextEvent(listEventPartner);
  }, [listEventPartner]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.base.db.Partner"
          modelId={idClient}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={partner?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, idClient, partner]);

  useEffect(() => {
    dispatch(fetchPartner({partnerId: idClient}));
  }, [dispatch, idClient]);

  useEffect(() => {
    const idList = partner.contactPartnerSet?.map(item => item.id);
    dispatch(searchContactById(idList));
  }, [dispatch, partner.contactPartnerSet]);

  useEffect(() => {
    dispatch(fetchPartnerEventById(idClient));
  }, [dispatch, idClient]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <View style={styles.headerContainerChildren}>
              <AOSImageBubble metaFileId={partner?.picture?.id} />
              <View style={styles.headerInfo}>
                <Text style={styles.textTitle} fontSize={16}>
                  {partner.simpleFullName}
                </Text>
                <Text fontSize={14}>{partner.partnerSeq}</Text>
              </View>
            </View>
          </View>
        }
      />
      <ScrollView>
        <NotesCard title={I18n.t('Crm_Notes')} data={partner.description} />
        <View style={styles.container}>
          <DropdownCardSwitch
            styleTitle={styles.textTitle}
            dropdownItems={[
              {
                title: I18n.t('Crm_Contact'),
                key: 1,
                childrenComp: (
                  <DropdownContactView
                    address={partner.mainAddress?.fullName}
                    fixedPhone={partner.fixedPhone}
                    emailAddress={partner.emailAddress?.address}
                    webSite={partner.webSite}
                  />
                ),
              },
              {
                title: I18n.t('Crm_GeneralInformation'),
                key: 2,
                childrenComp: (
                  <View>
                    {partner.user?.fullName && (
                      <LabelText
                        title={I18n.t('Crm_AssignedTo')}
                        iconName={'user-tie'}
                        value={partner.user?.fullName}
                      />
                    )}
                    {partner.type?.name && (
                      <LabelText
                        title={I18n.t('Crm_Categorie')}
                        value={partner.partnerCategory?.name}
                      />
                    )}
                    {partner.industrySector?.name && (
                      <LabelText
                        title={I18n.t('Crm_Sector')}
                        value={partner.industrySector?.name}
                      />
                    )}
                    {partner.salePartnerPriceList?.label && (
                      <LabelText
                        title={I18n.t('Crm_PriceList')}
                        value={partner.salePartnerPriceList?.label}
                      />
                    )}
                    {!partner.user?.fullName &&
                      !partner.type?.name &&
                      !partner.industrySector?.name &&
                      !partner.salePartnerPriceList?.label && (
                        <View>
                          <Text>{I18n.t('Crm_NoGeneralInformation')}</Text>
                        </View>
                      )}
                  </View>
                ),
              },
              {
                title: I18n.t('Crm_Employees'),
                key: 3,
                childrenComp:
                  listContactById.length > 0 ? (
                    listContactById.map((contact, index) => {
                      return (
                        <LiteContactCard
                          key={index}
                          contactFullname={contact.simpleFullName}
                          fixedPhoneNumber={contact.fixedPhone}
                          email={contact['emailAddress.address']}
                          style={styles.item}
                          onPress={() =>
                            navigation.navigate('ContactDetailsScreen', {
                              contact: contact,
                            })
                          }
                        />
                      );
                    })
                  ) : (
                    <View>
                      <Text>{I18n.t('Crm_NoContactAssociated')}</Text>
                    </View>
                  ),
              },
              {
                title: I18n.t('Crm_Events'),
                key: 4,
                childrenComp: (
                  <DropdownEventView
                    lastEvent={lastEventClient}
                    nextEvent={nextEventClient}
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
            navigation.navigate('ClientFormScreen', {
              idClient: idClient,
            })
          }
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
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

export default ClientDetailsScreen;
