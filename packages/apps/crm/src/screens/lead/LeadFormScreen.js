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
import {useSelector, FormView} from '@axelor/aos-mobile-core';
import {createLead, updateLead} from '../../features/leadSlice';

const LeadFormScreen = ({navigation, route}) => {
  const idLead = route.params.idLead;

  const {lead} = useSelector(state => state.lead);
  const {user} = useSelector(state => state.user);

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

      navigation.pop();
    },
    [navigation],
  );

  const createLeadAPI = useCallback(
    (objectState, dispatch) => {
      dispatch(
        createLead({
          lead: {
            ...objectState,
            user,
          },
          companyId: user.activeCompany?.id,
        }),
      );

      navigation.pop();
    },
    [user, navigation],
  );

  const _defaultValue = useMemo(
    () => (idLead != null ? {...lead} : null),
    [idLead, lead],
  );

  const _creationDefaultValue = useMemo(
    () => ({leadScoringSelect: 0, isDoNotSendEmail: true, isDoNotCall: false}),
    [],
  );

  return (
    <FormView
      formKey="crm_lead"
      defaultValue={_defaultValue}
      creationDefaultValue={_creationDefaultValue}
      defaultEditMode
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
