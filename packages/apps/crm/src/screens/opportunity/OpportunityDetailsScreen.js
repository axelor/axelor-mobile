import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer, NotesCard} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  OpportunityBottom,
  OpportunityDropdownInfo,
  OpportunityHeader,
  OpportunityPartnerCard,
  OpportunityUpdateStatusPicker,
} from '../../components';
import {getOpportunity} from '../../features/opportunitySlice';

const OpportunityDetailsScreen = ({navigation, route}) => {
  const I18n = useTranslator();
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
        <OpportunityPartnerCard navigation={navigation} />
        <OpportunityDropdownInfo />
        <NotesCard
          title={I18n.t('Base_Description')}
          data={opportunity.description}
        />
        <OpportunityUpdateStatusPicker />
      </ScrollView>
      <OpportunityBottom
        navigation={navigation}
        opportunityId={opportunity.id}
      />
    </Screen>
  );
};

export default OpportunityDetailsScreen;
