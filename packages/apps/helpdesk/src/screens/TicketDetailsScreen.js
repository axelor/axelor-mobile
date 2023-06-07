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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  ScrollList,
  MultiValuePicker,
  useThemeColor,
  ChipSelect,
  Text,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {fetchTickets, fetchTicketType} from '../features/ticketSlice';
import {TicketCard, TicketSearchBar} from '../components';
import {Ticket} from '../types';

const TicketDetailsScreen = ({navigation, route}) => {
  const {idTicket, versionTicket, colorIndex} = route.params;
  console.log(idTicket);
  console.log(versionTicket);
  console.log(colorIndex);
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  return (
    <Screen removeSpaceOnTop={true}>
      <Text>D</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headerContainer: {alignItems: 'center'},
  toggleSwitchContainer: {width: '90%', height: 40},
  toggle: {width: '54%', height: 38, borderRadius: 13},
});

export default TicketDetailsScreen;
