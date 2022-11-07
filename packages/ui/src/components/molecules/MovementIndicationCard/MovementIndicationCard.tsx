import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../../atoms';
import {DottedLine} from '../../atoms';

interface MovementIndicationCardProps {
  style?: any;
  titleTop: string;
  iconTop: React.ReactElement;
  onPressTitleTop?: () => void;
  disabledTop?: boolean;
  titleDown: string;
  iconDown: React.ReactElement;
  onPressTitleDown?: () => void;
  disabledDown?: boolean;
}

function MovementIndicationCard({
  style,
  titleTop,
  iconTop,
  onPressTitleTop,
  disabledTop = true,
  titleDown,
  iconDown,
  onPressTitleDown,
  disabledDown = true,
}: MovementIndicationCardProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        {React.cloneElement(iconTop, {style: styles.icon})}
        <TouchableOpacity
          style={styles.title}
          onPress={onPressTitleTop}
          disabled={disabledTop}>
          <Text numberOfLines={2}>{titleTop}</Text>
        </TouchableOpacity>
      </View>
      <DottedLine style={styles.dottedLine} />
      <View style={styles.titleContainer}>
        {React.cloneElement(iconDown, {style: styles.icon})}
        <TouchableOpacity
          style={styles.title}
          onPress={onPressTitleDown}
          disabled={disabledDown}>
          <Text numberOfLines={2}>{titleDown}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: 16,
    alignItems: 'center',
    marginBottom: 5,
  },
  dottedLine: {
    marginHorizontal: '5%',
    alignSelf: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    flex: 9,
    width: '90%',
    marginLeft: 5,
  },
  icon: {
    flex: 1,
  },
});

export default MovementIndicationCard;
