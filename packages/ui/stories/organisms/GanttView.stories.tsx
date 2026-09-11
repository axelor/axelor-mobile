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

import React, {useMemo} from 'react';
import {View} from 'react-native';
import type {Meta} from '@storybook/react';
import {
  GanttCell,
  GanttGroup,
  GanttView as Component,
  Picker,
} from '../../src/components';
import {useThemeColor} from '../../src/theme';
import {startOfWeek, toDateString} from '../../src/utils';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/GanttView',
  component: Component,
};

export default meta;

const fromMonday = (days: number): string => {
  const date = startOfWeek(new Date(), 1);
  date.setDate(date.getDate() + days);

  return toDateString(date);
};

const useSampleGroups = (): GanttGroup[] => {
  const Colors = useThemeColor();

  return useMemo(() => {
    const weekEnd = {
      [fromMonday(5)]: Colors.secondaryColor,
      [fromMonday(6)]: Colors.secondaryColor,
      [fromMonday(12)]: Colors.secondaryColor,
      [fromMonday(13)]: Colors.secondaryColor,
    };

    return [
      {
        key: 'dept-dev',
        title: 'Development',
        rows: [
          {
            key: '1',
            title: 'Alice Ferrand',
            subtitle: 'T0052',
            nonWorkingDays: weekEnd,
            items: [
              {
                id: 1,
                startDate: fromMonday(0),
                endDate: fromMonday(4),
                title: 'Paid leave',
                color: Colors.successColor,
                priority: 3,
              },
            ],
          },
          {
            key: '2',
            title: 'Karim Belkacem',
            subtitle: 'T0060',
            nonWorkingDays: weekEnd,
            items: [
              {
                id: 2,
                startDate: fromMonday(3),
                endDate: fromMonday(3),
                startsAfternoon: true,
                title: 'RTT',
                color: Colors.successColor,
                priority: 3,
              },
            ],
          },
          {
            key: '3',
            title: 'Nathalie Roux',
            subtitle: 'T0051',
            nonWorkingDays: {
              ...weekEnd,
              [fromMonday(2)]: Colors.secondaryColor,
              [fromMonday(9)]: Colors.secondaryColor,
              [fromMonday(1)]: Colors.indigo,
            },
            items: [
              {
                id: 3,
                startDate: fromMonday(4),
                endDate: fromMonday(11),
                title: 'Paid leave',
                color: Colors.cautionColor,
                priority: 2,
              },
            ],
          },
          {
            key: '4',
            title: 'Thomas Girard',
            subtitle: 'T0059',
            warning: 'No weekly planning configured',
            nonWorkingDays: weekEnd,
            items: [],
          },
        ],
      },
      {
        key: 'dept-support',
        title: 'Support',
        rows: [
          {
            key: '5',
            title: 'Julien Mercier',
            subtitle: 'T0049',
            nonWorkingDays: weekEnd,
            items: [
              {
                id: 5,
                startDate: fromMonday(1),
                endDate: fromMonday(2),
                endsMorning: true,
                title: 'Sick leave',
                color: Colors.successColor,
                priority: 3,
              },
              {
                id: 6,
                startDate: fromMonday(2),
                endDate: fromMonday(2),
                title: 'RTT',
                color: Colors.errorColor,
                priority: 0,
              },
            ],
          },
          {
            key: '6',
            title: 'Sofia Almeida',
            subtitle: 'T0057',
            nonWorkingDays: weekEnd,
            items: [
              {
                id: 7,
                startDate: fromMonday(4),
                endDate: fromMonday(8),
                title: 'Unpaid leave',
                color: Colors.priorityColor,
                priority: 1,
              },
            ],
          },
        ],
      },
    ];
  }, [Colors]);
};

const LABELS: Record<string, string> = {
  Base_Legend: 'Legend',
  Base_NoData: 'No employee',
  Base_NoMoreItems: 'No more items',
};

const translator = (key: string) => LABELS[key] ?? key.split('_').pop() ?? key;

export const GanttView: Story<typeof Component> = {
  args: {
    zoom: 'week',
    weeksBefore: 12,
    weeksAfter: 12,
    firstDayOfWeek: 1,
    showBarTitles: true,
    showTodayButton: true,
    weekPrefix: 'W',
    cornerTitle: 'Team',
    showNavigation: true,
    isListEnd: true,
  },
  argTypes: {
    groups: disabledControl,
    legendItems: disabledControl,
    filters: disabledControl,
    fetchData: disabledControl,
    onItemPress: disabledControl,
    onRowPress: disabledControl,
    onVisibleRangeChange: disabledControl,
    translator: disabledControl,
    style: disabledControl,
  },
  render: args => {
    const Colors = useThemeColor();
    const groups = useSampleGroups();

    const legendItems = useMemo(
      () => [
        {key: 'draft', title: 'Draft', color: Colors.priorityColor},
        {
          key: 'waiting',
          title: 'Waiting validation',
          color: Colors.cautionColor,
        },
        {key: 'validated', title: 'Validated', color: Colors.successColor},
        {key: 'refused', title: 'Refused', color: Colors.errorColor},
        {
          key: 'weekEnd',
          title: 'Non-working day',
          color: Colors.secondaryColor,
        },
        {key: 'holiday', title: 'Public holiday', color: Colors.indigo},
      ],
      [Colors],
    );

    return (
      <View style={{height: 600, width: '100%'}}>
        <Component
          {...args}
          groups={groups}
          legendItems={legendItems}
          translator={translator}
        />
      </View>
    );
  },
};

const useLoadSampleGroups = (): GanttGroup[] => {
  const Colors = useThemeColor();

  return useMemo(() => {
    const weekEnd = {
      [fromMonday(5)]: Colors.secondaryColor,
      [fromMonday(6)]: Colors.secondaryColor,
      [fromMonday(12)]: Colors.secondaryColor,
      [fromMonday(13)]: Colors.secondaryColor,
    };

    const loadCell = (value: number, isNonWorkingDay: boolean): GanttCell => {
      const color = isNonWorkingDay
        ? Colors.secondaryColor
        : value === 0
          ? Colors.defaultColor
          : value > 102
            ? Colors.errorColor
            : value < 98
              ? Colors.cautionColor
              : Colors.successColor;

      return {
        value,
        label: isNonWorkingDay && value === 0 ? undefined : `${value}%`,
        color,
      };
    };

    const buildCells = (loadByDay: number[]) =>
      loadByDay.reduce<Record<string, GanttCell>>((acc, value, index) => {
        const dateString = fromMonday(index);
        acc[dateString] = loadCell(value, weekEnd[dateString] != null);

        return acc;
      }, {});

    return [
      {
        key: 'employee-1',
        title: 'Alice Ferrand',
        cells: buildCells([100, 118, 64, 100, 75, 0, 0, 100, 100, 0, 100, 96]),
        nonWorkingDays: weekEnd,
        rows: [
          {
            key: 'project-1',
            title: 'Alpha migration',
            subtitle: 'PRJ001',
            nonWorkingDays: weekEnd,
            items: [
              {
                id: 1,
                startDate: fromMonday(0),
                endDate: fromMonday(4),
                title: 'Data model (50%) | 2.5',
                color: Colors.progressColor,
              },
              {
                id: 2,
                startDate: fromMonday(2),
                endDate: fromMonday(7),
                title: 'Import scripts (25%) | 1.5',
                color: Colors.plannedColor,
              },
              {
                id: 3,
                startDate: fromMonday(3),
                endDate: fromMonday(3),
                title: 'Review (25%) | 0.25',
                color: Colors.progressColor,
              },
              {
                id: 4,
                startDate: fromMonday(7),
                endDate: fromMonday(8),
                title: 'Rehearsal (100%) | 2',
                color: Colors.progressColor,
              },
            ],
          },
          {
            key: 'project-2',
            title: 'Beta rollout',
            subtitle: 'PRJ002',
            nonWorkingDays: weekEnd,
            items: [
              {
                id: 5,
                startDate: fromMonday(1),
                endDate: fromMonday(1),
                title: 'Kick-off (50%) | 0.5',
                color: Colors.priorityColor,
              },
              {
                id: 6,
                startDate: fromMonday(10),
                endDate: fromMonday(11),
                title: 'Training (100%) | 2',
                color: Colors.priorityColor,
              },
            ],
          },
          {
            key: 'project-3',
            title: 'Gamma support',
            subtitle: 'PRJ003',
            nonWorkingDays: weekEnd,
          },
        ],
      },
      {
        key: 'employee-2',
        title: 'Karim Belkacem',
        collapsed: true,
        cells: buildCells([0, 50, 100, 100, 100, 0, 0, 100, 104, 100, 82, 100]),
        nonWorkingDays: weekEnd,
        rows: [
          {
            key: 'project-4',
            title: 'Alpha migration',
            subtitle: 'PRJ001',
            nonWorkingDays: weekEnd,
            items: [
              {
                id: 7,
                startDate: fromMonday(1),
                endDate: fromMonday(4),
                title: 'Integration tests (100%) | 4',
                color: Colors.plannedColor,
              },
              {
                id: 8,
                startDate: fromMonday(8),
                endDate: fromMonday(11),
                title: 'Go live (75%) | 3',
                color: Colors.progressColor,
              },
            ],
          },
        ],
      },
    ];
  }, [Colors]);
};

export const GanttViewWithLoadCells: Story<typeof Component> = {
  args: {
    zoom: 'week',
    weeksBefore: 12,
    weeksAfter: 12,
    firstDayOfWeek: 1,
    showBarTitles: true,
    showTodayButton: true,
    showExpandAll: true,
    showCollapseAll: true,
    showFilledRowsFilter: true,
    filledRowsFilterTitle: 'Only planned projects',
    filledRowsOnlyByDefault: true,
    expandableFilter: true,
    weekPrefix: 'W',
    cornerTitle: 'Project',
    showNavigation: true,
    isListEnd: true,
  },
  argTypes: {
    groups: disabledControl,
    legendItems: disabledControl,
    filters: disabledControl,
    fetchData: disabledControl,
    onItemPress: disabledControl,
    onRowPress: disabledControl,
    onVisibleRangeChange: disabledControl,
    translator: disabledControl,
    style: disabledControl,
  },
  render: args => {
    const Colors = useThemeColor();
    const groups = useLoadSampleGroups();

    const legendItems = useMemo(
      () => [
        {key: 'underload', title: 'Underload', color: Colors.cautionColor},
        {key: 'nominal', title: 'Nominal load', color: Colors.successColor},
        {key: 'overload', title: 'Overload', color: Colors.errorColor},
        {
          key: 'weekEnd',
          title: 'Non-working day',
          color: Colors.secondaryColor,
        },
      ],
      [Colors],
    );

    const filters = useMemo(
      () => (
        <Picker
          title="Team"
          listItems={[
            {id: 1, name: 'Development'},
            {id: 2, name: 'Support'},
          ]}
          labelField="name"
          valueField="id"
          onValueChange={() => {}}
        />
      ),
      [],
    );

    return (
      <View style={{height: 600, width: '100%'}}>
        <Component
          {...args}
          groups={groups}
          legendItems={legendItems}
          filters={filters}
          translator={translator}
        />
      </View>
    );
  },
};
