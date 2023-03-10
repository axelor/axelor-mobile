import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {updateOpportunityStatus} from '../../../../features/opportunitySlice';

const OpportunityUpdateStatusPicker = ({
  emptyValue = false,
  labelField = 'name',
  valueField = 'id',
  isScrollViewContainer = true,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {opportunity, opportunityStatusList} = useSelector(
    state => state.opportunity,
  );

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
    <Picker
      title={I18n.t('Crm_Opportunity_Status')}
      defaultValue={opportunity.opportunityStatus?.id}
      listItems={opportunityStatusList}
      labelField={labelField}
      valueField={valueField}
      emptyValue={emptyValue}
      onValueChange={updateOpportunityStatusAPI}
      style={styles.picker}
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    marginBottom: 10,
    marginLeft: 2,
  },
});

export default OpportunityUpdateStatusPicker;
