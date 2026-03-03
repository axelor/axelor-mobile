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
import {checkNullString} from '../../../utils';
import {Text} from '../../atoms';

const ItemTitle = ({
  style,
  title,
  fontSize = 12,
}: {
  style?: any;
  title: string;
  fontSize?: number;
}) => {
  if (checkNullString(title)) {
    return null;
  }

  return (
    <Text fontSize={fontSize} numberOfLines={1} style={[styles.title, style]}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});

export default ItemTitle;
