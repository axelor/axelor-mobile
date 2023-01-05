import React, {useMemo, useState, useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text} from '../../atoms';
import {Color} from '../../../theme/themes';
import {useThemeColor} from '../../../theme/ThemeContext';
import {
  OUTSIDE_INDICATOR,
  useClickOutside,
} from '../../../hooks/use-click-outside';

interface InfoBubbleProps {
  style?: any;
  iconName: string;
  badgeColor: Color;
  indication: string;
}

const InfoBubble = ({
  style,
  iconName,
  badgeColor,
  indication,
}: InfoBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const Colors = useThemeColor();
  const clickOutside = useClickOutside({wrapperRef, visible: isOpen});

  const styles = useMemo(
    () => getStyles(badgeColor, Colors),
    [badgeColor, Colors],
  );

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && isOpen) {
      setIsOpen(false);
    }
  }, [clickOutside, isOpen]);

  const onPress = () => {
    setIsOpen(current => !current);
  };

  return (
    <View ref={wrapperRef} style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
        <Icon
          name={iconName}
          style={styles.imageStyle}
          color={badgeColor.foreground}
        />
      </TouchableOpacity>
      {isOpen ? (
        <Card style={styles.indicationCard}>
          <Text>{indication}</Text>
        </Card>
      ) : null}
    </View>
  );
};

const getStyles = (badgeColor, Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 5,
    },
    imageStyle: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: badgeColor.background_light,
      borderWidth: 2,
      borderColor: badgeColor.background,
      borderRadius: Dimensions.get('window').width * 0.1,
      width: Dimensions.get('window').width * 0.1,
      height: Dimensions.get('window').width * 0.1,
    },
    indicationCard: {
      position: 'absolute',
      marginLeft: '12%',
      paddingLeft: 10,
      paddingVertical: 10,
      paddingRight: 10,
      backgroundColor: Colors.backgroundColor,
    },
  });

export default InfoBubble;
