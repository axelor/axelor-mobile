/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {StyleSheet, Dimensions, View} from 'react-native';
import {ThemeColors, useThemeColor} from '../../../../theme';
import {Card, Text} from '../../../atoms';
import {Data} from '../dashboard.helper';
import {getCommonStyles} from '../../../../utils';
import {MARGIN, getContainerMinWidth, getContainerWidth} from './chart.helper';

interface IndicatorChartProps {
  style?: any;
  widthGraph?: any;
  datasets: Data[];
  title?: string;
  hideCardBackground?: boolean;
}

const IndicatorChart = ({
  style,
  widthGraph = Dimensions.get('window').width,
  datasets,
  title,
  hideCardBackground = false,
}: IndicatorChartProps) => {
  const Colors = useThemeColor();

  const Container = hideCardBackground ? View : Card;

  const commonStyles = useMemo(() => {
    return getCommonStyles(Colors);
  }, [Colors]);

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const containerWidth = useMemo(() => {
    return getContainerWidth(widthGraph);
  }, [widthGraph]);

  const containerMinWidth = useMemo(() => {
    return getContainerMinWidth();
  }, []);

  const renderIndicator = useMemo(() => {
    if (datasets?.length === 1) {
      return (
        <>
          <Text
            style={styles.title}
            textColor={Colors.primaryColor.background}
            writingType="important">
            {`${datasets[0].value} ${datasets[0].label}`}
          </Text>
          <Text style={styles.title}>{title}</Text>
        </>
      );
    } else if (datasets?.length > 1) {
      return (
        <>
          <Text style={styles.groupTitle}>{title}</Text>
          {datasets.map((data, index) => {
            const isLabelAbsent = data.label == null;
            return (
              <View
                style={[
                  commonStyles.button,
                  styles.valueContainer,
                  isLabelAbsent && styles.centerContent,
                ]}
                key={index}>
                <Text
                  numberOfLines={2}
                  style={
                    isLabelAbsent ? styles.oneValueCentered : styles.groupValue
                  }
                  writingType="important">
                  {data.value}
                </Text>
                {!isLabelAbsent && (
                  <Text
                    numberOfLines={2}
                    style={styles.groupLabel}
                    writingType="important">
                    {data.label}
                  </Text>
                )}
              </View>
            );
          })}
        </>
      );
    }
  }, [Colors, commonStyles.button, datasets, styles, title]);

  if (!Array.isArray(datasets) || datasets.length === 0) {
    return null;
  }

  return (
    <Container
      style={[
        styles.container,
        {width: containerWidth, minWidth: containerMinWidth},
        style,
      ]}>
      {renderIndicator}
    </Container>
  );
};

const getStyles = (color: ThemeColors) =>
  StyleSheet.create({
    container: {
      margin: MARGIN,
      paddingHorizontal: 0,
      paddingRight: 5,
      paddingVertical: 10,
    },
    title: {
      alignSelf: 'center',
      textAlign: 'center',
    },
    groupTitle: {
      marginHorizontal: 24,
      marginBottom: 10,
    },
    groupValue: {
      flex: 1,
    },
    groupLabel: {
      flex: 1,
      textAlign: 'right',
    },
    centerContent: {
      justifyContent: 'center',
    },
    oneValueCentered: {
      alignSelf: 'center',
    },
    valueContainer: {
      backgroundColor: color.primaryColor.background_light,
      borderColor: color.primaryColor.background_light,
      paddingVertical: 0,
      paddingHorizontal: 24,
      width: '90%',
      justifyContent: 'space-between',
    },
  });

export default IndicatorChart;
