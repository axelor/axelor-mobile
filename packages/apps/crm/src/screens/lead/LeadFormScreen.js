/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {useSelector, FormView} from '@axelor/aos-mobile-core';
import {createLead, updateLead} from '../../features/leadSlice';

const LeadFormScreen = ({navigation, route}) => {
  const idLead = route.params.idLead;

  const {lead} = useSelector(state => state.lead);
  const {userId} = useSelector(state => state.auth);

  const updateLeadAPI = useCallback(
    (objectState, dispatch) => {
      dispatch(
        updateLead({
          lead: {
            ...objectState,
            emailVersion: objectState.emailAddress?.$version,
            emailId: objectState.emailAddress?.id,
          },
        }),
      );

      navigation.navigate('LeadDetailsScreen', {
        idLead: objectState.id,
      });
    },
    [navigation],
  );

  const createLeadAPI = useCallback(
    (objectState, dispatch) => {
      dispatch(
        createLead({
          lead: {
            ...objectState,
            user: {id: userId},
          },
        }),
      );

      navigation.navigate('LeadListScreen');
    },
    [userId, navigation],
  );

  const _defaultValue = useMemo(() => {
    return idLead != null
      ? {...lead}
      : {leadScoringSelect: 0, isDoNotSendEmail: false, isDoNotCall: false};
  }, [idLead, lead]);

  return (
    <FormView
      formKey="crm_lead"
      defaultValue={_defaultValue}
      actions={[
        {
          key: 'create-lead',
          type: 'create',
          needRequiredFields: true,
          needValidation: true,
          hideIf: () => idLead != null,
          customAction: ({dispatch, objectState}) =>
            createLeadAPI(objectState, dispatch),
        },
        {
          key: 'update-lead',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          hideIf: () => idLead == null,
          customAction: ({dispatch, objectState}) =>
            updateLeadAPI(objectState, dispatch),
        },
      ]}
    />
  );
};

export default LeadFormScreen;
