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
import {ThemeColors} from '../theme';

export const getCommonStyles = (
  Colors: ThemeColors,
  _required: boolean = false,
  _isFocused: boolean = false,
) =>
  StyleSheet.create({
    filter: {
      width: '90%',
      backgroundColor: Colors.screenBackgroundColor,
      borderColor: _required
        ? Colors.errorColor.background
        : _isFocused
          ? Colors.primaryColor.background
          : Colors.secondaryColor.background_light,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 0,
      marginVertical: 4,
    },
    filterAlign: {
      marginHorizontal: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
  });
