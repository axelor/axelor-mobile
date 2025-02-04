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
import {StyleSheet} from 'react-native';
import {formatNumber, Text} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

const AvailableQtyInputAux = ({}) => {
  const I18n = useTranslator();
  const {LeaveReason} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const {user} = useSelector(state => state.user);
  const {leaveReasonSelect} = useSelector(state => state.hr_leave);

  const _unitName = useMemo(() => {
    return getItemTitle(LeaveReason?.unitSelect, leaveReasonSelect?.unitSelect);
  }, [LeaveReason?.unitSelect, getItemTitle, leaveReasonSelect?.unitSelect]);

  const availableQty = useMemo(() => {
    if (
      leaveReasonSelect?.leaveReasonTypeSelect ===
      LeaveReason?.leaveReasonTypeSelect.ExceptionalLeave
    ) {
      return '-';
    }

    const _availableQty =
      user.employee?.leaveLineList?.find(
        leaveLine => leaveLine.leaveReason?.id === leaveReasonSelect?.id,
      )?.quantity ?? 0;

    return `${formatNumber(_availableQty)} ${_unitName}`;
  }, [
    LeaveReason?.leaveReasonTypeSelect.ExceptionalLeave,
    leaveReasonSelect?.id,
    leaveReasonSelect?.leaveReasonTypeSelect,
    _unitName,
    user.employee?.leaveLineList,
  ]);

  return (
    <Text style={styles.input} fontSize={16}>
      {`${I18n.t('Hr_AvailableQty')} : ${availableQty}`}
    </Text>
  );
};

const AvailableQtyInput = ({}) => {
  return <AvailableQtyInputAux />;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginHorizontal: 24,
    marginVertical: 10,
  },
});

export default AvailableQtyInput;
