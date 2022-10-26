import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../../atoms';
import {DottedLine} from '../../atoms';

interface MovementIndicationCardProps {
  style?: any;
  titleTop: string;
  iconTop: React.ReactNode;
  onPressTitleTop?: () => void;
  disabledTop?: boolean;
  titleDown: string;
  iconDown: React.ReactNode;
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
      <View style={styles.containerChildren}>
        <View>
          {iconTop}
          <TouchableOpacity
            style={styles.title}
            onPress={onPressTitleTop}
            disabled={disabledTop}>
            <Text>{titleTop}</Text>
          </TouchableOpacity>
        </View>
        <DottedLine style={styles.dottedLine} />
        <View>
          {iconDown}
          <TouchableOpacity
            style={styles.title}
            onPress={onPressTitleDown}
            disabled={disabledDown}>
            <Text>{titleDown}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 80,
  },
  containerChildren: {
    position: 'absolute',
    left: '7%',
  },
  dottedLine: {
    left: 8.5,
  },
  title: {
    width: 150,
    position: 'absolute',
    left: 25,
  },
});

export default MovementIndicationCard;
