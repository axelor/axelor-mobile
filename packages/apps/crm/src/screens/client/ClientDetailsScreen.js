import React, {useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  Text,
  ImageBubble,
  DropdownCardSwitch,
  NotesCard,
  LabelText,
} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {
  DropdownContactView,
  DropdownEventView,
  LiteContactCard,
} from '../../components';
import {searchContactById} from '../../features/contactSlice';
import {fetchPartnerEventById} from '../../features/eventSlice';
import {getLastEvent, getNextEvent} from '../../utils/dateEvent';

const ClientDetailsScreen = ({navigation, route}) => {
  const client = route.params.client;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {mobileSettings} = useSelector(state => state.config);
  const {baseUrl} = useSelector(state => state.auth);
  const {listContactById} = useSelector(state => state.contact);
  const {listEventPartner} = useSelector(state => state.event);

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
          modelId={client?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={client?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, client]);

  useEffect(() => {
    const idList = client.contactPartnerSet.map(item => item.id);
    dispatch(searchContactById(idList));
  }, [dispatch, client.contactPartnerSet]);

  useEffect(() => {
    dispatch(fetchPartnerEventById(client.id));
  }, [dispatch, client.id]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <View style={styles.headerContainerChildren}>
              <ImageBubble
                source={{
                  uri: `${baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${client.picture?.id}/content/download?image=true&v=${client.picture?.$version}&parentId=${client.picture?.id}&parentModel=com.axelor.meta.db.MetaFile`,
                }}
              />
              <View style={styles.headerInfo}>
                <Text style={styles.textTitle} fontSize={16}>
                  {client.simpleFullName}
                </Text>
                <Text fontSize={14}>{client.partnerSeq}</Text>
              </View>
            </View>
          </View>
        }
      />
      <ScrollView>
        <NotesCard title={I18n.t('Crm_Notes')} data={client.description} />
        <View style={styles.container}>
          <DropdownCardSwitch
            styleTitle={styles.textTitle}
            dropdownItems={[
              {
                title: I18n.t('Crm_Contact'),
                key: 1,
                childrenComp: (
                  <DropdownContactView
                    address={client.mainAddress?.fullName}
                    fixedPhone={client.fixedPhone}
                    emailAddress={client['emailAddress.address']}
                    webSite={client.webSite}
                  />
                ),
              },
              {
                title: I18n.t('Crm_GeneralInformation'),
                key: 2,
                childrenComp: (
                  <View>
                    {client.user?.fullName && (
                      <LabelText
                        title={I18n.t('Crm_AssignedTo')}
                        iconName={'user-tie'}
                        value={client.user?.fullName}
                      />
                    )}
                    {client.type?.name && (
                      <LabelText
                        title={I18n.t('Crm_Categorie')}
                        value={client.partnerCategory?.name}
                      />
                    )}
                    {client.industrySector?.name && (
                      <LabelText
                        title={I18n.t('Crm_Sector')}
                        value={client.industrySector?.name}
                      />
                    )}
                    {client.industrySector?.name && (
                      <LabelText
                        title={I18n.t('Crm_PriceList')}
                        value={client.salePartnerPriceList?.label}
                      />
                    )}
                  </View>
                ),
              },
              {
                title: I18n.t('Crm_Employees'),
                key: 3,
                childrenComp:
                  listContactById.length > 0 &&
                  listContactById.map((contact, index) => {
                    return (
                      <LiteContactCard
                        key={index}
                        contactFullname={contact.simpleFullName}
                        fixedPhoneNumber={contact.fixedPhone}
                        email={contact['emailAddress.address']}
                        style={styles.item}
                      />
                    );
                  }),
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
});

export default ClientDetailsScreen;
