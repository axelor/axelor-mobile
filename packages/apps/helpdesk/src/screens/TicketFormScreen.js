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

import React, {useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  FormInput,
  KeyboardAvoidingScrollView,
  Picker,
  Screen,
  useThemeColor,
  FormHtmlInput,
  checkNullString,
} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useDispatch,
  useTranslator,
  DateInput,
} from '@axelor/aos-mobile-core';
import {createTicket, updateTicket} from '../features/ticketSlice';
import {
  ContactPartnerSearchBar,
  CustomerSearchBar,
  DurationFormInput,
  ProgressFormInput,
  ProjectSearchBar,
  TicketTypeSearchBar,
  UserSearchBar,
} from '../components';
import {Ticket} from '../types/';

const PROJECT_KEY = 'project';
const CUSTOMER_KEY = 'customerPartner';
const CONTACT_KEY = 'contactPartner';

const DEFAULT_TICKET_VALUE = {duration: 0};

const isObjectMissingRequiredField = object => checkNullString(object?.subject);

const TicketFormScreen = ({navigation, route}) => {
  const idTicket = route?.params?.idTicket;
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {ticket} = useSelector(state => state.ticket);

  const [_ticket, setTicket] = useState(
    idTicket != null ? ticket : DEFAULT_TICKET_VALUE,
  );
  const [disabledButton, setDisabledButton] = useState(
    isObjectMissingRequiredField(_ticket),
  );

  const handleTicketFieldChange = useCallback((newValue, fieldName) => {
    setTicket(current => {
      if (current?.[fieldName] === newValue) {
        return current;
      }

      const updatedObject = current == null ? {} : {...current};

      updatedObject[fieldName] = newValue;

      if (fieldName === PROJECT_KEY) {
        updatedObject[CUSTOMER_KEY] = newValue?.clientPartner;
        updatedObject[CONTACT_KEY] = newValue?.contactPartner;
      }

      setDisabledButton(isObjectMissingRequiredField(updatedObject));

      return updatedObject;
    });
  }, []);

  const updateTicketAPI = useCallback(() => {
    dispatch(
      updateTicket({
        ticket: _ticket,
      }),
    );

    navigation.navigate('TicketDetailsScreen', {
      idTicket: _ticket.id,
    });
  }, [dispatch, _ticket, navigation]);

  const createTicketAPI = useCallback(() => {
    dispatch(
      createTicket({
        ticket: _ticket,
      }),
    );

    setTicket(DEFAULT_TICKET_VALUE);
  }, [_ticket, dispatch]);

  return (
    <Screen>
      <KeyboardAvoidingScrollView style={styles.scroll}>
        <View style={styles.container}>
          <FormInput
            style={styles.input}
            title={I18n.t('Hepdesk_Subject')}
            onChange={value => handleTicketFieldChange(value, 'subject')}
            defaultValue={_ticket?.subject}
            required={true}
          />
          <ProgressFormInput
            style={styles.input}
            title={I18n.t('Helpdesk_Progress')}
            defaultValue={_ticket?.progressSelect}
            onChange={value => handleTicketFieldChange(value, 'progressSelect')}
          />
          <ProjectSearchBar
            style={styles.input}
            titleKey="Helpdesk_Project"
            placeholderKey="Helpdesk_Project"
            defaultValue={_ticket?.[PROJECT_KEY]}
            onChange={value => handleTicketFieldChange(value, PROJECT_KEY)}
          />
          <CustomerSearchBar
            titleKey="Helpdesk_CustomPartner"
            placeholderKey="Helpdesk_CustomPartner"
            defaultValue={_ticket?.[CUSTOMER_KEY]}
            onChange={value => handleTicketFieldChange(value, CUSTOMER_KEY)}
          />
          <ContactPartnerSearchBar
            titleKey={I18n.t('Helpdesk_ContactPartner')}
            placeholderKey={I18n.t('Helpdesk_ContactPartner')}
            defaultValue={_ticket?.[CONTACT_KEY]}
            onChange={value => handleTicketFieldChange(value, CONTACT_KEY)}
            client={_ticket?.[CUSTOMER_KEY]}
          />
          <TicketTypeSearchBar
            titleKey="Helpdesk_Type"
            placeholderKey="Helpdesk_Type"
            defaultValue={_ticket?.ticketType}
            onChange={value => handleTicketFieldChange(value, 'ticketType')}
          />
          <Picker
            style={styles.input}
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
            onDateChange={value => handleTicketFieldChange(value, 'startDateT')}
            title={I18n.t('Helpdesk_StartDate')}
            defaultDate={
              _ticket?.startDateT != null ? new Date(_ticket?.startDateT) : null
            }
            style={styles.input}
            nullable={true}
          />
          <DateInput
            onDateChange={value => handleTicketFieldChange(value, 'endDateT')}
            title={I18n.t('Helpdesk_EndDate')}
            defaultDate={
              _ticket?.endDateT != null ? new Date(_ticket?.endDateT) : null
            }
            style={styles.input}
            nullable={true}
          />
          <DateInput
            onDateChange={value =>
              handleTicketFieldChange(value, 'deadlineDateT')
            }
            title={I18n.t('Helpdesk_DeadlineDate')}
            defaultDate={
              _ticket?.deadlineDateT != null
                ? new Date(_ticket?.deadlineDateT)
                : null
            }
            style={styles.input}
            nullable={true}
          />
          <DurationFormInput
            duration={_ticket?.duration}
            onChange={value => handleTicketFieldChange(value, 'duration')}
          />
          <UserSearchBar
            titleKey="Helpdesk_AssignedToUser"
            placeholderKey="Helpdesk_AssignedToUser"
            defaultValue={_ticket?.assignedToUser}
            onChange={value => handleTicketFieldChange(value, 'assignedToUser')}
          />
          <UserSearchBar
            titleKey="Helpdesk_ResponsibleUser"
            placeholderKey="Helpdesk_ResponsibleUser"
            defaultValue={_ticket?.responsibleUser}
            onChange={value =>
              handleTicketFieldChange(value, 'responsibleUser')
            }
          />
          <FormHtmlInput
            title={I18n.t('Base_Description')}
            onChange={value => handleTicketFieldChange(value, 'description')}
            defaultValue={_ticket?.description}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <View style={styles.button_container}>
        <Button
          title={I18n.t('Base_Save')}
          onPress={idTicket != null ? updateTicketAPI : createTicketAPI}
          disabled={disabledButton}
          color={disabledButton ? Colors.secondaryColor : Colors.primaryColor}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    zIndex: 30,
  },
  scroll: {
    height: null,
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
