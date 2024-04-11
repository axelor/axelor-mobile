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

const MARGIN = 5;

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
  }, [
    Colors.primaryColor.background,
    commonStyles.button,
    datasets,
    styles,
    title,
  ]);

  if (!Array.isArray(datasets) || datasets.length === 0) {
    return null;
  }

  return (
    <Container
      style={[styles.container, {width: widthGraph - MARGIN * 2}, style]}>
      {renderIndicator}
    </Container>
  );
};

const getStyles = (color: ThemeColors) =>
  StyleSheet.create({
    container: {
      minWidth:
        Dimensions.get('window').width > 500
          ? Dimensions.get('window').width / 4 - MARGIN * 2
          : Dimensions.get('window').width / 2 - MARGIN * 2,
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
      marginLeft: 24,
      maxWidth: '30%',
    },
    groupLabel: {
      marginRight: 24,
      maxWidth: '40%',
    },
    centerContent: {
      justifyContent: 'center',
    },
    oneValueCentered: {
      alignSelf: 'center',
    },
    valueContainer: {
      backgroundColor: color.primaryColor.background,
      borderColor: color.primaryColor.background,
      paddingVertical: 0,
      width: '90%',
      justifyContent: 'space-between',
    },
  });

export default IndicatorChart;
