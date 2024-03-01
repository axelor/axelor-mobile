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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useThemeColor, ObjectCard} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../../i18n';
import {formatDateTime} from '../../../../utils';
import {ProcessStatus} from '../../../../components';
import {ProcessHistory} from '../../../types';

interface ProccessHistoryCardProps {
  style?: any;
  status: ProcessStatus;
  name: string;
  startedDate: string;
  completedDate: string;
  failedDate: string;
  completed: boolean;
  resolved: boolean;
  onSuccess: () => void;
  onError: () => void;
}

const ProccessHistoryCard = ({
  style,
  status,
  name,
  startedDate,
  completedDate,
  failedDate,
  completed,
  resolved,
  onSuccess,
  onError,
}: ProccessHistoryCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    return getStyles(ProcessHistory.getStatusColor(status, Colors).background)
      ?.border;
  }, [Colors, status]);

  const handleOnProcess = useCallback(() => {
    status === ProcessStatus.COMPLETED ? onSuccess() : onError();
  }, [status, onSuccess, onError]);

  return (
    <ObjectCard
      onPress={handleOnProcess}
      style={[borderStyle, style]}
      upperTexts={{
        items: [
          {isTitle: true, displayText: name},
          {
            iconName: 'calendar-event',
            indicatorText: I18n.t('User_ProcessHistory_StartedOn'),
            displayText: formatDateTime(startedDate, I18n.t('Base_DateFormat')),
          },
          {
            iconName: 'calendar-check',
            indicatorText: I18n.t('User_ProcessHistory_CompletedOn'),
            displayText: formatDateTime(
              completedDate,
              I18n.t('Base_DateFormat'),
            ),
            hideIf: status !== ProcessStatus.COMPLETED || completedDate == null,
          },
          {
            iconName: 'calendar-check',
            indicatorText: I18n.t('User_ProcessHistory_FailedOn'),
            displayText: formatDateTime(failedDate, I18n.t('Base_DateFormat')),
            hideIf: status !== ProcessStatus.FAILED || failedDate == null,
          },
        ],
      }}
      showArrow={completed && !resolved}
      touchable={completed && !resolved}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    border: {borderLeftWidth: 7, borderLeftColor: color},
  });

export default ProccessHistoryCard;
