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

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {TimesheetRefusalPopup} from '../../templates';
import {updateTimesheetStatus} from '../../../features/timesheetSlice';
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

  const updateStatusAPI = status => {
    dispatch(
      (updateTimesheetStatus as any)({
        timesheetId: timesheet.id,
        version: timesheet.version,
        toStatus: status,
        user: user,
      }),
    );
  };

  if (statusSelect === Timesheet.statusSelect.Draft) {
    return (
      <View style={styles.container}>
        <Button
          title={I18n.t('Base_Cancel')}
          onPress={() => {
            updateStatusAPI('cancel');
            navigation.pop();
          }}
          width="45%"
          color={Colors.errorColor}
          iconName="x-lg"
        />
        <Button
          title={I18n.t('Hr_Send')}
          onPress={() => updateStatusAPI('confirm')}
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
          onPress={() => updateStatusAPI('validate')}
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
