import React from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {Color} from '@axelor/aos-mobile-ui';
import {HeaderBand} from '../../molecules';
import {useHeaderBand} from '../../../header';

interface HeaderBandItem {
  key: string;
  color: Color;
  text: string;
  showIf?: () => boolean;
  order?: number;
}

interface HeaderBandListProps {
  items: HeaderBandItem[];
}

const HeaderBandList = () => {
  const {filteredBands} = useHeaderBand();

  return (
    <View style={styles.container}>
      {filteredBands.map((item: HeaderBandItem) => (
        <HeaderBand
          key={item.key}
          color={item.color}
          text={item.text}
          showIf={item.showIf}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    width: Dimensions.get('screen').width,
  },
});

export default HeaderBandList;
