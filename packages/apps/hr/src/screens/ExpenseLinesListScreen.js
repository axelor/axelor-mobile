/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {Screen} from '@axelor/aos-mobile-ui';
import {TimesheetLineDetailCard} from '../components';

const ExpenseLinesListScreen = ({}) => {
  const demoData = [
    {
      statusSelect: 1,
      project: 'Projet',
      task: 'Tâche',
      manufOrder: null,
      operation: null,
      date: '2000-10-20',
      duration: '3.00',
      unitDuration: 'days',
    },
    {
      statusSelect: 2,
      project: 'Projet avec un nom super long',
      task: 'Tâche',
      manufOrder: null,
      operation: null,
      date: '2000-10-20',
      duration: '3.00',
      unitDuration: 'hours',
    },
    {
      statusSelect: 3,
      project: null,
      task: null,
      manufOrder: 'MO',
      operation: 'Opération avec un nom super long',
      date: '2000-10-20',
      duration: '3.00',
      unitDuration: 'minutes',
    },
    {
      statusSelect: 4,
      project: null,
      task: null,
      manufOrder: 'MO avec un nom super long',
      operation: 'Opération avec un nom super long',
      date: '2000-10-20',
      duration: '100.00',
      unitDuration: 'hours',
    },
    {
      statusSelect: 4,
      project: 'Projet',
      task: null,
      manufOrder: null,
      operation: null,
      date: '2000-10-20',
      duration: '3.00',
      unitDuration: 'days',
    },
    {
      statusSelect: 4,
      project: null,
      task: null,
      manufOrder: null,
      operation: null,
      date: '2000-10-20',
      duration: '100.00',
      unitDuration: 'hours',
    },
  ];
  return (
    <Screen removeSpaceOnTop={true}>
      {demoData.map((item, index) => {
        return (
          <TimesheetLineDetailCard
            statusSelect={item.statusSelect}
            project={item.project}
            task={item.task}
            manufOrder={item.manufOrder}
            operation={item.operation}
            date={item.date}
            duration={item.duration}
            unitDuration={item.unitDuration}
            key={index}
          />
        );
      })}
    </Screen>
  );
};

export default ExpenseLinesListScreen;
