/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Text, LabelText, checkNullString} from '@axelor/aos-mobile-ui';
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
        {!checkNullString(contactPartner) && (
          <LabelText iconName="user" title={contactPartner} />
        )}
        {!checkNullString(location) && (
          <LabelText iconName="map-pin" title={location} />
        )}
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
