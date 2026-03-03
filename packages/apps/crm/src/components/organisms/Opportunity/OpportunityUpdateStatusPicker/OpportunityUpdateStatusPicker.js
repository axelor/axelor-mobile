/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useDispatch,
  useTranslator,
  usePermitted,
} from '@axelor/aos-mobile-core';
import {updateOpportunityStatus} from '../../../../features/opportunitySlice';

const OpportunityUpdateStatusPicker = ({
  emptyValue = false,
  labelField = 'name',
  valueField = 'id',
  isScrollViewContainer = true,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.crm.db.Opportunity',
  });

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

  if (readonly) {
    return null;
  }

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
    alignSelf: 'center',
  },
});

export default OpportunityUpdateStatusPicker;
