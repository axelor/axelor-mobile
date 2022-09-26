import React, {useMemo} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {getCommonStyles} from '@/components/commons-styles';
import {useThemeColor} from '@aos-mobile/ui';

const ClearableCard = ({
  style,
  valueTxt,
  onClearPress = () => {},
  clearable = true,
}) => {
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
      {clearable && (
        <Icon
          name="times"
          touchable={true}
          onPress={onClearPress}
          size={Dimensions.get('window').width * 0.05}
        />
      )}
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
