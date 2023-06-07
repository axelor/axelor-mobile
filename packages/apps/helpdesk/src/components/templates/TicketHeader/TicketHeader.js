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
import {
  Text,
  useThemeColor,
  Badge,
  checkNullString,
  ProgressBar,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
import {Ticket} from '../../../types/';

const TicketHeader = ({colorIndex}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {ticket} = useSelector(state => state.ticket);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInfo}>
        {!checkNullString(ticket.ticketSeq) && (
          <Text style={styles.textTitle}>{ticket.ticketSeq}</Text>
        )}
        <View style={styles.badgeContainer}>
          <Badge
            title={Ticket.getStatus(ticket.statusSelect, I18n)}
            color={Ticket.getStatusColor(ticket.statusSelect, Colors)}
          />
          {!checkNullString(ticket.ticketType?.name) && (
            <Badge
              title={ticket.ticketType?.name}
              color={Ticket.getTypeColor(colorIndex, Colors)}
            />
          )}
        </View>
      </View>
      <View style={styles.headerInfo}>
        <View style={styles.halfContainer}>
          {!checkNullString(ticket.subject) && <Text>{ticket.subject}</Text>}
        </View>
        <View style={styles.halfContainerBadge}>
          {ticket.prioritySelect !== null && (
            <Badge
              title={Ticket.getPriority(ticket.prioritySelect, I18n)}
              color={Ticket.getPriorityColor(ticket.prioritySelect, Colors)}
            />
          )}
        </View>
      </View>
      <ProgressBar value={ticket.progressSelect} style={styles.progressBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  textTitle: {
    fontWeight: 'bold',
  },
  progressBar: {
    width: '90%',
    marginLeft: '5%',
  },
  halfContainer: {
    width: '50%',
  },
  halfContainerBadge: {
    width: '50%',
    marginLeft: '25%',
  },
});

export default TicketHeader;
