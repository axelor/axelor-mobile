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

import {StyleSheet} from 'react-native';

export const getCommonStyles = (Colors, _required = false) =>
  StyleSheet.create({
    filter: {
      backgroundColor: Colors.screenBackgroundColor,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 0,
      marginVertical: 8,
    },
    filterAlign: {
      marginHorizontal: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    filterSize: {
      width: '90%',
      height: 52,
      minHeight: 52,
    },
    button: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      paddingHorizontal: 10,
      paddingVertical: 2,
      marginVertical: 5,
      borderRadius: 7,
      borderWidth: 2,
      height: 50,
      minHeight: 40,
    },
    inputFocused: {
      borderWidth: 1,
      borderColor: _required
        ? Colors.errorColor.background
        : Colors.primaryColor.background,
    },
  });
