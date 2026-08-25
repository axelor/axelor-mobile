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

import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  BottomSheet,
  Card,
  Text,
  TextUnit,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {fetchLeaveBalances} from '../../../features/leaveSlice';

interface LeaveBalanceSheetProps {
  visible: boolean;
  onClose: () => void;
}

const LeaveBalanceSheet = ({visible, onClose}: LeaveBalanceSheetProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {LeaveReason} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const {user} = useSelector(state => state.user);
  const {loadingLeaveBalances, leaveBalanceList} = useSelector(
    state => state.hr_leave,
  );

  useEffect(() => {
    const employeeId = user?.employee?.id;

    if (visible && employeeId != null) {
      dispatch((fetchLeaveBalances as any)({employeeId}));
    }
  }, [dispatch, user?.employee?.id, visible]);

  const lines = useMemo(
    () => (Array.isArray(leaveBalanceList) ? leaveBalanceList : []),
    [leaveBalanceList],
  );

  const renderContent = () => {
    if (loadingLeaveBalances)
      return (
        <ActivityIndicator
          style={styles.indicator}
          color={Colors.primaryColor.background}
        />
      );

    if (lines.length === 0)
      return (
        <Text
          style={styles.empty}
          writingType="details"
          textColor={Colors.placeholderTextColor}>
          {I18n.t('Hr_NoLeaveBalance')}
        </Text>
      );

    return lines.map(line => {
      const unit = getItemTitle(
        LeaveReason?.unitSelect,
        line.leaveReason?.unitSelect,
      );

      return (
        <Card key={line.id} style={styles.card}>
          <Text numberOfLines={2}>{line.leaveReason?.name}</Text>
          <TextUnit
            title={I18n.t('Hr_Remaining')}
            value={line.quantity ?? 0}
            unit={unit}
            color={Colors.successColor}
            fontSize={12}
          />
          <TextUnit
            title={I18n.t('Hr_Acquired')}
            value={line.totalQuantity ?? 0}
            unit={unit}
            defaultColor
            fontSize={12}
          />
          <TextUnit
            title={I18n.t('Hr_WaitingForValidation')}
            value={line.daysToValidate ?? 0}
            unit={unit}
            color={Colors.cautionColor}
            fontSize={12}
          />
        </Card>
      );
    });
  };

  return (
    <BottomSheet
      visible={visible}
      title={I18n.t('Hr_LeaveBalances')}
      onClose={onClose}>
      <ScrollView style={styles.container}>{renderContent()}</ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 400,
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 10,
    marginVertical: 2,
    gap: 3,
  },
  indicator: {
    paddingVertical: 30,
  },
  empty: {
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default LeaveBalanceSheet;
