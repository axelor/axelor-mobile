import React, {ReactNode, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {DropdownCard} from '../../molecules';

interface DropdownCardSwitchProps {
  style?: any;
  dropdownItems: DropdownItem[];
}
interface DropdownItem {
  key: number;
  title: string;
  childrenComp: ReactNode;
}

const DropdownCardSwitch = ({
  style,
  dropdownItems,
}: DropdownCardSwitchProps) => {
  const [openedCardKey, setOpenedCardKey] = useState<Number>();

  return (
    <View style={[styles.container, style]}>
      {dropdownItems.map((elt, index) => {
        return (
          <DropdownCard
            key={index}
            title={elt.title}
            onPress={() => setOpenedCardKey(elt.key)}
            DropdownIsOpen={elt.key === openedCardKey}>
            {elt.childrenComp}
          </DropdownCard>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
  },
});

export default DropdownCardSwitch;
