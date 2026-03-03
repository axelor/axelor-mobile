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

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {PeriodInput, sameDate, useTranslator} from '@axelor/aos-mobile-core';
import {Label} from '@axelor/aos-mobile-ui';
import {LeaveStartEndOn} from '../../atoms';

interface LeavePeriodInputProps {
  defaultValue?: any;
  onChange?: (value: any) => void;
}

const LeavePeriodInputAux = ({
  defaultValue = null,
  onChange,
}: LeavePeriodInputProps) => {
  const I18n = useTranslator();

  const [isHalfDayError, setIsHalfDayError] = useState(false);

  const handleValueChange = (field: string, value: any) => {
    if (value !== defaultValue?.[field]) {
      onChange({
        ...defaultValue,
        [field]: value,
      });
    }
  };

  const handleLeaveStartEndChange = (field: string, value: any) => {
    const startOnSelect =
      field === 'startOnSelect' ? value : defaultValue?.startOnSelect;
    const endOnSelect =
      field === 'endOnSelect' ? value : defaultValue?.endOnSelect;
    let isError = false;

    if (defaultValue?.fromDateT && defaultValue?.toDateT) {
      if (
        sameDate(defaultValue?.fromDateT, defaultValue?.toDateT) &&
        endOnSelect <= startOnSelect
      ) {
        isError = true;
      }
    }

    setIsHalfDayError(isError);
    onChange({
      ...defaultValue,
      isStartEndError: isError,
      [field]: value,
    });
  };

  return (
    <View style={styles.container}>
      <PeriodInput
        startDateConfig={{
          nullable: false,
          date: defaultValue?.fromDateT,
          onDateChange: date => handleValueChange('fromDateT', date),
        }}
        endDateConfig={{
          nullable: false,
          date: defaultValue?.toDateT,
          onDateChange: date => handleValueChange('toDateT', date),
        }}
        onPeriodErrorChange={isError =>
          handleValueChange('isDateError', isError)
        }
      />
      <Label
        style={styles.label}
        type="error"
        message={I18n.t('Hr_InvalidHalfDaySelection')}
        visible={isHalfDayError}
      />
      <LeaveStartEndOn
        startOn={defaultValue?.startOnSelect}
        endOn={defaultValue?.endOnSelect}
        onStartOnChange={startOn =>
          handleLeaveStartEndChange('startOnSelect', startOn)
        }
        onEndOnChange={endOn => handleLeaveStartEndChange('endOnSelect', endOn)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    width: '90%',
  },
});

const LeavePeriodInput = ({
  defaultValue = null,
  onChange,
}: LeavePeriodInputProps) => {
  return (
    <LeavePeriodInputAux defaultValue={defaultValue} onChange={onChange} />
  );
};

export default LeavePeriodInput;
