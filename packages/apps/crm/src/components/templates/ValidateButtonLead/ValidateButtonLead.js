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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {createLead, updateLead} from '../../../features/leadSlice';

const ValidateButtonLead = ({idLead, lead, _lead, navigation, disabled}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {userId} = useSelector(state => state.auth);

  const updateLeadAPI = useCallback(() => {
    dispatch(
      updateLead({
        lead: {
          ..._lead,
          id: lead.id,
          version: lead.version,
          emailVersion: lead.emailAddress?.$version,
          emailId: lead.emailAddress?.id,
        },
      }),
    );
    navigation.navigate('LeadDetailsScreen', {
      idLead: lead.id,
    });
  }, [dispatch, navigation, _lead, lead]);

  const createLeadAPI = useCallback(() => {
    dispatch(
      createLead({
        lead: {
          ..._lead,
          user: {id: userId},
        },
      }),
    );
    navigation.navigate('LeadListScreen');
  }, [dispatch, _lead, userId, navigation]);

  return (
    <View style={styles.button_container}>
      <Button
        title={I18n.t('Base_Save')}
        onPress={idLead != null ? updateLeadAPI : createLeadAPI}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button_container: {
    marginVertical: '1%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default ValidateButtonLead;
