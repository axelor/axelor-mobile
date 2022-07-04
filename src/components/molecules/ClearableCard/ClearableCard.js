import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';

const ClearableCard = ({style, valueTxt, onClearPress}) => {
  return (
    <Card style={[styles.container, style]}>
      <Text style={styles.text}>{valueTxt}</Text>
      <Icon
        name="times"
        touchable={true}
        onPress={onClearPress}
        size={Dimensions.get('window').width * 0.05}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  text: {
    width: '95%',
    margin: 1,
  },
});

export default ClearableCard;
