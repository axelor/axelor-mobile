import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Badge, useThemeColor} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import EventType from '../../../types/event-type';

const EventHeader = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {event} = useSelector(state => state.event);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.halfContainer}>
        <Text style={styles.bold} numberOfLines={2}>
          {event.subject}
        </Text>
      </View>
      <View style={styles.halfContainer}>
        {event.statusSelect && (
          <Badge title={EventType.getStatus(event.statusSelect, I18n)} />
        )}
        {event.typeSelect && (
          <Badge
            title={EventType.getCategory(event.typeSelect, I18n)}
            color={Colors.plannedColor}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  halfContainer: {
    flexDirection: 'row',
    width: '50%',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default EventHeader;
