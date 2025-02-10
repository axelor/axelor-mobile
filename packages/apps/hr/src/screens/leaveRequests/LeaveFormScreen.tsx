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

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  FormView,
  showToastMessage,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchLeaveById, updateLeave} from '../../features/leaveSlice';

const LeaveFormScreen = ({route, navigation}) => {
  const {leaveId} = route.params;
  const I18n = useTranslator();
  const _dispatch = useDispatch();

  const {leave} = useSelector(state => state.hr_leave);
  const {userId} = useSelector(state => state.auth);

  useEffect(() => {
    _dispatch((fetchLeaveById as any)({leaveId}));
  }, [_dispatch, leaveId]);

  const validateDates = useCallback(
    objectState => {
      const {fromDateT, toDateT, startOnSelect, endOnSelect} = objectState;

      if (!fromDateT || !toDateT) {
        return I18n.t('Hr_DateMandatory');
      }

      const startDate = new Date(fromDateT);
      const endDate = new Date(toDateT);

      if (startDate > endDate) {
        return I18n.t('Hr_StartDateBeforeEndDate');
      }

      if (startDate.getTime() === endDate.getTime()) {
        if (!startOnSelect || !endOnSelect) {
          return I18n.t('Hr_HalfDayMandatory');
        }
        const s = Number(startOnSelect);
        const e = Number(endOnSelect);
        if (e <= s) {
          return I18n.t('Hr_InvalidHalfDaySelection');
        }
      }

      return null;
    },
    [I18n],
  );

  const updateLeaveApi = useCallback(
    (objectState, dispatch) => {
      const error = validateDates(objectState);

      if (error) {
        showToastMessage({
          type: 'error',
          position: 'bottom',
          text1: I18n.t('Auth_Warning'),
          text2: error,
          onPress: () => {},
        });
        return;
      }

      dispatch((updateLeave as any)({leave: objectState, userId: userId}));
      navigation.pop();
    },
    [I18n, navigation, userId, validateDates],
  );

  const _defaultValue = useMemo(
    () => (leaveId != null ? {...leave} : null),
    [leaveId, leave],
  );

  return (
    <FormView
      formKey="hr_Leave"
      defaultValue={_defaultValue}
      defaultEditMode
      actions={[
        {
          key: 'update_leave',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          customAction: ({dispatch, objectState}) =>
            updateLeaveApi(objectState, dispatch),
        },
      ]}
    />
  );
};

export default LeaveFormScreen;
