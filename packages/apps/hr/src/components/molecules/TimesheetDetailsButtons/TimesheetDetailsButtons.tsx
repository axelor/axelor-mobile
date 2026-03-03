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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {TimesheetRefusalPopup} from '../../templates';
import {
  deleteTimesheet,
  updateTimesheetStatus,
} from '../../../features/timesheetSlice';

interface TimesheetDetailsButtonsProps {
  timesheet: any;
  statusSelect: number;
  isEmpty: boolean;
  isManualCreation?: boolean;
}

const TimesheetDetailsButtons = ({
  timesheet,
  statusSelect,
  isEmpty,
  isManualCreation = false,
}: TimesheetDetailsButtonsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {canDelete, readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.Timesheet',
  });
  const {Timesheet} = useTypes();

  const [refusalPopupIsOpen, setRefusalPopupIsOpen] = useState(false);

  const {user} = useSelector((state: any) => state.user);

  const deleteAPI = useCallback(() => {
    dispatch(
      (deleteTimesheet as any)({timesheetId: timesheet.id, userId: user.id}),
    );
    navigation.pop();
  }, [dispatch, navigation, timesheet.id, user.id]);

  const updateStatusAPI = useCallback(
    (toStatus: string) => {
      dispatch(
        (updateTimesheetStatus as any)({
          timesheetId: timesheet.id,
          version: timesheet.version,
          toStatus: toStatus,
          user: user,
        }),
      );
    },
    [dispatch, timesheet, user],
  );

  if (statusSelect === Timesheet?.statusSelect.Draft) {
    return (
      <View style={styles.container}>
        {(isEmpty && canDelete) || (!isEmpty && !readonly) ? (
          <Button
            title={I18n.t(
              isEmpty && !isManualCreation ? 'Hr_Delete' : 'Base_Cancel',
            )}
            onPress={() => {
              isEmpty ? deleteAPI() : updateStatusAPI('cancel');
            }}
            width="45%"
            color={Colors.errorColor}
            iconName={isEmpty && !isManualCreation ? 'trash3-fill' : 'x-lg'}
          />
        ) : null}
        {!readonly && (
          <Button
            title={I18n.t('Hr_Send')}
            onPress={() => updateStatusAPI('confirm')}
            width="45%"
            iconName="send-fill"
            disabled={isEmpty}
          />
        )}
      </View>
    );
  }

  if (
    !readonly &&
    (user?.employee?.hrManager ||
      timesheet.employee?.managerUser?.id === user.id) &&
    statusSelect === Timesheet?.statusSelect.WaitingValidation
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
