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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {formatDateTime} from '../../../../utils';
import {useTranslator} from '../../../../i18n';
import {processProvider} from '../../../ProcessProvider';
import {getProcessStatusColor} from '../../../helpers';
import {ProcessStatus} from '../../../types';

interface ProcessCardProps {
  style?: any;
  processKey: string;
  name: string;
  status: ProcessStatus;
  executed: boolean;
  startedDate: string;
  endDate: string;
  onSuccess: () => void;
  onError: () => void;
}

const ProcessCard = ({
  style,
  processKey,
  name,
  status,
  executed,
  startedDate,
  endDate,
  onSuccess,
  onError,
}: ProcessCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const styles = useMemo(
    () => getStyles(getProcessStatusColor(status, Colors)?.background),
    [Colors, status],
  );

  const isSuccess = useMemo(() => status === ProcessStatus.Success, [status]);

  const isTouchable = useMemo(() => {
    const isCompleted = isSuccess || status === ProcessStatus.Failed;

    return (
      isCompleted &&
      !executed &&
      typeof onSuccess === 'function' &&
      typeof onError === 'function'
    );
  }, [executed, isSuccess, onError, onSuccess, status]);

  const handleOnPress = useCallback(() => {
    status === ProcessStatus.Success ? onSuccess() : onError();
    processProvider.resolveProcess(processKey);
  }, [status, onSuccess, onError, processKey]);

  return (
    <ObjectCard
      style={[styles.card, style]}
      showArrow={isTouchable}
      touchable={isTouchable}
      onPress={handleOnPress}
      upperTexts={{
        items: [
          {isTitle: true, displayText: name},
          {
            iconName: 'calendar-event',
            indicatorText: I18n.t('Base_StartedOn'),
            displayText: formatDateTime(
              startedDate,
              I18n.t('Base_DateTimeFormat'),
            ),
            hideIf: startedDate == null,
          },
          {
            iconName: isSuccess ? 'calendar-check' : 'calendar-x',
            indicatorText: I18n.t(
              isSuccess ? 'Base_CompletedOn' : 'Base_FaildedOn',
            ),
            displayText: formatDateTime(endDate, I18n.t('Base_DateTimeFormat')),
            hideIf: endDate == null,
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    card: {
      marginHorizontal: 12,
      marginVertical: 4,
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

export default ProcessCard;
