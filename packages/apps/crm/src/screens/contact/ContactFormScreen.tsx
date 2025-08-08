/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo} from 'react';
import {useSelector, FormView, useDispatch} from '@axelor/aos-mobile-core';
import {getContact, updateContact} from '../../features/contactSlice';

const ContactFormScreen = ({navigation, route}) => {
  const {contactId} = route?.params ?? {};
  const _dispatch = useDispatch();

  const {contact} = useSelector(state => state.contact);

  useEffect(() => {
    _dispatch((getContact as any)({contactId}));
  }, [_dispatch, contactId]);

  const defaultValue = useMemo(
    () => (contactId !== contact?.id ? undefined : contact),
    [contact, contactId],
  );

  const updateContactAPI = useCallback(
    (objectState, dispatch) => {
      dispatch((updateContact as any)(objectState));

      navigation.pop();
    },
    [navigation],
  );

  return (
    <FormView
      formKey="crm_partner"
      defaultValue={defaultValue}
      defaultEditMode
      actions={[
        {
          key: 'update-contact',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          customAction: ({dispatch, objectState}) =>
            updateContactAPI(objectState, dispatch),
        },
      ]}
    />
  );
};

export default ContactFormScreen;
