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

import React, {useMemo} from 'react';
import {FormView} from '@axelor/aos-mobile-core';

const TimesheetLineFormScreen = ({route}) => {
  const {timesheetId, timesheetLine} = route?.params;

  const defaultValue = useMemo(() => {
    if (timesheetLine != null) {
      return {
        project: timesheetLine.project,
        projectTask: timesheetLine.projectTask,
        manufOrder: timesheetLine.manufOrder,
        operationOrder: timesheetLine.operationOrder,
        date: timesheetLine.date,
        duration: timesheetLine.duration,
        comments: timesheetLine.comments,
      };
    }

    return {
      date: new Date().toISOString().split('T')[0],
    };
  }, [timesheetLine]);

  return (
    <FormView
      defaultValue={defaultValue}
      actions={[
        {
          key: 'create-timesheetLine',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => timesheetId == null,
          customAction: ({objectState}) => {
            console.log('Form data:', objectState);
          },
        },
        {
          key: 'update-timesheetLine',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => timesheetLine == null,
          customAction: ({objectState}) => {
            console.log('Form data:', objectState);
          },
        },
      ]}
      formKey="hr_TimesheetLine"
    />
  );
};

export default TimesheetLineFormScreen;
