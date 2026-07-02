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
import {formatNumber, Label} from '@axelor/aos-mobile-ui';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {fetchLeaveReasonAvailability} from '../../../api/leave-api';

interface AvailableQtyInputProps {
  style?: any;
  objectState?: any;
}

const AvailableQtyInputAux = ({
  style,
  objectState: leaveRequest,
}: AvailableQtyInputProps) => {
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

  const _unitName = useMemo(
    () => getItemTitle(LeaveReason?.unitSelect, leaveReson?.unitSelect),
    [LeaveReason?.unitSelect, getItemTitle, leaveReson?.unitSelect],
  );

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
    <Label
      style={style}
      message={I18n.t('Hr_AvailableQty', {
        availableQty: isExceptionalLeave
          ? '-'
          : `${formatNumber(availableLeave)} ${_unitName}`,
      })}
      type="info"
    />
  );
};

const AvailableQtyInput = (props: AvailableQtyInputProps) => {
  return <AvailableQtyInputAux {...props} />;
};

export default AvailableQtyInput;
