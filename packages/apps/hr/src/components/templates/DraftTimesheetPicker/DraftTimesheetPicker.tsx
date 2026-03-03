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

import React, {useEffect} from 'react';
import {
  formatDate,
  useSelector,
  useDispatch,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';
import {fetchDraftTimesheet} from '../../../features/timesheetSlice';

interface DraftTimesheetPickerProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange: (timesheetPicker: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const DraftTimesheetPicker = ({
  style,
  title = 'Hr_TimesheetToLink',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: DraftTimesheetPickerProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector((state: any) => state.user);
  const {draftTimesheetList} = useSelector((state: any) => state.timesheet);

  useEffect(() => {
    dispatch(
      (fetchDraftTimesheet as any)({
        userId: user.id,
        companyId: user.activeCompany?.id,
      }),
    );
  }, [dispatch, user.activeCompany?.id, user.id]);

  const displayValue = item => {
    return `${formatDate(
      item.fromDate,
      I18n.t('Base_DateFormat'),
    )} - ${formatDate(item.toDate, I18n.t('Base_DateFormat'))}`;
  };

  if (!Array.isArray(draftTimesheetList) || draftTimesheetList.length === 0) {
    return null;
  }

  return (
    <Picker
      style={style}
      title={I18n.t(title)}
      defaultValue={defaultValue}
      listItems={draftTimesheetList}
      displayValue={displayValue}
      labelField="id"
      valueField="id"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
      isValueItem={true}
    />
  );
};

export default DraftTimesheetPicker;
