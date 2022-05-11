import React from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {Card, Text} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const ClearableCard = ({style, valueTxt, onClearPress}) => {
  return (
    <Card style={[styles.container, style]}>
      <Text style={styles.text}>{valueTxt}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={onClearPress}>
          <Icon name="remove" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: '#fff',
  },
  text: {
    width: '85%',
    margin: 1,
  },
  actions: {
    width: '15%',
    display: 'flex',
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    marginLeft: 12,
  },
  icon: {
    fontSize: Dimensions.get('window').width * 0.05,
    color: '#606060',
  },
});

export default ClearableCard;
