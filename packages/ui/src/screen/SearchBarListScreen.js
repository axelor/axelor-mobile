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

import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, ScrollList, HeaderContainer} from '@axelor/aos-mobile-ui';
import {useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {Text} from '../components';

const SearchBarListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  return (
    <Screen removeSpaceOnTop={true}>
      <Text>Test</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default SearchBarListScreen;
