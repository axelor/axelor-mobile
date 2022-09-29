import React, {useMemo} from 'react';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Card, Switch, Text} from '../../atoms';

interface SwitchCardProps {
  style?: any;
  title: string;
  defaultValue: boolean;
  onToggle: (any) => void;
}

const SwitchCard = ({
  style,
  title,
  defaultValue,
  onToggle = () => {},
}: SwitchCardProps) => {
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
