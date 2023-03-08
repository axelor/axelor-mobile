import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {NotesCard, Picker, formatNumber} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {updateOpportunityStatus} from '../../../features/opportunitySlice';
import {PartnerInfoCard} from '../../molecules';
import {OpportunityDropdownInfo} from '../../organisms';

const OpportunityBody = ({navigation}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const {opportunity, opportunityStatusList} = useSelector(
    state => state.opportunity,
  );

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
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 12,
    paddingVertical: 10,
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
});

export default OpportunityBody;
