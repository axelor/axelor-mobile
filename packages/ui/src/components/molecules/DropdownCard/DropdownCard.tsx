import React, {useMemo, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {animationUtil} from '../../../tools/AnimationUtil';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Card, Icon, Text} from '../../atoms';

interface DropdownCardProps {
  style?: any;
  styleText?: any;
  title: string;
  children: any;
  DropdownIsOpen?: boolean;
  onPress?: () => void;
}

const DropdownCard = ({
  style,
  styleText,
  title,
  DropdownIsOpen = false,
  children,
  onPress,
}: DropdownCardProps) => {
  const [isOpen, setIsOpen] = useState(DropdownIsOpen);
  const Colors = useThemeColor();

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const displayCard = useMemo(() => {
    return onPress ? DropdownIsOpen : isOpen;
  }, [DropdownIsOpen, isOpen, onPress]);

  const handleCardPress = () => {
    animationUtil.animateNext();
    onPress ? onPress() : setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={handleCardPress}
        activeOpacity={0.95}>
        <Card style={[styles.containerTouchable, style]}>
          <Text style={styleText} numberOfLines={1}>
            {title}
          </Text>
          <Icon
            name={displayCard ? 'chevron-up' : 'chevron-down'}
            color={Colors.primaryColor.background}
          />
        </Card>
      </TouchableOpacity>
      {displayCard && <Card style={styles.containerChildren}>{children}</Card>}
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get('window').width * 0.9,
    },
    touchable: {
      zIndex: 2,
    },
    containerTouchable: {
      width: Dimensions.get('window').width * 0.9,
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
      marginVertical: 4,
      marginRight: 16,
      marginLeft: 18,
      paddingRight: 50,
      paddingLeft: 10,
    },
    containerChildren: {
      backgroundColor: Colors.backgroundColor,
      width: Dimensions.get('window').width * 0.9,
      paddingTop: 25,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      marginTop: -20,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  });

export default DropdownCard;
