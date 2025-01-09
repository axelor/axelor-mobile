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

import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Badge,
  Card,
  checkNullString,
  Icon,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  formatDateTime,
  formatDuration,
} from '@axelor/aos-mobile-core';
import Ticket from '../../../types/ticket';

interface TicketCardProps {
  style?: any;
  ticketSeq: string;
  subject: string;
  progressSelect: number;
  duration: number;
  deadlineDateT: string;
  responsibleUser: string;
  assignedToUser: string;
  prioritySelect: number;
  statusSelect: number;
  allTicketType?: any;
  ticketType?: any;
  onPress: () => void;
}
const TicketCard = ({
  style,
  ticketSeq,
  subject,
  progressSelect,
  duration,
  deadlineDateT,
  responsibleUser,
  assignedToUser,
  prioritySelect,
  statusSelect,
  allTicketType,
  ticketType,
  onPress,
}: TicketCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const colorType = useMemo(() => {
    const colorIndex = allTicketType?.findIndex(
      status => status.id === ticketType?.id,
    );
    return Ticket.getTypeColor(colorIndex, Colors);
  }, [Colors, allTicketType, ticketType?.id]);

  const borderStyle = useMemo(() => {
    return getStyles(Ticket.getPriorityColor(prioritySelect, Colors))?.border;
  }, [prioritySelect, Colors]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.leftContainer}>
          <Text style={styles.txtImportant}>
            {`${I18n.t('Helpdesk_Ticket')} n° ${ticketSeq}`}
          </Text>
          {!checkNullString(subject) && <Text>{subject}</Text>}
          {progressSelect !== null && (
            <Text>{`${I18n.t('Helpdesk_Progress')}: ${progressSelect} %`}</Text>
          )}
          {duration !== null && (
            <Text>{`${I18n.t('Helpdesk_Duration')}: ${formatDuration(
              duration,
            )}`}</Text>
          )}
          {!checkNullString(deadlineDateT) && (
            <LabelText
              iconName="calendar-times"
              title={`${I18n.t('Helpdesk_Deadline')} :`}
              value={formatDateTime(
                deadlineDateT,
                I18n.t('Base_DateTimeFormat'),
              )}
            />
          )}
          {!checkNullString(responsibleUser) && (
            <Text>{`${I18n.t(
              'Helpdesk_User_In_Charge',
            )}: ${responsibleUser}`}</Text>
          )}
          {!checkNullString(assignedToUser) && (
            <Text>{`${I18n.t(
              'Helpdesk_Assigned_To',
            )}: ${assignedToUser}`}</Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.badgeContainer}>
            <Badge
              title={Ticket.getStatus(statusSelect, I18n)}
              color={Ticket.getStatusColor(statusSelect, Colors)}
            />
            {!checkNullString(ticketType?.name) && (
              <Badge title={ticketType?.name} color={colorType} />
            )}
          </View>
          <Icon
            style={styles.chevron}
            name="chevron-right"
            color={Colors.secondaryColor.background_light}
            size={20}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color?.background,
    },
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  leftContainer: {
    width: '50%',
    flexDirection: 'column',
  },
  rightContainer: {
    width: '50%',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  txtImportant: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  chevron: {marginTop: '20%'},
});

export default TicketCard;
