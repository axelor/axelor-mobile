import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

const ChipSelect = ({children, scrollable = false}) => {
  return (
    <View style={styles.chipContainer}>
      {scrollable ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
});

export default ChipSelect;
