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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  FormInput,
  KeyboardAvoidingScrollView,
  Picker,
  Screen,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {fetchTicketById} from '../features/ticketSlice';
import {CustomerSearchBar, ProjectSearchBar} from '../components';

const TicketFormScreen = ({navigation, route}) => {
  const idTicket = route.params.idTicket;
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {ticket} = useSelector(state => state.ticket);

  const [subject, setSubject] = useState(ticket?.subject);
  const [project, setProject] = useState(ticket?.project);
  const [customer, setCustomer] = useState(ticket?.customerPartner);

  useEffect(() => {
    dispatch(fetchTicketById({ticketId: idTicket}));
  }, [dispatch, idTicket]);

  return (
    <Screen>
      <KeyboardAvoidingScrollView>
        <View style={styles.container}>
          <FormInput
            style={styles.input}
            title={I18n.t('Hepdesk_Subject')}
            onChange={setSubject}
            defaultValue={subject}
          />
          <ProjectSearchBar
            titleKey="Helpdesk_Project"
            placeholderKey="Helpdesk_Project"
            defaultValue={project}
            onChange={setProject}
            style={styles.picker}
            styleTxt={styles.marginTitle}
          />
          <CustomerSearchBar
            titleKey="Helpdesk_CustomPartner"
            placeholderKey="Helpdesk_CustomPartner"
            defaultValue={customer}
            onChange={setCustomer}
            style={styles.picker}
            styleTxt={styles.marginTitle}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={() => {}} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    zIndex: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    zIndex: 35,
  },
  halfHeader: {
    width: '50%',
    zIndex: 40,
  },
  checkBoxContainer: {
    flexDirection: 'column',
    width: '50%',
    marginLeft: '10%',
  },
  picker: {
    width: '100%',
    marginLeft: 5,
  },

  civilityPicker: {
    width: '100%',
    marginLeft: 12,
  },
  pickerTitle: {
    marginLeft: 5,
  },
  input: {
    width: '90%',
  },
  button_container: {
    marginVertical: '1%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default TicketFormScreen;
