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
import {StyleSheet, View} from 'react-native';
import {
  checkNullString,
  PeriodDisplay,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {Badge, CircleButton, Label, Text} from '@axelor/aos-mobile-ui';
import {convertPeriodTimesheet} from '../../../api/timesheet-api';

interface TimesheetHeaderProps {
  timesheet: any;
  statusSelect: number;
}

const TimesheetHeader = ({timesheet, statusSelect}: TimesheetHeaderProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.TimesheetLine',
  });
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.Timesheet',
  });
  const {Timesheet} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);

  const [convertedPeriod, setConvertedPeriod] = useState<{
    value: number;
    title: string;
  }>(null);

  const isAddButton = useMemo(
    () =>
      mobileSettings?.isLineCreationOfTimesheetDetailsAllowed &&
      statusSelect === Timesheet?.statusSelect.Draft &&
      canCreate &&
      !readonly,
    [
      Timesheet?.statusSelect.Draft,
      canCreate,
      mobileSettings?.isLineCreationOfTimesheetDetailsAllowed,
      readonly,
      statusSelect,
    ],
  );

  useEffect(() => {
    convertPeriodTimesheet({timesheetId: timesheet.id})
      .then(res => {
        if (res?.data?.object != null) {
          setConvertedPeriod({
            value: res.data.object.periodTotalConvert,
            title: res.data.object.periodTotalConvertTitle,
          });
        } else {
          setConvertedPeriod(null);
        }
      })
      .catch(() => setConvertedPeriod(null));
  }, [timesheet]);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <PeriodDisplay
          startDate={timesheet.fromDate}
          endDate={timesheet.toDate}
        />
        <Badge
          style={styles.badge}
          color={getItemColor(Timesheet?.statusSelect, statusSelect)}
          title={getItemTitle(Timesheet?.statusSelect, statusSelect)}
        />
      </View>
      <View style={styles.rowContainer}>
        <View>
          <Text>
            {I18n.t('User_Company')} : {timesheet.company.name}
          </Text>
          <Text>
            {I18n.t('Hr_TotalDuration')} :
            {convertedPeriod != null
              ? ` ${convertedPeriod.value} ${convertedPeriod.title}`
              : ' -'}
          </Text>
        </View>
        {isAddButton && (
          <CircleButton
            size={38}
            iconName="plus-lg"
            onPress={() =>
              navigation.navigate('TimesheetLineFormScreen', {
                timesheetId: timesheet.id,
              })
            }
          />
        )}
      </View>
      {statusSelect === Timesheet?.statusSelect.Refused &&
        !checkNullString(timesheet.groundForRefusal) && (
          <Label
            message={`${I18n.t('Hr_GroundForRefusal')} : ${
              timesheet.groundForRefusal
            }`}
            type="error"
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    margin: 0,
  },
});

export default TimesheetHeader;
