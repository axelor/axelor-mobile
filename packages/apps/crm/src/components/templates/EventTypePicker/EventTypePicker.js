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

import React, {useMemo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {FormInput, Picker, useThemeColor} from '@axelor/aos-mobile-ui';
import {displayItemFullname} from '../../../utils/displayers';
import {EventType} from '../../../types';

const EventTypePicker = ({
  style = null,
  title = 'Crm_Type',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={I18n.t(title)}
        readOnly={true}
        defaultValue={() => displayItemFullname(defaultValue)}
      />
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Picker
        required={required}
        onValueChange={onChange}
        labelField="title"
        title={I18n.t(title)}
        listItems={EventType.getCategoryList(I18n)}
        valueField="key"
        defaultValue={defaultValue}
        isValueItem={true}
      />
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      zIndex: 41,
    },
    title: {
      marginHorizontal: '8%',
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
  });

export default EventTypePicker;
