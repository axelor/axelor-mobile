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
import {LabelText, checkNullString} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';

const EventLabelsCard = ({}) => {
  const I18n = useTranslator();

  const {event} = useSelector((state: any) => state.event);

  return (
    <View style={styles.contentContainer}>
      {!checkNullString(event.location) && (
        <LabelText
          style={styles.margin}
          iconName="geo-fill"
          title={event.location}
        />
      )}
      {event.user != null && (
        <LabelText
          title={I18n.t('Crm_AssignedTo')}
          value={event.user?.fullName}
        />
      )}
      {event.organizer != null && (
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
