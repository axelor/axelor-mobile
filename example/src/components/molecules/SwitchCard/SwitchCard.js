import React, {useMemo} from 'react';
import {Card, Switch, Text} from '@/components/atoms';
import {useThemeColor} from '@aos-mobile/ui';
import {getCommonStyles} from '@/components/commons-styles';

const SwitchCard = ({style, title, defaultValue, onToggle = () => {}}) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <Card style={[styles.filter, styles.filterAlign, styles.filterSize, style]}>
      <Text>{title}</Text>
      <Switch isEnabled={defaultValue} handleToggle={onToggle} />
    </Card>
  );
};

export default SwitchCard;
