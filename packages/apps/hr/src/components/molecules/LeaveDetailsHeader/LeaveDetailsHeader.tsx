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
        <LabelText
          iconName="building-fill"
          size={16}
          title={leave.company?.name}
          textStyle={styles.labelText}
        />
        <Badge
          style={styles.statusBadge}
          title={getItemTitle(LeaveRequest?.statusSelect, leave.statusSelect)}
          color={getItemColor(LeaveRequest?.statusSelect, leave.statusSelect)}
        />
      </View>
      <LabelText
        iconName="person-fill"
        size={16}
        title={leave.employee?.name}
        textStyle={styles.labelText}
      />
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
    marginHorizontal: 24,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  labelText: {
    fontSize: 16,
  },
  statusBadge: {
    width: undefined,
    paddingHorizontal: 10,
  },
});

export default LeaveDetailsHeader;
