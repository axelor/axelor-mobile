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
    <View style={styles.headerContainer}>
      <View style={styles.headerInfo}>
        <View style={styles.textContainer}>
          {!checkNullString(ticket.ticketSeq) && (
            <Text writingType="title">{ticket.ticketSeq}</Text>
          )}
          {!checkNullString(ticket.subject) && <Text>{ticket.subject}</Text>}
        </View>
        <View style={styles.badgeContainer}>
          <View style={styles.upperBadgesContainer}>
            {!checkNullString(ticket.ticketStatus?.name) && (
              <Badge title={ticket.ticketStatus?.name} color={colorStatus} />
            )}
            {!checkNullString(ticket.ticketType?.name) && (
              <Badge title={ticket.ticketType?.name} color={colorType} />
            )}
          </View>
          {ticket.prioritySelect !== null && (
            <Badge
              title={getItemTitle(
                Ticket?.prioritySelect,
                ticket.prioritySelect,
              )}
              color={getItemColor(
                Ticket?.prioritySelect,
                ticket.prioritySelect,
              )}
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
    marginHorizontal: 16,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  textContainer: {
    width: '50%',
  },
  badgeContainer: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  upperBadgesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
  },
});

export default TicketHeader;
