import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {checkNullString, Text, UnorderedList} from '@axelor/aos-mobile-ui';

interface HazardPhraseListProps {
  data: any[];
}

const HazardPhraseList = ({data}: HazardPhraseListProps) => {
  const renderItem = useCallback(({item}: any) => {
    if (!item) return null;

    return (
      <View style={styles.container}>
        <Text>{`${item.phrase} (${item.phraseCode})`}</Text>
        {!checkNullString(item.clpDesignation) && (
          <Text writingType="details">{item.clpDesignation}</Text>
        )}
      </View>
    );
  }, []);

  return (
    <UnorderedList data={data} renderItem={renderItem} style={styles.list} />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  container: {
    padding: 5,
  },
});

export default HazardPhraseList;
