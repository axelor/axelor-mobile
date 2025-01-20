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

import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAvoidingScrollView, Screen, Text} from '@axelor/aos-mobile-ui';
import {FormView} from '@axelor/aos-mobile-core';

const RequestLineFormScreen = () => {
  return (
    <FormView
      formKey="purchase_purchaseRequestLine"
      // defaultValue={_defaultValue}
      //creationDefaultValue={_creationDefaultValue}
      defaultEditMode
      actions={[
        {
          key: 'create-lead',
          type: 'create',
          needRequiredFields: true,
          needValidation: true,
          customAction: ({dispatch, objectState}) => {},
          // createLeadAPI(objectState, dispatch),
        },
        {
          key: 'update-lead',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          // hideIf: () => idLead == null,
          customAction: ({dispatch, objectState}) => {},
          // updateLeadAPI(objectState, dispatch),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
  },
  rule: {
    width: '80%',
  },
});

export default RequestLineFormScreen;
