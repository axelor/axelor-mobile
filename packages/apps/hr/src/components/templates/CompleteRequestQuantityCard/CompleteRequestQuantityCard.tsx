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
import {useTranslator, useTypes} from '@axelor/aos-mobile-core';
import {QuantityCard, Text, useDigitFormat} from '@axelor/aos-mobile-ui';
import {fetchLeaveReasonAvailability} from '../../../api/leave-api';

interface CompleteRequestQuantityCardProps {
  leaveQty: number;
  setLeaveQty: (leaveQty: number) => void;
  cancelLeave: () => void;
  newLine: any;
  toDate: string;
}

const CompleteRequestQuantityCard = ({
  leaveQty,
  setLeaveQty,
  cancelLeave,
  newLine,
  toDate,
}: CompleteRequestQuantityCardProps) => {
  const I18n = useTranslator();
  const {LeaveReason} = useTypes();
  const formatNumber = useDigitFormat();

  const [availableQty, setAvailableQty] = useState(0);

  const isExceptionalLeave = useMemo(
    () =>
      newLine.leaveReasonTypeSelect ===
      LeaveReason?.leaveReasonTypeSelect.ExceptionalLeave,
    [
      newLine.leaveReasonTypeSelect,
      LeaveReason?.leaveReasonTypeSelect.ExceptionalLeave,
    ],
  );

  useEffect(() => {
    if (!isExceptionalLeave && toDate && newLine.id) {
      fetchLeaveReasonAvailability({
        toDate,
        leaveReasonId: newLine.id,
      })
        .then(setAvailableQty)
        .catch(() => setAvailableQty(0));
    }
  }, [formatNumber, isExceptionalLeave, newLine.id, toDate]);

  return (
    <QuantityCard
      labelQty={I18n.t('Hr_Quantity')}
      defaultValue={leaveQty}
      onValueChange={setLeaveQty}
      editable={true}
      actionQty={true}
      iconName="x-lg"
      onPressActionQty={cancelLeave}
      isBigButton={true}
      translator={I18n.t}>
      <Text
        fontSize={16}>{`${I18n.t('Hr_LeaveReason')} : ${newLine.name}`}</Text>
      <Text fontSize={16}>
        {I18n.t('Hr_AvailableQty', {
          availableQty: isExceptionalLeave ? '-' : formatNumber(availableQty),
        })}
      </Text>
    </QuantityCard>
  );
};

export default CompleteRequestQuantityCard;
