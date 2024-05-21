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
import {Card, Icon, Text} from '../../../atoms';
import {Data} from '../dashboard.helper';
import {checkNullString, getCommonStyles} from '../../../../utils';
import {MARGIN, getContainerMinWidth, getContainerWidth} from './chart.helper';
import {TextUnit} from '../../../molecules';

interface IndicatorChartProps {
  style?: any;
  widthGraph?: number;
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
      const isIcon = !checkNullString(datasets[0].icon);
      return (
        <>
          <View style={styles.containerOneValue}>
            {isIcon && <Icon size={30} name={datasets[0].icon} />}
            <View style={styles.containerOneValueTitle}>
              <Text
                style={!isIcon && styles.oneValueTitle}
                textColor={datasets[0].color ?? Colors.primaryColor.background}
                writingType="important">
                {`${datasets[0].value} ${datasets[0].unit}`}
              </Text>
              <Text numberOfLines={2} style={!isIcon && styles.oneValueTitle}>
                {datasets[0].title}
              </Text>
            </View>
          </View>
          {!checkNullString(title) && (
            <Text writingType="important" style={styles.oneValueTitle}>
              {title}
            </Text>
          )}
        </>
      );
    } else if (datasets?.length > 1) {
      return (
        <>
          {!checkNullString(title) && (
            <Text writingType="important" style={styles.containerGroupTitle}>
              {title}
            </Text>
          )}
          {datasets.map((data, index) => {
            const isIcon = !checkNullString(data.icon);
            return (
              <View
                style={[
                  commonStyles.button,
                  styles.containerGroupValue,
                  data.color && {
                    backgroundColor: data.color,
                    borderColor: data.color,
                  },
                ]}
                key={index}>
                <View style={styles.groupTitleValue}>
                  {isIcon && (
                    <Icon
                      style={styles.groupTitleIcon}
                      size={20}
                      name={data.icon}
                    />
                  )}
                  <Text numberOfLines={2} writingType="important">
                    {data.title}
                  </Text>
                </View>
                <View style={styles.groupUnitContainer}>
                  <TextUnit
                    unit={data.unit}
                    value={data.value}
                    color={Colors.secondaryColor_dark}
                    fontSize={16}
                    numberOfLines={2}
                    defaultColor={true}
                  />
                </View>
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
      paddingRight: 5,
      paddingLeft: 5,
      paddingVertical: 10,
    },
    containerOneValue: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    containerOneValueTitle: {
      paddingHorizontal: 10,
    },
    oneValueTitle: {
      alignSelf: 'center',
    },
    containerGroupTitle: {
      marginHorizontal: 24,
      marginBottom: 10,
    },
    containerGroupValue: {
      width: '90%',
      flexDirection: 'row',
      paddingVertical: 0,
      paddingHorizontal: 24,
      backgroundColor: color.primaryColor.background_light,
      borderColor: color.primaryColor.background_light,
    },
    groupTitleValue: {
      flex: 2,
      flexDirection: 'row',
    },
    groupTitleIcon: {
      marginRight: 10,
    },
    groupUnitContainer: {
      flex: 1,
      alignItems: 'flex-end',
    },
  });

export default IndicatorChart;
