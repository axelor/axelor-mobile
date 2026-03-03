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

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  useSelector,
  FormView,
  useDispatch,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  createContact,
  getContact,
  updateContact,
} from '../../features/contactSlice';

const ContactFormScreen = ({navigation, route}) => {
  const {contactId} = route?.params ?? {};
  const {Partner} = useTypes();
  const _dispatch = useDispatch();

  const {contact} = useSelector(state => state.contact);

  useEffect(() => {
    if (contactId != null) {
      _dispatch((getContact as any)({contactId}));
    }
  }, [_dispatch, contactId]);

  const defaultValue = useMemo(
    () => (!contactId || contactId !== contact?.id ? undefined : contact),
    [contact, contactId],
  );

  const creationDefaultValue = useMemo(
    () => ({
      isContact: true,
      partnerTypeSelect: Partner?.partnerTypeSelect?.Individual,
    }),
    [Partner?.partnerTypeSelect?.Individual],
  );

  const handleSaveAPI = useCallback(
    ({dispatch, objectState}) => {
      const isCreation = objectState?.id == null;
      const sliceFct: any = isCreation ? createContact : updateContact;

      dispatch(sliceFct(objectState)).then(res => {
        const _recordId = res?.payload?.id;
        if (_recordId) {
          navigation.replace('ContactDetailsScreen', {idContact: _recordId});
        } else {
          navigation.pop();
        }
      });
    },
    [navigation],
  );

  return (
    <FormView
      formKey="crm_partner"
      defaultValue={defaultValue}
      creationDefaultValue={creationDefaultValue}
      defaultEditMode
      actions={[
        {
          key: 'create-contact',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: handleSaveAPI,
        },
        {
          key: 'update-contact',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          customAction: handleSaveAPI,
        },
      ]}
    />
  );
};

export default ContactFormScreen;
