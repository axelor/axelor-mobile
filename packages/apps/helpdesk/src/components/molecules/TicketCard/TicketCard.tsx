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
import {StyleSheet} from 'react-native';
import {checkNullString, ObjectCard} from '@axelor/aos-mobile-ui';
import {
  formatDateTime,
  formatDuration,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';

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
  allTicketStatus: any[];
  ticketStatus: any;
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
  allTicketStatus,
  ticketStatus,
  allTicketType,
  ticketType,
  onPress,
}: TicketCardProps) => {
  const I18n = useTranslator();
  const {Ticket} = useTypes();
  const {getItemColor, getItemColorFromIndex} = useTypeHelpers();

  const colorStatus = useMemo(
    () => getItemColorFromIndex(allTicketStatus, ticketStatus),
    [allTicketStatus, getItemColorFromIndex, ticketStatus],
  );

  const colorType = useMemo(
    () => getItemColorFromIndex(allTicketType, ticketType),
    [allTicketType, getItemColorFromIndex, ticketType],
  );

  const borderStyle = useMemo(
    () =>
      getStyles(getItemColor(Ticket?.prioritySelect, prioritySelect))?.border,
    [getItemColor, Ticket?.prioritySelect, prioritySelect],
  );

  return (
    <ObjectCard
      style={[borderStyle, style]}
      onPress={onPress}
      sideBadges={{
        items: [
          {
            displayText: ticketStatus?.name,
            color: colorStatus,
          },
          {
            displayText: ticketType?.name,
            color: colorType,
            showIf: !checkNullString(ticketType?.name),
          },
        ],
      }}
      upperTexts={{
        items: [
          {
            isTitle: true,
            displayText: `${I18n.t('Helpdesk_Ticket')} n° ${ticketSeq}`,
          },
          {
            hideIfNull: true,
            displayText: subject,
          },
          {
            hideIf: progressSelect == null,
            displayText: `${I18n.t('Helpdesk_Progress')}: ${progressSelect} %`,
          },
          {
            hideIf: duration == null,
            displayText: `${I18n.t('Helpdesk_Duration')}: ${formatDuration(
              duration,
            )}`,
          },
          {
            hideIf: checkNullString(deadlineDateT),
            indicatorText: `${I18n.t('Helpdesk_Deadline')} :`,
            displayText: formatDateTime(
              deadlineDateT,
              I18n.t('Base_DateTimeFormat'),
            ),
            iconName: 'calendar-x',
          },
          {
            hideIf: checkNullString(responsibleUser),
            displayText: `${I18n.t(
              'Helpdesk_User_In_Charge',
            )}: ${responsibleUser}`,
          },
          {
            hideIf: checkNullString(assignedToUser),
            displayText: `${I18n.t('Helpdesk_Assigned_To')}: ${assignedToUser}`,
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color?.background,
    },
  });

export default TicketCard;
