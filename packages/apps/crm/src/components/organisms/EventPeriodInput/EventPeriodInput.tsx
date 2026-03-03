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
import {StyleSheet} from 'react-native';
import {PeriodInput} from '@axelor/aos-mobile-core';

interface EventPeriodInputProps {
  defaultValue?: any;
  onChange?: (value: any) => void;
}

const EventPeriodInputAux = ({
  defaultValue = null,
  onChange,
}: EventPeriodInputProps) => {
  const handleValueChange = (field: string, value: any) => {
    if (value !== defaultValue[field]) {
      onChange({
        ...defaultValue,
        [field]: value,
      });
    }
  };

  return (
    <PeriodInput
      style={styles.periodInput}
      horizontal={false}
      startDateConfig={{
        dateInputMode: 'datetime',
        nullable: false,
        date: defaultValue.startDateTime,
        onDateChange: date => handleValueChange('startDateTime', date),
      }}
      endDateConfig={{
        dateInputMode: 'datetime',
        nullable: false,
        date: defaultValue.endDateTime,
        onDateChange: date => handleValueChange('endDateTime', date),
      }}
      onPeriodErrorChange={isError => handleValueChange('isError', isError)}
      usePopup
    />
  );
};

const styles = StyleSheet.create({
  periodInput: {
    alignSelf: 'center',
  },
});

const EventPeriodInput = ({
  defaultValue = null,
  onChange,
}: EventPeriodInputProps) => {
  return (
    <EventPeriodInputAux defaultValue={defaultValue} onChange={onChange} />
  );
};

export default EventPeriodInput;
