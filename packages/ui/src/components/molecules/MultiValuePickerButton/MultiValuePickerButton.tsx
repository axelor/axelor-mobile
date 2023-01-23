import React, {useMemo} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Color} from '../../../theme/themes';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Card, Icon, Text} from '../../atoms';

interface MultiValuePickerButtonProps {
  style?: any;
  onPress: (any) => void;
  listItem: any;
  labelField?: any;
  onPressItem?: (any) => void;
  itemColor?: Color;
}

const MultiValuePickerButton = ({
  style,
  onPress = () => {},
  listItem,
  labelField,
  onPressItem = () => {},
  itemColor,
}: MultiValuePickerButtonProps) => {
  const Colors = useThemeColor();
  const badgeColor = useMemo(
    () => itemColor || Colors.primaryColor,
    [Colors.primaryColor, itemColor],
  );
  const styles = useMemo(() => getStyles(badgeColor), [badgeColor]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <ScrollView horizontal={true} style={styles.listItemContainer}>
          {listItem &&
            listItem.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onPressItem(item)}
                activeOpacity={0.9}
                style={styles.cardItem}>
                <Text
                  style={styles.text}
                  fontSize={14}
                  numberOfLines={1}
                  textColor={badgeColor.foreground}>
                  {item[labelField]}
                </Text>
                <Icon name={'times'} color={badgeColor.foreground} size={14} />
              </TouchableOpacity>
            ))}
        </ScrollView>
        <Icon
          name="chevron-down"
          color={Colors.secondaryColor_dark.background}
        />
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = (color: Color) =>
  StyleSheet.create({
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
      marginRight: 5,
    },
    listItemContainer: {
      flexDirection: 'row',
      marginLeft: -5,
    },
    cardItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      backgroundColor: color.background_light,
      borderColor: color.background,
      borderWidth: 2,
      borderRadius: 14,
      elevation: 3,
      marginLeft: 5,
      paddingHorizontal: 7,
      height: 22,
      maxWidth: 100,
      width: null,
    },
  });

export default MultiValuePickerButton;
