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

const isObjectMissingRequiredField = object => checkNullString(object?.subject);

const TicketFormScreen = ({navigation, route}) => {
  const idTicket = route?.params?.idTicket;
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {ticket} = useSelector(state => state.ticket);

  const [_ticket, setTicket] = useState(idTicket != null ? ticket : {});
  const [ticketType, setTicketType] = useState(ticket?.ticketType);
  const [project, setProject] = useState(ticket?.project);
  const [client, setClient] = useState(ticket?.customerPartner);
  const [contactPartner, setContactPartner] = useState(ticket?.contactPartner);
  const [assignedTo, setAssignedTo] = useState(ticket?.assignedToUser);
  const [responsibleUser, setResponsibleUser] = useState(
    ticket?.responsibleUser,
  );
  const [disabledButton, setDisabledButton] = useState(
    isObjectMissingRequiredField(_ticket),
  );

  const handleTicketFieldChange = (newValue, fieldName) => {
    setTicket(current => {
      if (!current) {
        return {[fieldName]: newValue};
      }
      current[fieldName] = newValue;
      return current;
    });
    setDisabledButton(isObjectMissingRequiredField(_ticket));
  };

  const handleChangeValueProject = value => {
    setProject(value);
    setClient(value?.clientPartner);
    setContactPartner(value?.contactPartner);
  };

  const updateTicketAPI = useCallback(() => {
    dispatch(
      updateTicket({
        ticket: {
          ..._ticket,
          ticketType: ticketType ? {id: ticketType?.id} : null,
          project: project ? {id: project?.id} : null,
          customerPartner: client ? {id: client?.id} : null,
          contactPartner: contactPartner ? {id: contactPartner.id} : null,
          assignedToUser: assignedTo ? {id: assignedTo?.id} : null,
          responsibleUser: responsibleUser ? {id: responsibleUser?.id} : null,
        },
      }),
    );

    navigation.navigate('TicketDetailsScreen', {
      idTicket: _ticket.id,
    });
  }, [
    dispatch,
    _ticket,
    ticketType,
    project,
    client,
    contactPartner,
    assignedTo,
    responsibleUser,
    navigation,
  ]);

  const createTicketAPI = useCallback(() => {
    dispatch(
      createTicket({
        ticket: {
          ..._ticket,
          ticketType: ticketType ? {id: ticketType?.id} : null,
          project: project ? {id: project?.id} : null,
          customerPartner: client ? {id: client?.id} : null,
          contactPartner: contactPartner ? {id: contactPartner.id} : null,
          assignedToUser: assignedTo ? {id: assignedTo?.id} : null,
          responsibleUser: responsibleUser ? {id: responsibleUser?.id} : null,
        },
      }),
    );
    setTicket({});
    setTicketType(null);
    setProject(null);
    setClient(null);
    setContactPartner(null);
    setAssignedTo(null);
    setResponsibleUser(null);
  }, [
    _ticket,
    assignedTo,
    client,
    contactPartner,
    dispatch,
    project,
    responsibleUser,
    ticketType,
  ]);

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
            title={I18n.t('Helpdesk_Progress')}
            defaultValue={_ticket?.progressSelect}
            onChange={value => handleTicketFieldChange(value, 'progressSelect')}
          />
          <ProjectSearchBar
            titleKey="Helpdesk_Project"
            placeholderKey="Helpdesk_Project"
            defaultValue={project}
            onChange={handleChangeValueProject}
            style={styles.picker}
            styleTxt={styles.marginTitle}
          />
          <CustomerSearchBar
            titleKey="Helpdesk_CustomPartner"
            placeholderKey="Helpdesk_CustomPartner"
            defaultValue={client}
            onChange={setClient}
            style={styles.picker}
            styleTxt={styles.marginTitle}
          />
          <ContactPartnerSearchBar
            titleKey={I18n.t('Helpdesk_ContactPartner')}
            placeholderKey={I18n.t('Helpdesk_ContactPartner')}
            defaultValue={contactPartner}
            onChange={setContactPartner}
            style={styles.picker}
            styleTxt={styles.marginTitle}
          />
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
            styleTxt={styles.pickerTitle}
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
            defaultDate={
              _ticket?.startDateT != null ? new Date(_ticket?.startDateT) : null
            }
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
            defaultDate={
              _ticket?.endDateT != null ? new Date(_ticket?.endDateT) : null
            }
            style={styles.input}
          />
          <DateInput
            onDateChange={value =>
              handleTicketFieldChange(
                value.toISOString()?.split('T')[0],
                'deadlineDateT',
              )
            }
            title={I18n.t('Helpdesk_DeadlineDate')}
            defaultDate={
              _ticket?.deadlineDateT != null
                ? new Date(_ticket?.deadlineDateT)
                : null
            }
            style={styles.input}
          />
          <DurationFormInput
            duration={_ticket?.duration}
            onChange={value => handleTicketFieldChange(value, 'duration')}
          />
          <UserSearchBar
            titleKey="Helpdesk_AssignedToUser"
            placeholderKey="Helpdesk_AssignedToUser"
            defaultValue={assignedTo}
            onChange={setAssignedTo}
            style={styles.picker}
            styleTxt={styles.marginTitle}
          />
          <UserSearchBar
            titleKey="Helpdesk_ResponsibleUser"
            placeholderKey="Helpdesk_ResponsibleUser"
            defaultValue={responsibleUser}
            onChange={setResponsibleUser}
            style={styles.picker}
            styleTxt={styles.marginTitle}
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
  picker: {
    width: '100%',
    marginLeft: 5,
  },
  pickerTitle: {
    marginLeft: 5,
  },
  marginTitle: {
    marginLeft: 28,
  },
  search: {
    width: '100%',
    marginLeft: 0,
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
