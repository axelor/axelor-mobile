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

import React, {useEffect, useMemo, useState} from 'react';
import {useSelector, useTranslator, useTypes} from '@axelor/aos-mobile-core';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {TimesheetCard} from '../../atoms';
import {convertPeriodTimesheet} from '../../../api/timesheet-api';
import {Timesheet as TimesheetType} from '../../../types';

interface TimesheetDetailCardProps {
  item: any;
  isValidationMode?: boolean;
  isActions?: boolean;
  onPress: () => void;
  onSend: () => void;
  onValidate: () => void;
}

const TimesheetDetailCard = ({
  item,
  isValidationMode = false,
  isActions = true,
  onPress,
  onSend,
  onValidate,
}: TimesheetDetailCardProps) => {
  const I18n = useTranslator();
  const {Timesheet} = useTypes();

  const {timesheet: timesheetConfig} = useSelector(
    (state: any) => state.appConfig,
  );
  const {user} = useSelector((state: any) => state.user);

  const [convertedPeriod, setConvertedPeriod] = useState<number>(0);

  const _statusSelect = useMemo(() => {
    return TimesheetType.getStatus(timesheetConfig?.needValidation, item);
  }, [item, timesheetConfig]);

  const userCanValidate = useMemo(() => {
    if (
      (user?.employee?.hrManager ||
        item.employee?.managerUser?.id === user.id) &&
      _statusSelect === Timesheet?.statusSelect.WaitingValidation
    ) {
      return true;
    }
    return false;
  }, [
    user?.employee?.hrManager,
    user.id,
    item.employee?.managerUser?.id,
    _statusSelect,
    Timesheet?.statusSelect,
  ]);

  const _isActions = useMemo(() => {
    if (
      isActions &&
      (_statusSelect === Timesheet?.statusSelect.Draft ||
        (_statusSelect === Timesheet?.statusSelect.WaitingValidation &&
          userCanValidate))
    ) {
      return true;
    }

    return false;
  }, [isActions, _statusSelect, Timesheet?.statusSelect, userCanValidate]);

  useEffect(() => {
    convertPeriodTimesheet({timesheetId: item.id})
      .then(res => {
        if (res?.data?.object != null) {
          setConvertedPeriod(res.data.object.periodTotalConvert);
        } else {
          setConvertedPeriod(0);
        }
      })
      .catch(() => setConvertedPeriod(0));
  }, [item]);

  return (
    <ActionCard
      translator={I18n.t}
      actionList={
        _isActions && [
          {
            iconName: 'send-fill',
            helper: I18n.t('Hr_Send'),
            onPress: onSend,
            hidden: _statusSelect !== Timesheet?.statusSelect.Draft,
          },
          {
            iconName: 'check-lg',
            helper: I18n.t('Hr_Validate'),
            onPress: onValidate,
            hidden: _statusSelect === Timesheet?.statusSelect.Draft,
          },
        ]
      }>
      <TimesheetCard
        statusSelect={_statusSelect}
        startDate={item.fromDate}
        endDate={item.toDate}
        company={item.company.name}
        totalDuration={convertedPeriod}
        durationUnit={item.timeLoggingPreferenceSelect}
        employeeName={isValidationMode ? item.employee?.name : null}
        onPress={onPress}
      />
    </ActionCard>
  );
};

export default TimesheetDetailCard;
