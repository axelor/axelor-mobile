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

import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  FormInput,
  KeyboardAvoidingScrollView,
  Picker,
  Screen,
  useThemeColor,
  FormHtmlInput,
  FormIncrementInput,
  AutoCompleteSearch,
  Text,
} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useDispatch,
  useTranslator,
  DateInput,
} from '@axelor/aos-mobile-core';
import {fetchTicketById, updateTicket} from '../features/ticketSlice';
import {
  CustomerSearchBar,
  ProjectSearchBar,
  TicketTypeSearchBar,
} from '../components';
import {Ticket} from '../types/';
import {getCustomerbyId} from '../features/customerSlice';
import {displayItemFullname} from '../utils/displayers';

const TicketFormScreen = ({navigation, route}) => {
  const idTicket = route.params.idTicket;
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {ticket} = useSelector(state => state.ticket);
  const {customer} = useSelector(state => state.customer);

  const [subject, setSubject] = useState(ticket?.subject);
  const [projectInput, setProjectInput] = useState(ticket?.project);
  const [client, setClient] = useState(ticket?.customerPartner);
  const [ticketType, setTicketType] = useState(ticket?.ticketType);
  const [priority, setPriority] = useState(ticket?.prioritySelect);
  const [startDate, setStartDate] = useState(new Date(ticket?.startDateT));
  const [endDate, setEndDate] = useState(new Date(ticket?.endDateT));
  const [description, setDescription] = useState(ticket?.description);
  const [progress, setProgress] = useState(ticket?.progressSelect);
  const [contactPartner, setContactPartner] = useState(ticket?.contactPartner);

  useEffect(() => {
    dispatch(fetchTicketById({ticketId: idTicket}));
  }, [dispatch, idTicket]);

  useEffect(() => {
    if (client?.id != null) {
      dispatch(getCustomerbyId({customerId: client?.id}));
    }
  }, [dispatch, client?.id]);

  const handleChangeValueProject = value => {
    setProjectInput(value);
    setClient(value?.clientPartner);
    setContactPartner(value?.contactPartner);
  };

  const updateTicketAPI = useCallback(() => {
    dispatch(
      updateTicket({
        ticketId: ticket.id,
        ticketVersion: ticket.version,
        subject: subject,
        projectId: projectInput?.id,
        progressSelect: progress,
        customerId: client?.id,
        contactPartnerId: contactPartner?.id,
        ticketTypeId: ticketType?.id,
        prioritySelect: priority,
        startDateT: startDate?.toISOString()?.split('T')[0],
        endDateT: endDate?.toISOString()?.split('T')[0],
        description: description,
      }),
    );

    navigation.navigate('TicketDetailsScreen', {
      idTicket: ticket.id,
    });
  }, [
    client?.id,
    contactPartner?.id,
    description,
    dispatch,
    endDate,
    navigation,
    priority,
    progress,
    projectInput?.id,
    startDate,
    subject,
    ticket.id,
    ticket.version,
    ticketType?.id,
  ]);

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
            defaultValue={projectInput}
            onChange={handleChangeValueProject}
            style={styles.picker}
            styleTxt={styles.marginTitle}
          />
          <FormIncrementInput
            title={I18n.t('Helpdesk_Progress')}
            defaultValue={progress.toString()}
            onChange={setProgress}
            decimalSpacer={I18n.t('Base_DecimalSpacer')}
            thousandSpacer={I18n.t('Base_ThousandSpacer')}
          />
          <CustomerSearchBar
            titleKey="Helpdesk_CustomPartner"
            placeholderKey="Helpdesk_CustomPartner"
            defaultValue={client}
            onChange={setClient}
            style={styles.picker}
            styleTxt={styles.marginTitle}
          />
          <View style={styles.input}>
            <Text style={styles.titlte}>
              {I18n.t('Helpdesk_ContactPartner')}
            </Text>
            <AutoCompleteSearch
              style={styles.search}
              objectList={customer?.contactPartnerSet}
              value={contactPartner}
              onChangeValue={setContactPartner}
              placeholder={I18n.t('Helpdesk_ContactPartner')}
              displayValue={displayItemFullname}
              showDetailsPopup={true}
            />
          </View>
          <TicketTypeSearchBar
            titleKey="Helpdesk_Type"
            placeholderKey="Helpdesk_Type"
            defaultValue={ticketType}
            onChange={setTicketType}
            style={styles.picker}
            styleTxt={styles.marginTitle}
          />
          <Picker
            style={styles.picker}
            title={I18n.t('Helpdesk_Priority')}
            onValueChange={setPriority}
            listItems={Ticket.getPriorityList(Colors, I18n)}
            labelField="title"
            valueField="key"
            defaultValue={priority}
          />
          <DateInput
            onDateChange={setStartDate}
            title={I18n.t('Helpdesk_StartDate')}
            defaultDate={startDate}
            style={styles.input}
          />
          <DateInput
            onDateChange={setEndDate}
            title={I18n.t('Helpdesk_EndDate')}
            defaultDate={endDate}
            style={styles.input}
          />
          <FormHtmlInput
            title={I18n.t('Base_Description')}
            onChange={setDescription}
            defaultValue={description}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={updateTicketAPI} />
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
  search: {
    width: '100%',
    marginLeft: 0,
  },
  titlte: {
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
