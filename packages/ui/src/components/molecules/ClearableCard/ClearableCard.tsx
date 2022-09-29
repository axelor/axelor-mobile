import React, {useMemo} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Card, Icon, Text} from '../../atoms';

interface ClearableCardPops {
  style?: any;
  valueTxt: string;
  onClearPress: (any) => void;
}

const ClearableCard = ({style, valueTxt, onClearPress}) => {
  const Colors = useThemeColor();
  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <Card
      style={[
        commonStyles.filter,
        commonStyles.filterAlign,
        commonStyles.filterSize,
        style,
      ]}>
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
  text: {
    width: '95%',
    margin: 1,
  },
});

export default ClearableCard;
