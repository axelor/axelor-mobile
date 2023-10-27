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
import {StyleSheet} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Picker, useThemeColor} from '@axelor/aos-mobile-ui';
import {EventType} from '../../../types';

const EventStatusPicker = ({
  title = 'Crm_Status',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <Picker
      style={styles.picker}
      styleTxt={styles.pickerTitle}
      required={required}
      onValueChange={onChange}
      labelField="title"
      title={I18n.t(title)}
      listItems={EventType.getStatusList(Colors, I18n)}
      valueField="key"
      defaultValue={defaultValue}
      disabled={readonly}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    marginLeft: 3,
  },
  pickerTitle: {
    marginLeft: 5,
  },
});

export default EventStatusPicker;
