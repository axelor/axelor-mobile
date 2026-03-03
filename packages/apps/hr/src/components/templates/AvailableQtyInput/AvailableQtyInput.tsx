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
import {StyleSheet} from 'react-native';
import {formatNumber, Text} from '@axelor/aos-mobile-ui';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {fetchLeaveReasonAvailability} from '../../../api/leave-api';

const AvailableQtyInputAux = ({objectState: leaveRequest}) => {
  const I18n = useTranslator();
  const {LeaveReason} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const [availableLeave, setAvailableLeave] = useState(0);

  const leaveReson = useMemo(
    () => leaveRequest?.leaveReason,
    [leaveRequest?.leaveReason],
  );

  const isExceptionalLeave = useMemo(
    () =>
      leaveReson?.leaveReasonTypeSelect ===
      LeaveReason?.leaveReasonTypeSelect.ExceptionalLeave,
    [LeaveReason?.leaveReasonTypeSelect.ExceptionalLeave, leaveReson],
  );

  const _unitName = useMemo(() => {
    return getItemTitle(LeaveReason?.unitSelect, leaveReson?.unitSelect);
  }, [LeaveReason?.unitSelect, getItemTitle, leaveReson?.unitSelect]);

  useEffect(() => {
    if (!isExceptionalLeave && leaveRequest?.toDateT && leaveReson?.id) {
      fetchLeaveReasonAvailability({
        toDate: leaveRequest?.toDateT,
        leaveReasonId: leaveReson?.id,
      })
        .then(setAvailableLeave)
        .catch(() => setAvailableLeave(0));
    } else {
      setAvailableLeave(0);
    }
  }, [isExceptionalLeave, leaveRequest?.toDateT, leaveReson]);

  return (
    <Text style={styles.input} fontSize={16}>
      {I18n.t('Hr_AvailableQty', {
        availableQty: isExceptionalLeave
          ? '-'
          : `${formatNumber(availableLeave)} ${_unitName}`,
      })}
    </Text>
  );
};

const AvailableQtyInput = ({objectState}: {objectState?: any}) => {
  return <AvailableQtyInputAux objectState={objectState} />;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginHorizontal: 24,
    marginVertical: 10,
  },
});

export default AvailableQtyInput;
