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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from '@axelor/aos-mobile-core';
import {CardIconButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {TimesheetCard} from '../../atoms';
import {Timesheet} from '../../../types';

interface TimesheetDetailCardProps {
  statusSelect: number;
  startDate: string;
  endDate: string;
  company: string;
  totalDuration: number;
  employeeName?: string;
  employeeManagerId?: number;
  isActions?: boolean;
  style?: any;
  onPress: () => void;
}

const TimesheetDetailCard = ({
  statusSelect,
  startDate,
  endDate,
  company,
  totalDuration,
  employeeName,
  employeeManagerId,
  isActions = true,
  style,
  onPress,
}: TimesheetDetailCardProps) => {
  const Colors = useThemeColor();

  const {timesheet: timesheetConfig} = useSelector(
    (state: any) => state.appConfig,
  );
  const {user} = useSelector((state: any) => state.user);

  const _statusSelect = useMemo(() => {
    if (
      !timesheetConfig.needValidation &&
      statusSelect !== Timesheet.statusSelect.Validate
    ) {
      return Timesheet.statusSelect.Draft;
    }

    return statusSelect;
  }, [statusSelect, timesheetConfig]);

  const userCanValidate = useMemo(() => {
    if (
      (user?.employee?.hrManager || employeeManagerId === user.id) &&
      _statusSelect === Timesheet.statusSelect.WaitingValidation
    ) {
      return true;
    }
    return false;
  }, [employeeManagerId, _statusSelect, user?.employee?.hrManager, user.id]);

  const _isActions = useMemo(() => {
    if (
      isActions &&
      (_statusSelect === Timesheet.statusSelect.Draft ||
        (_statusSelect === Timesheet.statusSelect.WaitingValidation &&
          userCanValidate))
    ) {
      return true;
    }

    return false;
  }, [isActions, _statusSelect, userCanValidate]);

  const handleSend = () => {
    console.log('handleSend');
  };

  const handleValidate = () => {
    console.log('handleValidate');
  };

  return (
    <View style={[styles.container, style]}>
      <TimesheetCard
        statusSelect={_statusSelect}
        startDate={startDate}
        endDate={endDate}
        company={company}
        totalDuration={totalDuration}
        employeeName={employeeName}
        style={styles.cardContainer}
        onPress={onPress}
      />
      {_isActions && (
        <View style={styles.flexOneContainer}>
          <CardIconButton
            iconName={
              _statusSelect === Timesheet.statusSelect.Draft
                ? 'paper-plane'
                : 'check'
            }
            iconColor={Colors.secondaryColor_dark.background}
            onPress={() => {
              _statusSelect === Timesheet.statusSelect.Draft
                ? handleSend()
                : handleValidate();
            }}
            style={styles.flexOneContainer}
          />
        </View>
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
  },
  cardContainer: {
    flex: 6,
  },
  flexOneContainer: {
    flex: 1,
  },
});

export default TimesheetDetailCard;
