import React, {useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  useThemeColor,
  Text,
  Badge,
  StarScore,
  DropdownCardSwitch,
  NotesCard,
  LabelText,
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

const ProspectDetailsScreen = ({navigation, route}) => {
  const idProspect = route.params.idProspect;
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {mobileSettings} = useSelector(state => state.config);
  const {listContactById} = useSelector(state => state.contact);
  const {listEventPartner} = useSelector(state => state.event);
  const {partner} = useSelector(state => state.partner);

  const lastEventProspect = useMemo(() => {
    return getLastEvent(listEventPartner);
  }, [listEventPartner]);

  const nextEventProspect = useMemo(() => {
    return getNextEvent(listEventPartner);
  }, [listEventPartner]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.base.db.Partner"
          modelId={idProspect}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={partner?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, idProspect, partner]);

  useEffect(() => {
    dispatch(fetchPartner(idProspect));
  }, [dispatch, idProspect]);

  useEffect(() => {
    const idList = partner.contactPartnerSet?.map(item => item.id);
    dispatch(searchContactById(idList));
  }, [dispatch, partner.contactPartnerSet]);

  useEffect(() => {
    dispatch(fetchPartnerEventById(idProspect));
  }, [dispatch, idProspect]);

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
                <StarScore
                  style={styles.leadScoring}
                  score={partner.leadScoringSelect}
                  showMissingStar={true}
                />
              </View>
            </View>
            <View style={styles.headerBadge}>
              {partner.partnerCategory?.name && (
                <Badge
                  color={Colors.progressColor}
                  title={partner.partnerCategory?.name}
                />
              )}
              {partner.industrySector?.name && (
                <Badge
                  color={Colors.plannedColor}
                  title={partner.industrySector?.name}
                />
              )}
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
                  </View>
                ),
              },
              {
                title: I18n.t('Crm_Employees'),
                key: 3,
                childrenComp:
                  listContactById.length > 0 &&
                  listContactById.map((contact, index) => (
                    <LiteContactCard
                      key={index}
                      contactFullname={contact.simpleFullName}
                      fixedPhoneNumber={contact.fixedPhone}
                      email={contact['emailAddress.address']}
                      style={styles.item}
                    />
                  )),
              },
              {
                title: I18n.t('Crm_Events'),
                key: 4,
                childrenComp: (
                  <DropdownEventView
                    lastEvent={lastEventProspect}
                    nextEvent={nextEventProspect}
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
  headerBadge: {
    flexDirection: 'column',
  },
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
  leadScoring: {
    marginTop: '10%',
  },
});

export default ProspectDetailsScreen;
