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

import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  formatDate,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Badge, HeaderContainer, Picker, Text} from '@axelor/aos-mobile-ui';
import {Timesheet as TimesheetType} from '../../../types';
import {getTimesheetPeriod} from '../../../utils';

interface TimesheetPickerProps {
  timesheetList: any[];
  timesheetId?: number;
  onChange: (timesheetId: number) => void;
}

const TimesheetPicker = ({
  timesheetList,
  timesheetId,
  onChange,
}: TimesheetPickerProps) => {
  const I18n = useTranslator();
  const {Timesheet} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const {timesheet: timesheetConfig} = useSelector(state => state.appConfig);

  const displayTimesheet = useCallback(
    (item: any) => {
      const period = getTimesheetPeriod(item);

      if (period == null) return '';

      return `${formatDate(
        period.fromDate,
        I18n.t('Base_DateFormat'),
      )} - ${formatDate(period.toDate, I18n.t('Base_DateFormat'))}`;
    },
    [I18n],
  );

  const renderItem = useCallback(
    (item: any) => {
      const status = TimesheetType.getStatus(
        timesheetConfig?.needValidation,
        item,
      );

      return (
        <View style={styles.item}>
          <Text style={styles.label} numberOfLines={1}>
            {displayTimesheet(item)}
          </Text>
          <Badge
            color={getItemColor(Timesheet?.statusSelect, status)}
            title={getItemTitle(Timesheet?.statusSelect, status)}
            numberOfLines={1}
          />
        </View>
      );
    },
    [
      Timesheet?.statusSelect,
      displayTimesheet,
      getItemColor,
      getItemTitle,
      timesheetConfig?.needValidation,
    ],
  );

  return (
    <HeaderContainer
      expandableFilter={false}
      fixedItems={
        <Picker
          placeholder={I18n.t('Hr_Timesheet')}
          listItems={timesheetList}
          displayValue={displayTimesheet}
          renderItem={renderItem}
          valueField="id"
          defaultValue={timesheetId}
          onValueChange={onChange}
          emptyValue={false}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    flexShrink: 1,
  },
});

export default memo(TimesheetPicker);
