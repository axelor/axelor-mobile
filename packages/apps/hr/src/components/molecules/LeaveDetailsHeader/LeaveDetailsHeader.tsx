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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  checkNullString,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Badge, Label, LabelText} from '@axelor/aos-mobile-ui';

interface LeaveDetailsHeaderProps {
  leave: any;
}

const LeaveDetailsHeader = ({leave}: LeaveDetailsHeaderProps) => {
  const I18n = useTranslator();
  const {LeaveRequest} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <LabelText iconName="building-fill" title={leave.company?.name} />
          <LabelText iconName="person-fill" title={leave.employee?.name} />
        </View>
        <Badge
          title={getItemTitle(LeaveRequest?.statusSelect, leave.statusSelect)}
          color={getItemColor(LeaveRequest?.statusSelect, leave.statusSelect)}
        />
      </View>
      {leave.statusSelect === LeaveRequest?.statusSelect.Refused &&
        !checkNullString(leave.groundForRefusal) && (
          <Label
            message={`${I18n.t('Hr_GroundForRefusal')} : ${
              leave.groundForRefusal
            }`}
            type="error"
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  columnContainer: {
    flexDirection: 'column',
    flex: 1,
  },
});

export default LeaveDetailsHeader;
