import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {useThemeColor} from '../../../theme/ThemeContext';
import {checkNullString} from '../../../utils/strings';
import {Text} from '../../atoms';
import Chart, {Data} from '../types/chart';

interface PieChartProps {
  styleContainer?: any;
  datasets: Data[];
  legend?: boolean;
  title?: string;
  donut?: boolean;
  showGradient?: boolean;
  sectionAutoFocus?: boolean;
  radius?: number;
  innerRadius?: number;
  focusOnPress?: boolean;
}

const PieChartDashboard = ({
  styleContainer,
  datasets,
  legend = false,
  title,
  donut = true,
  showGradient = true,
  sectionAutoFocus = true,
  radius = 90,
  innerRadius = 60,
  focusOnPress = true,
}: PieChartProps) => {
  const Color = useThemeColor();

  const [dataSet, setDataSet] = useState(datasets);

  useEffect(() => {
    const newDatasets = datasets.map((item, index) => {
      return item.color
        ? {...item}
        : {...item, color: Chart.getChartColor(index, Color).background};
    });
    setDataSet(newDatasets);
  }, [Color, datasets]);

  const renderLegendBorderColor = color => ({
    borderWidth: 5,
    marginVertical: 2,
    borderColor: color,
    backgroundColor: color,
  });

  return (
    <View style={[style.container, styleContainer]}>
      <PieChart
        data={dataSet}
        donut={donut}
        showGradient={showGradient}
        sectionAutoFocus={sectionAutoFocus}
        radius={radius}
        innerRadius={innerRadius}
        focusOnPress={focusOnPress}
      />
      {!checkNullString(title) && <Text style={style.title}>{title}</Text>}
      {legend && (
        <View style={style.legenContainer}>
          {dataSet.map((_data, index) => (
            <View key={index} style={style.itemLegendContainer}>
              <View style={renderLegendBorderColor(_data.color)} />
              <Text style={style.text}>{_data.label}</Text>
              <Text>{_data.value}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    width:
      Dimensions.get('window').width > 500
        ? Dimensions.get('window').width / 4
        : Dimensions.get('window').width / 2,
  },
  legenContainer: {
    flexDirection: 'column',
  },
  itemLegendContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  text: {
    marginHorizontal: 5,
  },
  title: {alignSelf: 'center'},
});

export default PieChartDashboard;
