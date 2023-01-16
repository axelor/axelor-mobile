import React, {useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  useThemeColor,
  Text,
  ImageBubble,
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
} from '@axelor/aos-mobile-core';
import {
  DropdownContactView,
  DropdownEventView,
  LiteContactCard,
} from '../../components';
import {searchContactById} from '../../features/contactSlice';
import {fetchPartnerEventById} from '../../features/eventSlice';
import {getLastEvent, getNextEvent} from '../../utils/dateEvent';

const ProspectDetailsScreen = ({navigation, route}) => {
  const prospect = route.params.prospect;
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {mobileSettings} = useSelector(state => state.config);
  const {baseUrl} = useSelector(state => state.auth);
  const {listContactById} = useSelector(state => state.contact);
  const {listEventPartner} = useSelector(state => state.event);

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
          modelId={prospect?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={prospect?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, prospect]);

  useEffect(() => {
    const idList = prospect.contactPartnerSet.map(item => item.id);
    dispatch(searchContactById(idList));
  }, [dispatch, prospect.contactPartnerSet]);

  useEffect(() => {
    dispatch(fetchPartnerEventById(prospect.id));
  }, [dispatch, prospect.id]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <View style={styles.headerContainerChildren}>
              <ImageBubble
                source={{
                  uri: `${baseUrl}ws/rest/com.axelor.meta.db.MetaFile/${prospect.picture?.id}/content/download?image=true&v=${prospect.picture?.$version}&parentId=${prospect.picture?.id}&parentModel=com.axelor.meta.db.MetaFile`,
                }}
              />
              <View style={styles.headerInfo}>
                <Text style={styles.textTitle} fontSize={16}>
                  {prospect.simpleFullName}
                </Text>
                <StarScore
                  style={styles.leadScoring}
                  score={prospect.leadScoring}
                  showMissingStar={true}
                />
              </View>
            </View>
            <View style={styles.headerBadge}>
              {prospect.partnerCategory?.name && (
                <Badge
                  color={Colors.progressColor}
                  title={prospect.partnerCategory?.name}
                />
              )}
              {prospect.industrySector?.name && (
                <Badge
                  color={Colors.plannedColor}
                  title={prospect.industrySector?.name}
                />
              )}
            </View>
          </View>
        }
      />
      <ScrollView>
        <NotesCard title={I18n.t('Crm_Notes')} data={prospect.description} />
        <View style={styles.container}>
          <DropdownCardSwitch
            styleTitle={styles.textTitle}
            dropdownItems={[
              {
                title: I18n.t('Crm_Contact'),
                key: 1,
                childrenComp: (
                  <DropdownContactView
                    address={prospect.mainAddress?.fullName}
                    fixedPhone={prospect.fixedPhone}
                    emailAddress={prospect['emailAddress.address']}
                    webSite={prospect.webSite}
                  />
                ),
              },
              {
                title: I18n.t('Crm_GeneralInformation'),
                key: 2,
                childrenComp: (
                  <View>
                    {prospect.user?.fullName && (
                      <LabelText
                        title={I18n.t('Crm_AssignedTo')}
                        iconName={'user-tie'}
                        value={prospect.user?.fullName}
                      />
                    )}
                    {prospect.type?.name && (
                      <LabelText
                        title={I18n.t('Crm_Categorie')}
                        value={prospect.partnerCategory?.name}
                      />
                    )}
                    {prospect.industrySector?.name && (
                      <LabelText
                        title={I18n.t('Crm_Sector')}
                        value={prospect.industrySector?.name}
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
