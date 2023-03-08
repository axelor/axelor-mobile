import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Screen, HeaderContainer, CircleButton} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {OpportunityBody, OpportunityHeader} from '../../components';
import {getOpportunity} from '../../features/opportunitySlice';

const OpportunityDetailsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {loadingOpportunity, opportunity} = useSelector(
    state => state.opportunity,
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.crm.db.Opportunity"
          modelId={opportunity?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={opportunity?.name}
        />
      ),
    });
  }, [mobileSettings, navigation, opportunity]);

  useEffect(() => {
    dispatch(
      getOpportunity({
        opportunityId: route.params.opportunityId,
      }),
    );
  }, [dispatch, route.params.opportunityId]);

  return (
    <Screen removeSpaceOnTop={true} loading={loadingOpportunity}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<OpportunityHeader />}
      />
      <ScrollView nestedScrollEnabled={true}>
        <OpportunityBody navigation={navigation} />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <CircleButton
          iconName="pen"
          onPress={() =>
            navigation.navigate('OpportunityFormScreen', {
              opportunityId: opportunity.id,
            })
          }
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  opportunityDescription: {
    marginBottom: 10,
    marginHorizontal: -12,
  },
  opportunityInfo: {
    marginLeft: 5,
  },
  picker: {
    marginBottom: 10,
    marginLeft: -12,
  },
  textTitle: {
    fontSize: 16,
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

export default OpportunityDetailsScreen;
