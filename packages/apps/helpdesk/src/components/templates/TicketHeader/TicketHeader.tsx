/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Badge, checkNullString, ProgressBar} from '@axelor/aos-mobile-ui';
import {useSelector, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';

const TicketHeader = ({}) => {
  const {Ticket} = useTypes();
  const {getItemColorFromIndex, getItemColor, getItemTitle} = useTypeHelpers();

  const {ticket, ticketStatusList, ticketTypeList} = useSelector(
    state => state.ticket,
  );

  const colorStatus = useMemo(
    () => getItemColorFromIndex(ticketStatusList, ticket.ticketStatus),
    [getItemColorFromIndex, ticket.ticketStatus, ticketStatusList],
  );

  const colorType = useMemo(
    () => getItemColorFromIndex(ticketTypeList, ticket.ticketType),
    [getItemColorFromIndex, ticketTypeList, ticket.ticketType],
  );

  return (
    <View style={styles.container}>
      {!checkNullString(ticket.ticketSeq) && (
        <Text writingType="title">{ticket.ticketSeq}</Text>
      )}
      {!checkNullString(ticket.subject) && <Text>{ticket.subject}</Text>}
      <View style={styles.badgeContainer}>
        {!checkNullString(ticket.ticketStatus?.name) && (
          <Badge title={ticket.ticketStatus?.name} color={colorStatus} />
        )}
        {!checkNullString(ticket.ticketType?.name) && (
          <Badge title={ticket.ticketType?.name} color={colorType} />
        )}
        {ticket.prioritySelect !== null && (
          <Badge
            title={getItemTitle(Ticket?.prioritySelect, ticket.prioritySelect)}
            color={getItemColor(Ticket?.prioritySelect, ticket.prioritySelect)}
          />
        )}
      </View>
      <ProgressBar value={ticket.progressSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 16,
    gap: 2,
  },
  badgeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TicketHeader;
