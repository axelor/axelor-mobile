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

import React, {useMemo} from 'react';
import {useSelector, useTranslator, useTypes} from '@axelor/aos-mobile-core';
import {QuantityCard, Text, useDigitFormat} from '@axelor/aos-mobile-ui';

interface CompleteRequestQuantityCardProps {
  leaveQty: number;
  setLeaveQty: (leaveQty: number) => void;
  cancelLeave: () => void;
  newLine: any;
}

const CompleteRequestQuantityCard = ({
  leaveQty,
  setLeaveQty,
  cancelLeave,
  newLine,
}: CompleteRequestQuantityCardProps) => {
  const I18n = useTranslator();
  const {LeaveReason} = useTypes();
  const formatNumber = useDigitFormat();

  const {user} = useSelector(state => state.user);

  const availableQty = useMemo(() => {
    if (
      newLine.leaveReasonTypeSelect ===
      LeaveReason?.leaveReasonTypeSelect.ExceptionalLeave
    ) {
      return '-';
    }

    const _availableQty =
      user.employee?.leaveLineList?.find(
        leaveLine => leaveLine.leaveReason.id === newLine.id,
      )?.quantity ?? 0;

    return `${formatNumber(_availableQty)} ${newLine.unitName}`;
  }, [
    LeaveReason?.leaveReasonTypeSelect.ExceptionalLeave,
    formatNumber,
    newLine.id,
    newLine.leaveReasonTypeSelect,
    newLine.unitName,
    user.employee?.leaveLineList,
  ]);

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
        {`${I18n.t('Hr_AvailableQty')} : ${availableQty}`}
      </Text>
    </QuantityCard>
  );
};

export default CompleteRequestQuantityCard;
