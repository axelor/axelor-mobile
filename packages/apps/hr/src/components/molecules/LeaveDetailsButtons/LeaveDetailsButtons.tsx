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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  cancelLeave,
  sendLeave,
  validateLeave,
} from '../../../features/leaveSlice';
import {LeaveRefusalPopup} from '../../templates';

interface LeaveDetailsButtonsProps {
  statusSelect: number;
  leaveId: number;
  leaveVersion: number;
}

const LeaveDetailsButtons = ({
  statusSelect,
  leaveId,
  leaveVersion,
}: LeaveDetailsButtonsProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {LeaveRequest} = useTypes();

  const [refusalPopupIsOpen, setRefusalPopupIsOpen] = useState(false);

  const {user} = useSelector(state => state.user);

  const leaveRequestParams = useMemo(
    () => ({
      leaveRequestId: leaveId,
      version: leaveVersion,
    }),
    [leaveId, leaveVersion],
  );

  const sendLeaveAPI = useCallback(() => {
    dispatch(
      (sendLeave as any)({
        ...leaveRequestParams,
        userId: user?.id,
      }),
    );
  }, [dispatch, leaveRequestParams, user?.id]);

  const validateLeaveAPI = useCallback(() => {
    dispatch(
      (validateLeave as any)({
        ...leaveRequestParams,
        user: user,
      }),
    );
  }, [dispatch, leaveRequestParams, user]);

  const cancelLeaveAPI = useCallback(() => {
    dispatch(
      (cancelLeave as any)({
        ...leaveRequestParams,
        userId: user?.id,
      }),
    );
  }, [dispatch, leaveRequestParams, user?.id]);

  if (statusSelect === LeaveRequest?.statusSelect.Draft) {
    return (
      <View style={styles.container}>
        <Button
          title={I18n.t('Hr_Cancel')}
          onPress={cancelLeaveAPI}
          width="45%"
          color={Colors.errorColor}
          iconName="trash3-fill"
        />
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
          leaveId={leaveId}
          leaveVersion={leaveVersion}
          onCancel={() => setRefusalPopupIsOpen(false)}
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
