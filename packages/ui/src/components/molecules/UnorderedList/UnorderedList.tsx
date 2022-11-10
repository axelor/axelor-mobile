import React, {useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from '../../atoms';

interface UnorderedListProps {
  data: any[];
  numberOfItems?: number;
  renderItem: (item: any) => any;
  style?: any;
}

function UnorderedList({
  data,
  numberOfItems,
  renderItem,
  style,
}: UnorderedListProps) {
  const renderData = useMemo(() => {
    if (!numberOfItems || data.length === 0) {
      return data;
    }

    if (numberOfItems > data.length) {
      console.warn(
        `Number of items provided with value ${numberOfItems} is invalid`,
      );
      return data;
    }

    return data.slice(0, numberOfItems);
  }, [numberOfItems, data]);

  return (
    <FlatList
      data={renderData}
      style={[styles.container, style]}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.dot}>{'\u2022 '}</Text>
          {renderItem({item})}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  dot: {
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UnorderedList;
