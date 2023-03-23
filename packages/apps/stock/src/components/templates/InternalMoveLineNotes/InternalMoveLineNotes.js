/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {Text, Card, Input} from '@axelor/aos-mobile-ui';
import {View, StyleSheet} from 'react-native';
import StockMove from '../../../types/stock-move';
import {useTranslator} from '@axelor/aos-mobile-core';

const InternalMoveLineNotes = ({status, notes, setNotes, setSaveStatus}) => {
  const I18n = useTranslator();

  const handleNotesChange = value => {
    setNotes(value);
    setSaveStatus(false);
  };

  return (
    <>
      {status === StockMove.status.Draft && (
        <View>
          <View style={styles.reasonTitle}>
            <Text>{I18n.t('Stock_NotesOnStockMove')}</Text>
          </View>
          <Card style={styles.infosCard}>
            <Input
              value={notes}
              onChange={handleNotesChange}
              multiline={true}
            />
          </Card>
        </View>
      )}
      {status === StockMove.status.Planned ||
        status === StockMove.status.Realized ||
        (status === StockMove.status.Canceled && (
          <View>
            <View style={styles.reasonTitle}>
              <Text>{I18n.t('Stock_NotesOnStockMove')}</Text>
            </View>
            <Card style={styles.infosCard}>
              <Text numberOfLines={3}>{notes}</Text>
            </Card>
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  infosCard: {
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  reasonTitle: {
    marginHorizontal: 20,
  },
});

export default InternalMoveLineNotes;
