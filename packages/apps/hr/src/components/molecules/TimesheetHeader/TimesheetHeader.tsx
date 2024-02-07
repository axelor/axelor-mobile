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
import {
  checkNullString,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  Badge,
  CircleButton,
  Label,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {DatesInterval} from '../../atoms';
import {convertPeriodTimesheet} from '../../../api/timesheet-api';
import {Timesheet} from '../../../types';
import {getDurationUnit} from '../../../utils';

interface TimesheetHeaderProps {
  timesheet: any;
  statusSelect: number;
}

const TimesheetHeader = ({timesheet, statusSelect}: TimesheetHeaderProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();

  const [convertedPeriod, setConvertedPeriod] = useState(0);

  const {mobileSettings} = useSelector((state: any) => state.appConfig);

  const isAddButton = useMemo(
    () =>
      mobileSettings?.isLineCreationOfTimesheetDetailsAllowed &&
      statusSelect === Timesheet.statusSelect.Draft,
    [mobileSettings?.isLineCreationOfTimesheetDetailsAllowed, statusSelect],
  );

  useEffect(() => {
    convertPeriodTimesheet({timesheetId: timesheet.id}).then(res =>
      setConvertedPeriod(res.data.object.periodTotalConvert),
    );
  }, [timesheet.id]);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <DatesInterval
          startDate={timesheet.fromDate}
          endDate={timesheet.toDate}
        />
        <Badge
          style={styles.badge}
          color={Timesheet.getStatusColor(statusSelect, Colors)}
          title={Timesheet.getStatusName(statusSelect, I18n)}
        />
      </View>
      <View style={styles.rowContainer}>
        <View>
          <Text>
            {I18n.t('User_Company')} : {timesheet.company.name}
          </Text>
          <Text>
            {I18n.t('Hr_TotalDuration')} : {convertedPeriod}
            {getDurationUnit(timesheet.timeLoggingPreferenceSelect, I18n)}
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
      {statusSelect === Timesheet.statusSelect.Refused &&
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
