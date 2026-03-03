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

import React, {useCallback} from 'react';
import {Button} from '@axelor/aos-mobile-ui';
import {useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {createTimeLog} from '../../../features/timesheetLinesSlice';

const LogTimeButton = ({
  style,
  objectState,
}: {
  style?: any;
  objectState?: any;
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const handleLogTime = useCallback(
    (state: any) => {
      dispatch(
        (createTimeLog as any)({
          timesheetLine: {
            projectId: state.project?.id,
            projectTaskId: state.projectTask?.id,
            productId: state.product?.id,
            toInvoice: state.toInvoice,
            date: state.date,
            hoursDuration: state.hoursDuration,
            comments: state.comments,
          },
        }),
      );
    },
    [dispatch],
  );

  return (
    <Button
      style={style}
      title={I18n.t('Base_Create')}
      onPress={() => handleLogTime(objectState)}
    />
  );
};

export default LogTimeButton;
