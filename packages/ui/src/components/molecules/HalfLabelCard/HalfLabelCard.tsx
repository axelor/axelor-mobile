import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Icon, Text} from '../../atoms';

interface HalfLabelCardProps {
  style?: any;
  iconName: string;
  title: string;
  onPress: () => void;
}

const HalfLabelCard = ({
  style,
  iconName,
  title,
  onPress,
}: HalfLabelCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <Icon name={iconName} />
        <Text style={styles.text} numberOfLines={2}>
          {title}
        </Text>
        <Icon name="chevron-right" />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.45,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 15,
    marginVertical: 5,
    marginLeft: 12,
  },
  text: {
    marginHorizontal: '2%',
    width: Dimensions.get('window').width * 0.2,
    textAlign: 'center',
  },
});

export default HalfLabelCard;
