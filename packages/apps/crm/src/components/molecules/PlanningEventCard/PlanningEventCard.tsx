import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Text, LabelText} from '@axelor/aos-mobile-ui';
interface PlanningEventCardProps {
  style?: any;
  onPress: () => void;
  subject: string;
  id: string | number;
  contactPartner?: string;
  location?: string;
}

const PlanningEventCard = ({
  style,
  onPress,
  subject,
  id,
  contactPartner,
  location,
}: PlanningEventCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card key={id} style={[styles.container, style]}>
        <Text style={styles.bold}>{subject}</Text>
        {contactPartner && (
          <LabelText iconName="map-pin" title={contactPartner} />
        )}
        {location && <LabelText iconName="map-pin" title={location} />}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default PlanningEventCard;
