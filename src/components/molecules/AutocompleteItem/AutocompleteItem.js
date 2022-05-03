import React from 'react';
import {View} from 'react-native';
import {Text} from '@/components/atoms';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AutocompleteItem = ({style, content, onPress}) => {
  const getItem = () => {
    if (content === null) {
      return null;
    } else {
      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={style}>{content}</Text>
        </TouchableOpacity>
      );
    }
  };

  return <View>{getItem(content)}</View>;
};

export default AutocompleteItem;
