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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  ChipSelect,
  NumberBubble,
  Picker,
  ToggleSwitch,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import TimesheetWaitingValidationSearchBar from '../TimesheetWaitingValidationSearchBar/TimesheetWaitingValidationSearchBar';
import {fetchTimesheetToValidate} from '../../../features/timesheetSlice';
import {Timesheet} from '../../../types';

const TimesheetFilters = ({
  mode,
  onChangeStatus = () => {},
  onChangeMode = () => {},
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {totalNumberTimesheetToValidate} = useSelector(
    state => state.timesheet,
  );
  const {timesheet: timesheetConfig} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);
  const {managedEmployeeTotal} = useSelector(state => state.employee);

  const timesheetStatusListItems = useMemo(() => {
    return Timesheet.getStatusList(
      timesheetConfig.needValidation,
      Colors,
      I18n,
    );
  }, [Colors, I18n, timesheetConfig.needValidation]);

  useEffect(() => {
    dispatch(fetchTimesheetToValidate({page: 0, user: user}));
  }, [dispatch, user]);

  return (
    <View style={styles.container}>
      {timesheetConfig.needValidation &&
        (user?.employee?.hrManager || managedEmployeeTotal > 0) && (
          <ToggleSwitch
            leftTitle={I18n.t('Hr_MyTimesheets')}
            rightTitle={I18n.t('Hr_ToValidate')}
            rigthElement={
              <NumberBubble
                style={styles.numberBubble}
                number={totalNumberTimesheetToValidate}
                color={Colors.cautionColor}
                isNeutralBackground={true}
              />
            }
            onSwitch={() => {
              onChangeStatus(null);
              onChangeMode(_mode =>
                _mode === Timesheet.mode.personnal
                  ? Timesheet.mode.validation
                  : Timesheet.mode.personnal,
              );
            }}
          />
        )}
      {mode === Timesheet.mode.personnal &&
        (timesheetConfig.needValidation ? (
          <Picker
            listItems={timesheetStatusListItems}
            title={I18n.t('Hr_Status')}
            onValueChange={onChangeStatus}
            labelField="title"
            valueField="key"
          />
        ) : (
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => onChangeStatus(chiplist[0]?.key)}
            selectionItems={timesheetStatusListItems}
          />
        ))}
      {mode === Timesheet.mode.validation && (
        <TimesheetWaitingValidationSearchBar />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  numberBubble: {
    position: 'absolute',
    right: '5%',
  },
});

export default TimesheetFilters;
