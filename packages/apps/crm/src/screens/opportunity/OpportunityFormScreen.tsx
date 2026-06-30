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

import React, {useCallback, useMemo} from 'react';
import {FormView, useSelector} from '@axelor/aos-mobile-core';
import {
  createOpportunity,
  updateOpportunity,
} from '../../features/opportunitySlice';

const OpportunityFormScreen = ({navigation, route}: any) => {
  const {opportunityId} = route?.params ?? {};

  const {opportunity} = useSelector(state => state.opportunity);
  const {user} = useSelector(state => state.user);

  const createOpportinityAPI = useCallback(
    (objectState: any, dispatch: any) => {
      dispatch(
        (createOpportunity as any)({
          opportunity: {
            ...objectState,
            user: user,
            name:
              objectState.name == null
                ? objectState.partner?.fullName
                : objectState.name,
            company: user.activeCompany,
            team: user.activeTeam,
            currency: user.activeCompany.currency,
          },
          companyId: user.activeCompany?.id,
        }),
      );

      navigation.pop();
    },
    [user, navigation],
  );

  const updateOpportunityAPI = useCallback(
    (objectState: any, dispatch: any) => {
      dispatch(
        (updateOpportunity as any)({
          opportunity: {
            ...objectState,
            name:
              objectState.name == null
                ? objectState.partner?.fullName
                : objectState.name,
          },
        }),
      );

      navigation.pop();
    },
    [navigation],
  );

  const _defaultValue = useMemo(
    () => (opportunityId != null ? {...opportunity} : null),
    [opportunityId, opportunity],
  );

  const _creationDefaultValue = useMemo(
    () => ({
      amount: 0,
      recurrentAmount: 0,
      opportunityRating: 0,
      probability: '0',
      worstCase: '0',
      expectedDurationOfRecurringRevenue: 0,
      bestCase: '0',
    }),
    [],
  );

  return (
    <FormView
      formKey="crm_opportunity"
      defaultValue={_defaultValue}
      creationDefaultValue={_creationDefaultValue}
      defaultEditMode
      actions={[
        {
          key: 'create-opportunity',
          type: 'create',
          needRequiredFields: true,
          needValidation: true,
          hideIf: () => opportunityId != null,
          customAction: ({dispatch, objectState}) =>
            createOpportinityAPI(objectState, dispatch),
        },
        {
          key: 'update-opportunity',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          hideIf: () => opportunityId == null,
          customAction: ({dispatch, objectState}) =>
            updateOpportunityAPI(objectState, dispatch),
        },
      ]}
    />
  );
};

export default OpportunityFormScreen;
