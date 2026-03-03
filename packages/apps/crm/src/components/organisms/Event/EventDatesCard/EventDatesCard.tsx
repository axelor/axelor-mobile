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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {FromTo, TitledValue} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useTranslator,
  formatDateTime,
} from '@axelor/aos-mobile-core';

const EventDatesCard = () => {
  const I18n = useTranslator();
  const {event} = useSelector((state: any) => state.event);

  const _formatDate = useCallback(
    date => formatDateTime(date, I18n.t('Base_DateTimeFormat')),
    [I18n],
  );

  if (event.startDateTime || event.endDateTime) {
    return (
      <FromTo
        style={styles.detailsContainer}
        fromComponent={
          <TitledValue
            title={I18n.t('Crm_Start')}
            value={_formatDate(event.startDateTime)}
          />
        }
        toComponent={
          <TitledValue
            title={I18n.t('Crm_End')}
            value={_formatDate(event.endDateTime)}
          />
        }
      />
    );
  }

  return null;
};

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
});

export default EventDatesCard;
