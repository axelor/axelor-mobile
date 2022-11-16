import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Text} from '../../atoms';

interface RightIconProps {
  style?: any;
  styleText?: any;
  onPress: (any) => void;
  title?: string;
  icon: React.ReactNode;
}

const RightIconButton = ({
  style,
  styleText,
  onPress = () => {},
  title = null,
  icon,
}: RightIconProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <Text style={[styleText, styles.text]} numberOfLines={2}>
          {title != null ? title : ''}
        </Text>
        {icon}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.35,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 15,
    paddingVertical: 5,
    marginVertical: 4,
    marginRight: 16,
  },
  text: {
    textAlign: 'center',
  },
});

export default RightIconButton;
