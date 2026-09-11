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
import {CalendarLegend, CalendarLegendItem} from '../../../molecules';
import {HeaderContainer} from '../../../organisms';
import GanttControls from './GanttControls';

interface GanttHeaderProps {
  legendItems?: CalendarLegendItem[];
  filters?: React.ReactNode;
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
  return (
    <HeaderContainer
      expandableFilter={false}
      fixedItems={
        <>
          {filters}
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
        </>
      }
      chipComponent={
        <CalendarLegend
          items={legendItems}
          showTodayButton={showTodayButton}
          translator={translator}
          onTodayPress={onToday}
          onPreviousPress={showNavigation ? onPrevious : undefined}
          onNextPress={showNavigation ? onNext : undefined}
        />
      }
    />
  );
};

export default memo(GanttHeader);
