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

import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../../theme';
import {Text} from '../../../atoms';
import {GanttScaleCell} from '../types';
import {
  GANTT_SCALE_BAND_HEIGHT,
  GANTT_SCALE_DETAIL_HEIGHT,
} from '../gantt-view.styles';

interface GanttScaleSpanRowProps {
  cells: GanttScaleCell[];
  variant: 'band' | 'detail';
}

const GanttScaleSpanRow = ({cells, variant}: GanttScaleSpanRowProps) => {
  const Colors = useThemeColor();

  const isBand = variant === 'band';

  return (
    <View
      style={[
        isBand ? styles.bandRow : styles.detailRow,
        {
          borderBottomColor: isBand
            ? Colors.secondaryColor.background_light
            : Colors.secondaryColor_dark.background_light,
        },
        isBand && {backgroundColor: Colors.screenBackgroundColor},
      ]}>
      {cells.map(({key, width, label, isCurrent}) => (
        <View
          key={key}
          style={[
            styles.cell,
            {width, borderRightColor: Colors.secondaryColor.background_light},
          ]}>
          <Text
            numberOfLines={1}
            fontSize={10}
            writingType={isBand || isCurrent ? 'important' : undefined}
            textColor={
              isCurrent
                ? Colors.primaryColor.background
                : isBand
                  ? Colors.secondaryColor.background
                  : undefined
            }>
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bandRow: {
    height: GANTT_SCALE_BAND_HEIGHT,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  detailRow: {
    height: GANTT_SCALE_DETAIL_HEIGHT,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  cell: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRightWidth: 1,
  },
});

export default memo(GanttScaleSpanRow);
