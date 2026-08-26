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

import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslator, useTypes} from '@axelor/aos-mobile-core';
import {Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {Time} from '../../../types';
import {TimeDetailCard} from '../../molecules';

interface TimesheetDayLinesProps {
  lines: any[];
  durationUnit?: string;
  isActions: boolean;
  canEdit: boolean;
  showTrash: boolean;
  onEdit: (line: any) => void;
  onDelete: (line: any) => void;
}

const TimesheetDayLines = ({
  lines,
  durationUnit,
  isActions,
  canEdit,
  showTrash,
  onEdit,
  onDelete,
}: TimesheetDayLinesProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {Timesheet} = useTypes();

  if (lines.length === 0)
    return (
      <Text style={styles.empty} textColor={Colors.placeholderTextColor}>
        {I18n.t('Hr_NoActivityDeclared')}
      </Text>
    );

  return lines.map(line => (
    <TimeDetailCard
      key={line.id}
      mode={Time.mode.Timesheet}
      statusSelect={Timesheet?.statusSelect.Draft}
      project={line.project?.name}
      task={line.projectTask?.name}
      manufOrder={line.manufOrder?.name}
      operation={line.operationOrder?.name}
      comments={line.comments}
      date={line.date}
      duration={line.duration}
      durationUnit={durationUnit}
      showTrash={showTrash}
      isActions={isActions}
      canEdit={canEdit}
      onEdit={() => onEdit(line)}
      onDelete={() => onDelete(line)}
    />
  )) as any;
};

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
    paddingVertical: 30,
  },
});

export default memo(TimesheetDayLines);
