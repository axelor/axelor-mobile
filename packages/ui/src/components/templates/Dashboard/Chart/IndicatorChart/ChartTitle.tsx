/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {Text} from '../../../../atoms';
import {checkNullString} from '../../../../../utils';

interface ChartTitleProps {
  style?: any;
  title: string;
  align?: boolean;
}

const ChartTitle = ({style, title, align = false}: ChartTitleProps) => {
  if (checkNullString(title)) {
    return null;
  }

  return (
    <Text writingType="important" style={[align && styles.align, style]}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  align: {
    alignSelf: 'center',
  },
});

export default ChartTitle;
