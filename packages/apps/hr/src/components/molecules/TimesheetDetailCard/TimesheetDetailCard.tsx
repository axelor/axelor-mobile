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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useTypes} from '@axelor/aos-mobile-core';
import {CardIconButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {TimesheetCard} from '../../atoms';
import {convertPeriodTimesheet} from '../../../api/timesheet-api';
import {Timesheet as TimesheetType} from '../../../types';

interface TimesheetDetailCardProps {
  item: any;
  isValidationMode?: boolean;
  isActions?: boolean;
  style?: any;
  onPress: () => void;
  onSend: () => void;
  onValidate: () => void;
}

const TimesheetDetailCard = ({
  item,
  isValidationMode = false,
  isActions = true,
  style,
  onPress,
  onSend,
  onValidate,
}: TimesheetDetailCardProps) => {
  const Colors = useThemeColor();
  const {Timesheet} = useTypes();

  const {timesheet: timesheetConfig} = useSelector(
    (state: any) => state.appConfig,
  );
  const {user} = useSelector((state: any) => state.user);

  const [convertedPeriod, setConvertedPeriod] = useState<number>(0);

  const _statusSelect = useMemo(() => {
    return TimesheetType.getStatus(timesheetConfig.needValidation, item);
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
  }, [item.id]);

  return (
    <View style={[styles.container, style]}>
      <TimesheetCard
        statusSelect={_statusSelect}
        startDate={item.fromDate}
        endDate={item.toDate}
        company={item.company.name}
        totalDuration={convertedPeriod}
        durationUnit={item.timeLoggingPreferenceSelect}
        employeeName={isValidationMode ? item.employee?.name : null}
        style={styles.cardContainer}
        onPress={onPress}
      />
      {_isActions && (
        <CardIconButton
          iconName={
            _statusSelect === Timesheet?.statusSelect.Draft
              ? 'send-fill'
              : 'check-lg'
          }
          iconColor={Colors.secondaryColor_dark.background}
          onPress={() => {
            _statusSelect === Timesheet?.statusSelect.Draft
              ? onSend()
              : onValidate();
          }}
          style={styles.flexOneContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 2,
    flex: 1,
  },
  cardContainer: {
    flex: 6,
  },
  flexOneContainer: {
    flex: 1,
  },
});

export default TimesheetDetailCard;
