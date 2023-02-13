import React, {useEffect, useMemo, useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  useThemeColor,
  Text,
  ImageBubble,
  InfoBubble,
  LabelText,
  Badge,
  StarScore,
  DropdownCardSwitch,
  NotesCard,
  CircleButton,
} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {Lead} from '../../types';
import {DropdownContactView, DropdownEventView} from '../../components';
import {searchEventById} from '../../features/eventSlice';
import {getLastEvent, getNextEvent} from '../../utils/dateEvent';
import {fetchLeadById, updateLeadScore} from '../../features/leadSlice';

const LeadDetailsScreen = ({navigation, route}) => {
  const idLead = route.params.idLead;
  const versionLead = route.params.versionLead;
  const colorIndex = route.params.colorIndex;
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {baseUrl} = useSelector(state => state.auth);
  const {mobileSettings} = useSelector(state => state.config);
  const {listEventById} = useSelector(state => state.event);
  const {lead} = useSelector(state => state.lead);
  const dispatch = useDispatch();

  const lastEventLead = useMemo(() => {
    return getLastEvent(listEventById);
  }, [listEventById]);

  const nextEventLead = useMemo(() => {
    return getNextEvent(listEventById);
  }, [listEventById]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.crm.db.Lead"
          modelId={idLead}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={lead?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, lead, idLead]);

  useEffect(() => {
    dispatch(fetchLeadById({leadId: idLead}));
  }, [dispatch, idLead]);

  useEffect(() => {
    const idList = lead.eventList?.map(item => item.id);
    dispatch(searchEventById(idList));
  }, [dispatch, lead.eventList]);

  const updateScoreLeadAPI = useCallback(
    newScore => {
      dispatch(
        updateLeadScore({
          leadId: lead.id,
          leadVersion: lead.version,
          newScore: newScore,
        }),
      );
    },
    [dispatch, lead.id, lead.version],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <ImageBubble
              source={{
                uri: `${baseUrl}ws/rest/com.axelor.apps.crm.db.Lead/${idLead}/picture/download?v=${versionLead}&parentId=${idLead}&parentModel=com.axelor.apps.crm.db.Lead&image=true`,
              }}
              listComponent={[
                lead.isDoNotSendEmail ? (
                  <InfoBubble
                    iconName="user-alt-slash"
                    badgeColor={Colors.cautionColor}
                    indication={I18n.t('Crm_ThisLeadDoesNotAcceptEmails')}
                  />
                ) : null,
                lead.isDoNotCall ? (
                  <InfoBubble
                    iconName="phone-slash"
                    badgeColor={Colors.cautionColor}
                    indication={I18n.t('Crm_ThisLeadDoesNotAcceptCall')}
                  />
                ) : null,
              ]}
            />
            <View style={styles.headerInfo}>
              <Text style={styles.textTitle}>{lead.simpleFullName}</Text>
              {lead.enterpriseName && (
                <LabelText iconName="building" title={lead.enterpriseName} />
              )}
              {lead.jobTitleFunction?.name && (
                <LabelText
                  iconName="suitcase"
                  title={lead.jobTitleFunction?.name}
                />
              )}
            </View>
            <View style={styles.headerInfo}>
              {lead.leadStatus && (
                <Badge
                  color={Lead.getStatusColor(colorIndex, Colors)}
                  title={lead.leadStatus.name}
                />
              )}
              <StarScore
                style={styles.leadScoring}
                score={lead.leadScoringSelect}
                showMissingStar={true}
                onPress={updateScoreLeadAPI}
                editMode={true}
              />
            </View>
          </View>
        }
      />
      <ScrollView>
        <NotesCard title={I18n.t('Crm_LeadNotes')} data={lead.description} />
        <View style={styles.container}>
          <DropdownCardSwitch
            styleTitle={styles.textTitle}
            dropdownItems={[
              {
                title: I18n.t('Crm_Contact'),
                key: 1,
                childrenComp: (
                  <DropdownContactView
                    address={lead.primaryAddress}
                    fixedPhone={lead.fixedPhone}
                    mobilePhone={lead.mobilePhone}
                    emailAddress={lead.emailAddress?.address}
                    webSite={lead.webSite}
                  />
                ),
              },
              {
                title: I18n.t('Crm_GeneralInformation'),
                key: 2,
                childrenComp: (
                  <View>
                    {lead.user?.fullName && (
                      <LabelText
                        title={I18n.t('Crm_AssignedTo')}
                        iconName={'user-tie'}
                        value={lead.user?.fullName}
                      />
                    )}
                    {lead.type?.name && (
                      <LabelText
                        title={I18n.t('Crm_Categorie')}
                        value={lead.type?.name}
                      />
                    )}
                    {lead.industrySector?.name && (
                      <LabelText
                        title={I18n.t('Crm_Sector')}
                        value={lead.industrySector?.name}
                      />
                    )}
                    {!lead.user?.fullName &&
                      !lead.type?.name &&
                      !lead.industrySector?.name && (
                        <View>
                          <Text>{I18n.t('Crm_NoGeneralInformation')}</Text>
                        </View>
                      )}
                  </View>
                ),
              },
              {
                title: I18n.t('Crm_Events'),
                key: 3,
                childrenComp: (
                  <DropdownEventView
                    lastEvent={lastEventLead}
                    nextEvent={nextEventLead}
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
            navigation.navigate('LeadFormScreen', {
              idLead: idLead,
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
    justifyContent: 'space-around',
  },
  headerInfo: {
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
  bottomContainer: {
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
    marginBottom: 25,
  },
});

export default LeadDetailsScreen;
