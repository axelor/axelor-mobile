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
import {useTranslator} from '@axelor/aos-mobile-core';
import {Picker, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {Ticket} from '../../../types';
import {StyleSheet, View} from 'react-native';

const TicketPriorityPicker = ({
  title = 'Helpdesk_CustomPartner',
  defaultValue = null,
  onChange = () => {},
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <View>
      <Text style={styles.title}>{I18n.t(title)}</Text>
      <Picker
        required={required}
        onValueChange={onChange}
        labelField="title"
        listItems={Ticket.getPriorityList(Colors, I18n)}
        valueField="key"
        defaultValue={defaultValue}
        disabled={readonly}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: '8%',
  },
});

export default TicketPriorityPicker;
