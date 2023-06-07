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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {checkNullString, DropdownCardSwitch, Text} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useSelector,
  formatDateTime,
  formatDuration,
} from '@axelor/aos-mobile-core';

const TicketDropdownCards = ({}) => {
  const I18n = useTranslator();

  const {ticket} = useSelector(state => state.ticket);

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        styleTitle={styles.textTitle}
        dropdownItems={[
          {
            title: I18n.t('Helpdesk_General_Informations'),
            key: 1,
            childrenComp: (
              <>
                {ticket.project && (
                  <Text>{`${I18n.t('Helpdesk_Project')}: ${
                    ticket.project?.fullName
                  }`}</Text>
                )}
                {ticket.customerPartner && (
                  <Text>{`${I18n.t('Helpdesk_CustomPartner')}: ${
                    ticket.customerPartner.fullName
                  }`}</Text>
                )}
                {ticket.contactPartner && (
                  <Text>{`${I18n.t('Helpdesk_ContactPartner')}: ${
                    ticket.contactPartner.fullName
                  }`}</Text>
                )}
                {!checkNullString(ticket.assignedToUser) && (
                  <Text>{`${I18n.t('Helpdesk_Assigned_To')}: ${
                    ticket.assignedToUser
                  }`}</Text>
                )}
                {!checkNullString(ticket.responsibleUser) && (
                  <Text>{`${I18n.t('Helpdesk_User_In_Charge')}: ${
                    ticket.responsibleUser
                  }`}</Text>
                )}
              </>
            ),
          },
          {
            title: I18n.t('Helpdesk_Timing'),
            key: 2,
            childrenComp: (
              <>
                {!checkNullString(ticket.deadlineDateT) && (
                  <Text>{`${I18n.t('Helpdesk_Deadline')}: ${formatDateTime(
                    ticket.deadlineDateT,
                    I18n.t('Base_DateTimeFormat'),
                  )}`}</Text>
                )}
                {!checkNullString(ticket.startDateT) && (
                  <Text>{`${I18n.t('Helpdesk_StartDate')}: ${formatDateTime(
                    ticket.startDateT,
                    I18n.t('Base_DateTimeFormat'),
                  )}`}</Text>
                )}
                {!checkNullString(ticket.endDateT) && (
                  <Text>{`${I18n.t('Helpdesk_EndDate')}: ${formatDateTime(
                    ticket.endDateT,
                    I18n.t('Base_DateTimeFormat'),
                  )}`}</Text>
                )}
                {ticket.duration !== null && (
                  <Text>{`${I18n.t('Helpdesk_Duration')}: ${formatDuration(
                    ticket.duration,
                  )}`}</Text>
                )}
              </>
            ),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default TicketDropdownCards;
