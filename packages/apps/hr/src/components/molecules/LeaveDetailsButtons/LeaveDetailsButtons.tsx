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

import React, {useCallback, useMemo, useState} from 'react';
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
import {
  cancelLeave,
  deleteLeave,
  sendLeave,
  validateLeave,
} from '../../../features/leaveSlice';
import {LeaveRefusalPopup} from '../../templates';

interface LeaveDetailsButtonsProps {
  statusSelect: number;
  leaveRequest: any;
}

const LeaveDetailsButtons = ({
  statusSelect,
  leaveRequest,
}: LeaveDetailsButtonsProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {LeaveRequest} = useTypes();
  const {canDelete, readonly} = usePermitted({
    modelName: 'com.axelor.apps.hr.db.LeaveRequest',
  });

  const [refusalPopupIsOpen, setRefusalPopupIsOpen] = useState(false);

  const {user} = useSelector(state => state.user);

  const leaveRequestParams = useMemo(
    () => ({
      leaveRequestId: leaveRequest.id,
      version: leaveRequest.version,
      user: user,
      userId: user.id,
      companyId: user.activeCompany?.id,
    }),
    [leaveRequest, user],
  );

  const sendLeaveAPI = useCallback(() => {
    dispatch((sendLeave as any)(leaveRequestParams));
  }, [dispatch, leaveRequestParams]);

  const validateLeaveAPI = useCallback(() => {
    dispatch((validateLeave as any)(leaveRequestParams));
  }, [dispatch, leaveRequestParams]);

  const cancelLeaveAPI = useCallback(() => {
    dispatch((cancelLeave as any)(leaveRequestParams));
  }, [dispatch, leaveRequestParams]);

  const deleteLeaveAPI = useCallback(() => {
    dispatch((deleteLeave as any)(leaveRequestParams));
    navigation.pop();
  }, [dispatch, leaveRequestParams, navigation]);

  if (readonly) {
    return null;
  }

  if (statusSelect === LeaveRequest?.statusSelect.Draft) {
    return (
      <View style={styles.container}>
        {canDelete && (
          <Button
            title={I18n.t('Hr_Delete')}
            onPress={deleteLeaveAPI}
            width="45%"
            color={Colors.errorColor}
            iconName="trash3-fill"
          />
        )}
        <Button
          title={I18n.t('Hr_Send')}
          onPress={sendLeaveAPI}
          width="45%"
          iconName="send-fill"
        />
      </View>
    );
  }

  if (statusSelect === LeaveRequest?.statusSelect.WaitingValidation) {
    if (
      user?.employee?.hrManager ||
      leaveRequest.employee?.managerUser?.id === user.id
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
          <Button
            title={I18n.t('Hr_Validate')}
            onPress={validateLeaveAPI}
            width="45%"
            iconName="check-lg"
          />
          <LeaveRefusalPopup
            isOpen={refusalPopupIsOpen}
            leaveId={leaveRequest.id}
            leaveVersion={leaveRequest.version}
            handleClose={() => setRefusalPopupIsOpen(false)}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Button
          title={I18n.t('Hr_Cancel')}
          onPress={cancelLeaveAPI}
          color={Colors.errorColor}
          iconName="trash3-fill"
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

export default LeaveDetailsButtons;
