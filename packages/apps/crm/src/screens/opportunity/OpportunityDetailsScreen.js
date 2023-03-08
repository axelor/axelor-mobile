import React, {useCallback, useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  useThemeColor,
  Text,
  Badge,
  StarScore,
  NotesCard,
  Picker,
  formatNumber,
  CircleButton,
} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {Opportunity} from '../../types';
import {
  OpportunityDropdownInfo,
  OpportunityHeader,
  PartnerInfoCard,
} from '../../components';
import {
  getOpportunity,
  updateOpportunityStatus,
  updateOpportunityScore,
} from '../../features/opportunitySlice';

const OpportunityDetailsScreen = ({navigation, route}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {loadingOpportunity, opportunity, opportunityStatusList} = useSelector(
    state => state.opportunity,
  );

  const colorIndex = useMemo(
    () =>
      opportunityStatusList?.findIndex(
        status => status.id === opportunity.opportunityStatus?.id,
      ),
    [opportunityStatusList, opportunity.opportunityStatus],
  );

  const updateOpportunityAPI = useCallback(
    newScore => {
      dispatch(
        updateOpportunityScore({
          opportunityId: opportunity.id,
          opportunityVersion: opportunity.version,
          newScore: newScore,
        }),
      );
    },
    [dispatch, opportunity.id, opportunity.version],
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

  const navigateToPartnerDetails = useCallback(() => {
    if (opportunity?.partner?.isProspect) {
      return navigation.navigate('ProspectDetailsScreen', {
        idProspect: opportunity.partner.id,
      });
    }

    if (opportunity?.partner?.isCustomer) {
      return navigation.navigate('ClientDetailsScreen', {
        idClient: opportunity.partner.id,
      });
    }
  }, [navigation, opportunity?.partner]);

  const updateOpportunityStatusAPI = useCallback(
    selectedStatusId =>
      dispatch(
        updateOpportunityStatus({
          opportunityId: opportunity.id,
          version: opportunity.version,
          opportunityStatusId: selectedStatusId,
        }),
      ),
    [dispatch, opportunity.id, opportunity.version],
  );

  return (
    <Screen removeSpaceOnTop={true} loading={loadingOpportunity}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<OpportunityHeader />}
      />
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.container}>
          <PartnerInfoCard
            fullName={opportunity.partner?.simpleFullName}
            partnerSeq={opportunity.partner?.partnerSeq}
            picture={opportunity.partner?.picture}
            onPress={navigateToPartnerDetails}
          />
          <OpportunityDropdownInfo
            amount={formatNumber(
              opportunity.amount,
              I18n.t('Base_DecimalSpacer'),
              I18n.t('Base_ThousandSpacer'),
            )}
            assignedTo={opportunity.assignedTo}
            currencySymbol={opportunity.currency?.symbol}
            expectedCloseDate={opportunity.expectedCloseDate}
            recurrentAmount={formatNumber(
              opportunity.recurrentAmount,
              I18n.t('Base_DecimalSpacer'),
              I18n.t('Base_ThousandSpacer'),
            )}
            style={styles.opportunityInfo}
          />
          <NotesCard
            title={I18n.t('Base_Description')}
            data={opportunity.description}
            style={styles.opportunityDescription}
          />
          <Picker
            title={I18n.t('Crm_Opportunity_Status')}
            defaultValue={opportunity.opportunityStatus?.id}
            listItems={opportunityStatusList}
            labelField="name"
            valueField="id"
            emptyValue={false}
            onValueChange={updateOpportunityStatusAPI}
            style={styles.picker}
            isScrollViewContainer={true}
          />
        </View>
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
