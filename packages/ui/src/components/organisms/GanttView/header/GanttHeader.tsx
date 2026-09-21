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

import React, {memo, useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ThemeColors, useThemeColor} from '../../../../theme';
import {CalendarLegend, CalendarLegendItem} from '../../../molecules';
import {HeaderContainer} from '../../../organisms';
import {Icon} from '../../../atoms';
import {
  GANTT_SIDE_PANEL_HANDLE_WIDTH,
  GANTT_SIDE_PANEL_RADIUS,
  GANTT_SIDE_PANEL_WIDTH,
} from '../gantt-view.styles';
import GanttControls from './GanttControls';

interface GanttHeaderProps {
  legendItems?: CalendarLegendItem[];
  filters?: React.ReactNode;
  expandableFilter: boolean;
  isLandscape: boolean;
  showTodayButton: boolean;
  showNavigation: boolean;
  showExpandAll: boolean;
  showCollapseAll: boolean;
  showFilledRowsFilter: boolean;
  filledRowsFilterTitle?: string;
  filledRowsOnly: boolean;
  translator: (key: string) => string;
  onToday: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onFilledRowsOnlyChange: (value?: boolean) => void;
}

const GanttHeader = ({
  legendItems,
  filters,
  expandableFilter,
  isLandscape,
  showTodayButton,
  showNavigation,
  showExpandAll,
  showCollapseAll,
  showFilledRowsFilter,
  filledRowsFilterTitle,
  filledRowsOnly,
  translator,
  onToday,
  onPrevious,
  onNext,
  onExpandAll,
  onCollapseAll,
  onFilledRowsOnlyChange,
}: GanttHeaderProps) => {
  const Colors = useThemeColor();

  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const togglePanel = useCallback(() => setIsPanelCollapsed(_c => !_c), []);

  const controls = (
    <GanttControls
      showExpandAll={showExpandAll}
      showCollapseAll={showCollapseAll}
      showFilledRowsFilter={showFilledRowsFilter}
      filledRowsFilterTitle={filledRowsFilterTitle}
      filledRowsOnly={filledRowsOnly}
      onExpandAll={onExpandAll}
      onCollapseAll={onCollapseAll}
      onFilledRowsOnlyChange={onFilledRowsOnlyChange}
    />
  );

  const legend = (
    <CalendarLegend
      items={legendItems}
      showTodayButton={showTodayButton}
      translator={translator}
      onTodayPress={onToday}
      onPreviousPress={showNavigation ? onPrevious : undefined}
      onNextPress={showNavigation ? onNext : undefined}
    />
  );

  if (isLandscape) {
    return (
      <View
        style={[styles.panel, isPanelCollapsed && styles.panelCollapsed]}
        testID="ganttSidePanel">
        <Icon
          style={styles.panelHandle}
          name={isPanelCollapsed ? 'chevron-left' : 'chevron-right'}
          size={16}
          color={Colors.secondaryColor_dark.background}
          touchable
          testID="ganttSidePanelHandle"
          onPress={togglePanel}
        />
        {!isPanelCollapsed && (
          <ScrollView
            style={styles.panelScroll}
            contentContainerStyle={styles.panelContent}>
            {legend}
            {filters}
            {controls}
          </ScrollView>
        )}
      </View>
    );
  }

  return (
    <HeaderContainer
      expandableFilter={expandableFilter}
      topChildren={expandableFilter ? filters : null}
      fixedItems={
        <>
          {!expandableFilter && filters}
          {controls}
        </>
      }
      chipComponent={legend}
    />
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    panel: {
      flexDirection: 'row',
      width: GANTT_SIDE_PANEL_WIDTH,
      backgroundColor: Colors.backgroundColor,
      borderLeftWidth: 1,
      borderLeftColor: Colors.secondaryColor_dark.background_light,
      borderTopLeftRadius: GANTT_SIDE_PANEL_RADIUS,
      borderBottomLeftRadius: GANTT_SIDE_PANEL_RADIUS,
    },
    panelCollapsed: {
      width: GANTT_SIDE_PANEL_HANDLE_WIDTH,
    },
    panelHandle: {
      width: GANTT_SIDE_PANEL_HANDLE_WIDTH,
      height: '100%',
    },
    panelScroll: {
      flex: 1,
    },
    panelContent: {
      flexGrow: 1,
      paddingVertical: 8,
      gap: 2,
    },
  });

export default memo(GanttHeader);
