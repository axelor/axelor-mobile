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

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  formatDate,
  formatDateTime,
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  HeaderContainer,
  NotesCard,
  Screen,
  ScrollView,
  Text,
} from '@axelor/aos-mobile-ui';
import {
  FromToDateDisplay,
  LeaveAvailableDuractionCard,
  LeaveDetailsButtons,
  LeaveDetailsHeader,
} from '../../components';
import {fetchLeaveById} from '../../features/leaveSlice';

const LeaveDetailsScreen = ({route}) => {
  const {leaveId} = route.params;
  const I18n = useTranslator();
  const {LeaveRequest} = useTypes();
  const dispatch = useDispatch();

  const {leave, loadingLeave} = useSelector(state => state.hr_leave);

  const isLeaveValidated = useMemo(
    () => leave.statusSelect === LeaveRequest?.statusSelect.Validate,
    [leave.statusSelect, LeaveRequest?.statusSelect.Validate],
  );

  const fetchLeave = useCallback(() => {
    dispatch((fetchLeaveById as any)({leaveId}));
  }, [dispatch, leaveId]);

  useEffect(() => {
    fetchLeave();
  }, [fetchLeave]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<LeaveDetailsButtons statusSelect={leave.statusSelect} />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<LeaveDetailsHeader leave={leave} />}
      />
      <ScrollView
        style={styles.container}
        refresh={{loading: loadingLeave, fetcher: fetchLeave}}>
        <FromToDateDisplay
          fromDate={leave.fromDateT}
          startOnSelect={leave.startOnSelect}
          toDate={leave.toDateT}
          endOnSelect={leave.endOnSelect}
        />
        <LeaveAvailableDuractionCard
          style={styles.marginTop}
          reason={leave.leaveReason?.name}
          availableLeave={leave.quantityBeforeValidation}
          durationLeave={leave.duration}
          durationUnitSelect={leave.leaveReason?.unitSelect}
        />
        {leave.statusSelect > LeaveRequest?.statusSelect.Draft && (
          <Text style={[styles.text, styles.marginTop]} writingType="details">
            {`${I18n.t('Hr_SendOn')} : ${formatDate(
              leave.requestDate,
              I18n.t('Base_DateFormat'),
            )}`}
          </Text>
        )}
        {(isLeaveValidated ||
          leave.statusSelect === LeaveRequest?.statusSelect.Refused) && (
          <Text style={[styles.text, styles.marginTop]} writingType="important">
            {I18n.t(isLeaveValidated ? 'Hr_ValidatedOnBy' : 'Hr_RejectedOnBy', {
              date: formatDateTime(
                isLeaveValidated
                  ? leave.validationDateTime
                  : leave.refusalDateTime,
                I18n.t('Base_DateTimeFormat'),
              ),
              name: isLeaveValidated
                ? leave.validatedBy?.name
                : leave.refusedBy?.name,
              interpolation: {escapeValue: false},
            })}
          </Text>
        )}
        <NotesCard
          style={styles.marginTop}
          title={I18n.t('Hr_Comments')}
          data={leave.comments}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    height: null,
    alignItems: 'center',
  },
  marginTop: {
    marginTop: 15,
  },
  text: {
    width: '90%',
  },
});

export default LeaveDetailsScreen;
