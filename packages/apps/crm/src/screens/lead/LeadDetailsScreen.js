import React, {useEffect, useMemo, useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Screen, HeaderContainer, CircleButton} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {LeadHeader, LeadBody} from '../../components';
import {searchEventById} from '../../features/eventSlice';
import {fetchLeadById, updateLeadScore} from '../../features/leadSlice';

const LeadDetailsScreen = ({navigation, route}) => {
  const idLead = route.params.idLead;
  const versionLead = route.params.versionLead;
  const colorIndex = route.params.colorIndex;
  const {mobileSettings} = useSelector(state => state.config);
  const {lead} = useSelector(state => state.lead);
  const dispatch = useDispatch();

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
          <LeadHeader
            colorIndex={colorIndex}
            idLead={idLead}
            versionLead={versionLead}
            onPress={updateScoreLeadAPI}
          />
        }
      />
      <ScrollView>
        <LeadBody navigation={navigation} />
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
