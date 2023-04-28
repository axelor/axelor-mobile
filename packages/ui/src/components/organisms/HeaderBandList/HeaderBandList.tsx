import React from 'react';
import {View} from 'react-native';
import {Color} from '../../../theme';
import {HeaderBand} from '../../molecules';

interface HeaderBandItem {
  key: string;
  color: Color;
  text: string;
  showIf?: boolean;
  order?: number;
}

interface HeaderBandListProps {
  items: HeaderBandItem[];
}

const HeaderBandList = ({items}: HeaderBandListProps) => {
  return (
    <View>
      {items.map(item => (
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

export default HeaderBandList;
