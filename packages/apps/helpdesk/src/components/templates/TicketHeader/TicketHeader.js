/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {
  Text,
  useThemeColor,
  Badge,
  checkNullString,
  ProgressBar,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
import {Ticket} from '../../../types/';

const TicketHeader = ({}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {ticket, ticketStatusList, ticketTypeList} = useSelector(
    state => state.ticket,
  );

  const colorStatus = useMemo(() => {
    const colorIndex = ticketStatusList?.findIndex(
      status => status.id === ticket.ticketStatus?.id,
    );
    return Ticket.getStatusColor(colorIndex, Colors);
  }, [Colors, ticketStatusList, ticket.ticketStatus?.id]);

  const colorType = useMemo(() => {
    const colorIndex = ticketTypeList?.findIndex(
      status => status.id === ticket.ticketType?.id,
    );
    return Ticket.getTypeColor(colorIndex, Colors);
  }, [Colors, ticketTypeList, ticket.ticketType?.id]);

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
