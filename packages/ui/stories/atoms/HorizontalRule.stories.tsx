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
import {storiesOf} from '@storybook/react-native';
import {HorizontalRule, Text} from '../../src/components/atoms';

storiesOf('ui/atoms/HorizontalRule', module).add('default', () => (
  <>
    <Text>Before rule</Text>
    <HorizontalRule style={styles.container} />
    <Text>After rule</Text>
  </>
));

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
