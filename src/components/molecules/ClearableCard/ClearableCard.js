import React from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {Card, Text} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@/types/colors';

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
    backgroundColor: Colors.background.white,
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
    color: Colors.icon.dark_grey,
  },
});

export default ClearableCard;
