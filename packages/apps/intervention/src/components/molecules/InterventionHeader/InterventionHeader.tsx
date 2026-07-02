/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {DateDisplay, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {Badge, LabelText, Text} from '@axelor/aos-mobile-ui';

interface InterventionHeaderProps {
  intervention: any;
}

const InterventionHeader = ({intervention}: InterventionHeaderProps) => {
  const {Intervention} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  return (
    <View style={styles.container}>
      <View style={styles.columnContainer}>
        <Text writingType="title">{intervention.sequence}</Text>
        <LabelText
          iconName="tools"
          title={intervention.interventionType.name}
        />
        <LabelText
          iconName="person-fill"
          title={intervention.deliveredPartner.fullName}
        />
      </View>
      <View style={styles.badgeContainer}>
        <Badge
          title={getItemTitle(
            Intervention?.statusSelect,
            intervention.statusSelect,
          )}
          color={getItemColor(
            Intervention?.statusSelect,
            intervention.statusSelect,
          )}
        />
        <DateDisplay date={intervention.planifStartDateTime} size={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: 'row',
    gap: 5,
  },
  columnContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  badgeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});

export default InterventionHeader;
