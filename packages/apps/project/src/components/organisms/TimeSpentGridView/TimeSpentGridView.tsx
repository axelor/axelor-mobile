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

import React, {useEffect, useMemo} from 'react';
import {
  formatDate,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {GridView} from '@axelor/aos-mobile-ui';
import {fetchTimesheetLinesByTask} from '../../../features/timesheetLinesSlice';

const TimeSpentGridView = () => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {projectTask} = useSelector((state: any) => state.project_projectTask);
  const {timesheetLineList} = useSelector(
    (state: any) => state.project_timesheetLines,
  );

  const formattedData = useMemo(() => {
    if (Array.isArray(timesheetLineList) && timesheetLineList.length > 0) {
      return timesheetLineList.map(item => ({
        date: formatDate(item.date, I18n.t('Base_DateFormat')),
        duration: item.duration,
        product: item.product?.fullName ?? '',
        toInvoice: item.toInvoice ? 'X' : '',
        comments: item.comments ?? '',
      }));
    } else {
      return [];
    }
  }, [timesheetLineList, I18n]);

  useEffect(() => {
    dispatch(
      (fetchTimesheetLinesByTask as any)({projectTaskId: projectTask?.id}),
    );
  }, [dispatch, projectTask]);

  return (
    <GridView
      data={formattedData}
      columns={[
        {title: I18n.t('Project_Date'), key: 'date'},
        {title: I18n.t('Project_Product'), key: 'product'},
        {title: I18n.t('Project_Duration'), key: 'duration'},
        {title: I18n.t('Project_ToInvoice'), key: 'toInvoice'},
        {title: I18n.t('Base_Comments'), key: 'comments'},
      ]}
      translator={I18n.t}
      title={I18n.t('Project_TimeSpent')}
    />
  );
};

export default TimeSpentGridView;
