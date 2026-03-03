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

import React from 'react';
import {View} from 'react-native';
import {
  formatDateTime as _formatDateTime,
  formatDuration,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {checkNullString, LabelText, Text} from '@axelor/aos-mobile-ui';

const DropdownTimingView = ({
  deadlineDateT,
  startDateT,
  endDateT,
  duration,
}) => {
  const I18n = useTranslator();

  const formatDateTime = (titleKey, value) => {
    return (
      <LabelText
        title={I18n.t(titleKey)}
        value={_formatDateTime(value, I18n.t('Base_DateTimeFormat'))}
      />
    );
  };

  if (
    checkNullString(deadlineDateT) &&
    checkNullString(startDateT) &&
    checkNullString(endDateT) &&
    duration == null
  ) {
    return (
      <View>
        <Text>{I18n.t('Helpdesk_NoTimingInformation')}</Text>
      </View>
    );
  }

  return (
    <View>
      {!checkNullString(deadlineDateT) &&
        formatDateTime('Helpdesk_Deadline', deadlineDateT)}
      {!checkNullString(startDateT) &&
        formatDateTime('Helpdesk_StartDate', startDateT)}
      {!checkNullString(endDateT) &&
        formatDateTime('Helpdesk_EndDate', endDateT)}
      {duration !== null && (
        <LabelText
          title={I18n.t('Helpdesk_Duration')}
          value={formatDuration(duration)}
        />
      )}
    </View>
  );
};

export default DropdownTimingView;
