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

import React, {useCallback, useMemo} from 'react';
import {useSelector, FormView} from '@axelor/aos-mobile-core';
import {updateContact} from '../../features/contactSlice';

const ContactFormScreen = ({navigation}) => {
  const {contact} = useSelector(state => state.contact);

  const updateContactAPI = useCallback(
    (objectState, dispatch) => {
      dispatch(
        updateContact({
          ...objectState,
          emailId: objectState.emailAddress?.id,
          emailVersion: objectState.emailAddress?.$version,
        }),
      );

      navigation.navigate('ContactDetailsScreen', {
        idContact: objectState.id,
      });
    },
    [navigation],
  );

  const _defaultValue = useMemo(() => {
    return {
      ...contact,
      email: contact.emailAddress?.address,
    };
  }, [contact]);

  return (
    <FormView
      formKey="crm_contact"
      defaultValue={_defaultValue}
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
