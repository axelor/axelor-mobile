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

import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../../theme';
import {CircleButton, SwitchCard} from '../../../molecules';

const BUTTON_SIZE = 30;

interface GanttControlsProps {
  showExpandAll: boolean;
  showCollapseAll: boolean;
  showFilledRowsFilter: boolean;
  filledRowsFilterTitle?: string;
  filledRowsOnly: boolean;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onFilledRowsOnlyChange: (value?: boolean) => void;
}

const GanttControls = ({
  showExpandAll,
  showCollapseAll,
  showFilledRowsFilter,
  filledRowsFilterTitle,
  filledRowsOnly,
  onExpandAll,
  onCollapseAll,
  onFilledRowsOnlyChange,
}: GanttControlsProps) => {
  const Colors = useThemeColor();

  const hasButtons = useMemo(
    () => showExpandAll || showCollapseAll,
    [showCollapseAll, showExpandAll],
  );

  const hasFilter = useMemo(
    () => showFilledRowsFilter && filledRowsFilterTitle != null,
    [filledRowsFilterTitle, showFilledRowsFilter],
  );

  if (!hasButtons && !hasFilter) return null;

  return (
    <View style={styles.container}>
      {hasFilter && (
        <SwitchCard
          style={styles.filter}
          title={filledRowsFilterTitle!}
          numberOfLines={1}
          textColor={Colors.placeholderTextColor}
          textSize={10}
          defaultValue={filledRowsOnly}
          onToggle={onFilledRowsOnlyChange}
        />
      )}
      {showExpandAll && (
        <CircleButton
          testID="ganttExpandAllButton"
          style={styles.button}
          size={BUTTON_SIZE}
          iconName="arrows-expand"
          onPress={onExpandAll}
        />
      )}
      {showCollapseAll && (
        <CircleButton
          testID="ganttCollapseAllButton"
          style={styles.button}
          size={BUTTON_SIZE}
          iconName="arrows-collapse"
          onPress={onCollapseAll}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  filter: {
    flex: 1,
    width: 'auto',
  },
  button: {
    marginHorizontal: 0,
  },
});

export default memo(GanttControls);
