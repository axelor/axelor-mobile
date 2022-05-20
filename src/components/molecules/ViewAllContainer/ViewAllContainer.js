import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import Colors from '@/types/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const ViewAllContainer = ({style, children, onPress}) => {
  return (
    <Card style={[styles.container, style]}>
      <View style={styles.cardContainer}>{children}</View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View style={styles.iconContainer}>
          <Text style={styles.txtDetails}>View All</Text>
          <Icon name="chevron-right" style={styles.icon} />
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 4,
  },
  cardContainer: {
    marginBottom: 2,
    width: '100%',
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 2,
    elevation: 3,
  },
  txtDetails: {
    fontSize: 14,
    marginHorizontal: 15,
  },
  icon: {
    fontSize: 24,
    color: Colors.icon.light_grey,
  },
});

export default ViewAllContainer;
