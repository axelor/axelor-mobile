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
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {
  NumberBubble,
  Picker,
  ToggleSwitch,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {fetchLeaveToValidate} from '../../../features/leaveSlice';
import {Leave} from '../../../types';
import {LeaveWaitingValidationSearchBar} from '../../templates';

interface LeaveFiltersProps {
  mode: number;
  onChangeMode: (mode: any) => void;
  onChangeStatus: (status: any) => void;
}

const LeaveFilters = ({
  mode,
  onChangeMode,
  onChangeStatus,
}: LeaveFiltersProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {LeaveRequest} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const {user} = useSelector(state => state.user);
  const {managedEmployeeTotal} = useSelector(state => state.employee);
  const {totalNumberLeaveToValidate} = useSelector(state => state.hr_leave);

  useEffect(() => {
    dispatch(
      (fetchLeaveToValidate as any)({
        user: user,
        page: 0,
        companyId: user.activeCompany?.id,
      }),
    );
  }, [dispatch, user]);

  const leaveStatusList = useMemo(
    () => getSelectionItems(LeaveRequest?.statusSelect),
    [getSelectionItems, LeaveRequest?.statusSelect],
  );

  return (
    <View style={styles.container}>
      {(user?.employee?.hrManager || managedEmployeeTotal > 0) && (
        <ToggleSwitch
          leftTitle={I18n.t('Hr_MyLeaves')}
          rightTitle={I18n.t('Hr_ToValidate')}
          rigthElement={
            <NumberBubble
              style={styles.numberBubble}
              number={totalNumberLeaveToValidate}
              color={Colors.cautionColor}
              isNeutralBackground={true}
            />
          }
          onSwitch={() => {
            onChangeStatus(null);
            onChangeMode(_mode =>
              _mode === Leave.mode.myLeaves
                ? Leave.mode.leavesToValidate
                : Leave.mode.myLeaves,
            );
          }}
        />
      )}
      {mode === Leave.mode.myLeaves ? (
        <Picker
          listItems={leaveStatusList}
          title={I18n.t('Hr_Status')}
          onValueChange={onChangeStatus}
          labelField="title"
          valueField="key"
        />
      ) : (
        <LeaveWaitingValidationSearchBar />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  numberBubble: {
    position: 'absolute',
    right: '5%',
  },
});

export default LeaveFilters;
