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
import {ScrollView, StyleSheet, View} from 'react-native';
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
  UserSearchBar,
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

  const [projectInput, setProjectInput] = useState(ticket?.project);
  const [client, setClient] = useState(ticket?.customerPartner);
  const [contactPartner, setContactPartner] = useState(ticket?.contactPartner);
  const [assignedTo, setAssignedTo] = useState(ticket?.assignedToUser);
  const [_ticket, setTicket] = useState(idTicket != null ? ticket : {});

  const handleTicketFieldChange = (newValue, fieldName) => {
    setTicket(current => {
      if (!current) {
        return {[fieldName]: newValue};
      }
      current[fieldName] = newValue;
      return current;
    });
  };

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
        ticket: {
          ..._ticket,
          ticketType: _ticket?.ticketType
            ? {id: _ticket?.ticketType?.id}
            : null,
          project: projectInput ? {id: projectInput?.id} : null,
          customerPartner: client ? {id: client?.id} : null,
          contactPartner: contactPartner ? {id: contactPartner.id} : null,
          assignedToUser: assignedTo ? {id: assignedTo?.id} : null,
        },
      }),
    );
    navigation.navigate('TicketDetailsScreen', {
      idTicket: _ticket.id,
    });
  }, [
    _ticket,
    dispatch,
    navigation,
    contactPartner,
    client,
    projectInput,
    assignedTo,
  ]);

  return (
    <Screen>
      <KeyboardAvoidingScrollView>
        <ScrollView contentContainerStyle={styles.container}>
          <FormInput
            style={styles.input}
            title={I18n.t('Hepdesk_Subject')}
            onChange={value => handleTicketFieldChange(value, 'subject')}
            defaultValue={_ticket.subject}
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
            defaultValue={_ticket.progressSelect?.toString()}
            onChange={value => handleTicketFieldChange(value, 'progressSelect')}
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
            defaultValue={_ticket?.ticketType}
            onChange={value => handleTicketFieldChange(value, 'ticketType')}
            style={styles.picker}
            styleTxt={styles.marginTitle}
          />
          <Picker
            style={styles.picker}
            title={I18n.t('Helpdesk_Priority')}
            onValueChange={value =>
              handleTicketFieldChange(value, 'prioritySelect')
            }
            listItems={Ticket.getPriorityList(Colors, I18n)}
            labelField="title"
            valueField="key"
            defaultValue={_ticket?.prioritySelect}
          />
          <DateInput
            onDateChange={value =>
              handleTicketFieldChange(
                value.toISOString()?.split('T')[0],
                'startDateT',
              )
            }
            title={I18n.t('Helpdesk_StartDate')}
            defaultDate={new Date(_ticket?.startDateT)}
            style={styles.input}
          />
          <DateInput
            onDateChange={value =>
              handleTicketFieldChange(
                value.toISOString()?.split('T')[0],
                'endDateT',
              )
            }
            title={I18n.t('Helpdesk_EndDate')}
            defaultDate={new Date(ticket?.endDateT)}
            style={styles.input}
          />
          <UserSearchBar
            titleKey="Helpdesk_assignedToUser"
            placeholderKey="Helpdesk_assignedToUser"
            defaultValue={assignedTo}
            onChange={setAssignedTo}
            style={styles.picker}
            styleTxt={styles.marginTitle}
          />
          <FormHtmlInput
            title={I18n.t('Base_Description')}
            onChange={value => handleTicketFieldChange(value, 'description')}
            defaultValue={_ticket?.description}
          />
        </ScrollView>
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
