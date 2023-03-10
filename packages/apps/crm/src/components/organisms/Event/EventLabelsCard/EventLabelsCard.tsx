import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LabelText} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';

const EventLabelsCard = ({}) => {
  const I18n = useTranslator();

  const {event} = useSelector((state: any) => state.event);

  return (
    <View style={styles.contentContainer}>
      {event.location && (
        <LabelText
          style={styles.margin}
          iconName="map-pin"
          title={event.location}
        />
      )}
      {event.user?.fullName && (
        <LabelText
          title={I18n.t('Crm_AssignedTo')}
          value={event.user?.fullName}
        />
      )}
      {event.organizer && (
        <LabelText
          title={I18n.t('Crm_Organisator')}
          value={event.organizer?.name?.split(' [')[0]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    marginHorizontal: 10,
  },
  margin: {
    marginVertical: 5,
  },
});

export default EventLabelsCard;
