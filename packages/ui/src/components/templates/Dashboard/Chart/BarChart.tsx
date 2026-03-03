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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {BarChart as RNBarChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../../theme';
import {Card, Text} from '../../../atoms';
import {checkNullString} from '../../../../utils';
import {Data} from '../dashboard.helper';
import {
  MARGIN,
  getContainerMinWidth,
  getContainerWidth,
  initBarData,
} from './chart.helper';
import DetailsPopup from './DetailsPopup';

interface BarCharProps {
  style?: any;
  widthGraph?: number;
  datasets: Data[][];
  spacing?: number;
  horizontal?: boolean;
  title?: string;
  rotateLabel?: boolean;
  hideCardBackground?: boolean;
  translator: (translationKey: string) => string;
}

const BarChart = ({
  style,
  widthGraph = Dimensions.get('window').width * 0.6,
  datasets,
  spacing,
  horizontal = false,
  title,
  rotateLabel = true,
  hideCardBackground = false,
  translator,
}: BarCharProps) => {
  const Colors = useThemeColor();

  const [selectedBar, setSelectedBar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const barChartData = useMemo(() => {
    return initBarData(datasets, rotateLabel, spacing, Colors);
  }, [Colors, datasets, rotateLabel, spacing]);

  const styles = useMemo(() => {
    return getStyles(rotateLabel);
  }, [rotateLabel]);

  const containerWidth = useMemo(() => {
    return getContainerWidth(widthGraph);
  }, [widthGraph]);

  const containerMinWidth = useMemo(() => {
    return getContainerMinWidth();
  }, []);

  const _graphWidth = useMemo(() => {
    return containerWidth - 50;
  }, [containerWidth]);

  const _spacing = useMemo(() => {
    if (spacing != null) {
      return spacing;
    }

    return Math.max(containerWidth / barChartData.length, 20);
  }, [containerWidth, barChartData.length, spacing]);

  const Container = hideCardBackground ? View : Card;

  const handleBarPress = useCallback(barData => {
    setSelectedBar(barData);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <Container
      style={[
        styles.container,
        {width: containerWidth, minWidth: containerMinWidth},
        style,
      ]}>
      <RNBarChart
        data={barChartData}
        width={_graphWidth}
        isAnimated={true}
        barBorderRadius={4}
        barBorderTopRightRadius={7}
        barBorderTopLeftRadius={7}
        barBorderBottomRightRadius={0}
        barBorderBottomLeftRadius={0}
        initialSpacing={_spacing / 2}
        spacing={_spacing}
        endSpacing={_spacing}
        horizontal={horizontal}
        onPress={handleBarPress}
        yAxisTextStyle={{color: Colors.secondaryColor_dark.background}}
        xAxisLabelTextStyle={{color: Colors.secondaryColor_dark.background}}
      />
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      <DetailsPopup
        closeModal={closeModal}
        modalVisible={modalVisible}
        selectedItem={selectedBar}
        translator={translator}
      />
    </Container>
  );
};

const getStyles = rotateLabel =>
  StyleSheet.create({
    container: {
      margin: MARGIN,
      paddingHorizontal: 0,
      paddingRight: 5,
      paddingVertical: 10,
      overflow: 'hidden',
    },
    title: {
      marginTop: rotateLabel ? 30 : 0,
      alignSelf: 'center',
      textAlign: 'center',
    },
  });

export default BarChart;
