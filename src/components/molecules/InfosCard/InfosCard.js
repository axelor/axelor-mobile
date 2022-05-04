import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const InfosCard = ({style, valueTxt, onClearPress, editable}) => {
  return (
    <Card style={style}>
      <View style={styles.container}>
        <Text style={styles.text}>{valueTxt}</Text>
        {editable ? (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={onClearPress}>
              <Icon name="remove" size={24} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    margin: 1,
  },
  actions: {
    width: '10%',
    display: 'flex',
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    marginLeft: 12,
  },
});

export default InfosCard;
