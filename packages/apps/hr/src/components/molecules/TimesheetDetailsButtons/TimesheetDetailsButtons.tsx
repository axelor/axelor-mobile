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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {TimesheetRefusalPopup} from '../../templates';
import {
  deleteTimesheet,
  updateTimesheetStatus,
} from '../../../features/timesheetSlice';
import {Timesheet} from '../../../types';

interface TimesheetDetailsButtonsProps {
  timesheet: any;
  statusSelect: number;
  isEmpty: boolean;
}

const TimesheetDetailsButtons = ({
  timesheet,
  statusSelect,
  isEmpty,
}: TimesheetDetailsButtonsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [refusalPopupIsOpen, setRefusalPopupIsOpen] = useState(false);

  const {user} = useSelector((state: any) => state.user);

  const deleteTimesheetAPI = useCallback(() => {
    dispatch(
      (deleteTimesheet as any)({timesheetId: timesheet.id, userId: user.id}),
    );
    navigation.pop();
  }, [dispatch, navigation, timesheet.id, user.id]);

  if (statusSelect === Timesheet.statusSelect.Draft) {
    return (
      <View style={styles.container}>
        <Button
          title={I18n.t('Hr_Delete')}
          onPress={deleteTimesheetAPI}
          width="45%"
          color={Colors.errorColor}
          iconName="trash3-fill"
        />
        <Button
          title={I18n.t('Hr_Send')}
          onPress={() =>
            dispatch(
              (updateTimesheetStatus as any)({
                timesheetId: timesheet.id,
                version: timesheet.version,
                toStatus: 'confirm',
                user: user,
              }),
            )
          }
          width="45%"
          iconName="send-fill"
          disabled={isEmpty}
        />
      </View>
    );
  }

  if (
    (user?.employee?.hrManager ||
      timesheet.employee?.managerUser?.id === user.id) &&
    statusSelect === Timesheet.statusSelect.WaitingValidation
  ) {
    return (
      <View style={styles.container}>
        <Button
          title={I18n.t('Hr_Refuse')}
          onPress={() => setRefusalPopupIsOpen(true)}
          width="45%"
          color={Colors.errorColor}
          iconName="x-lg"
        />
        <TimesheetRefusalPopup
          isOpen={refusalPopupIsOpen}
          timesheet={timesheet}
          onCancel={() => setRefusalPopupIsOpen(false)}
        />
        <Button
          title={I18n.t('Hr_Validate')}
          onPress={() =>
            dispatch(
              (updateTimesheetStatus as any)({
                timesheetId: timesheet.id,
                version: timesheet.version,
                toStatus: 'validate',
                user: user,
              }),
            )
          }
          width="45%"
          iconName="check-lg"
        />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default TimesheetDetailsButtons;
