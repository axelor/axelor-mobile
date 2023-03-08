import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {
  OpportunityBody,
  OpportunityBottom,
  OpportunityHeader,
} from '../../components';
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
      <OpportunityBottom navigation={navigation} />
    </Screen>
  );
};

export default OpportunityDetailsScreen;
