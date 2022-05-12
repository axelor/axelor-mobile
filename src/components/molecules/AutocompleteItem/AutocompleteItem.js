import React from 'react';
import {View} from 'react-native';
import {Text} from '@/components/atoms';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AutocompleteItem = ({style, content, onPress}) => {
  return (
    <View>
      {content == null ? null : (
        <TouchableOpacity onPress={onPress}>
          <Text style={style}>{content}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AutocompleteItem;
