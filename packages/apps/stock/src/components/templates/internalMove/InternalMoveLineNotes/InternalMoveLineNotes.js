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
import {FormHtmlInput} from '@axelor/aos-mobile-ui';
import StockMove from '../../../../types/stock-move';
import {useTranslator} from '@axelor/aos-mobile-core';
import {StyleSheet, View} from 'react-native';

const InternalMoveLineNotes = ({
  status,
  notes,
  setNotes = () => {},
  setSaveStatus = () => {},
}) => {
  const I18n = useTranslator();

  const handleNotesChange = value => {
    setNotes(value);
    setSaveStatus(false);
  };

  if (status === StockMove.status.Draft) {
    return (
      <View style={styles.container}>
        <FormHtmlInput
          title={I18n.t('Stock_NotesOnStockMove')}
          onChange={handleNotesChange}
          defaultValue={notes}
          style={styles.input}
        />
      </View>
    );
  }

  if (notes != null) {
    return (
      <View style={styles.container}>
        <FormHtmlInput
          title={I18n.t('Stock_NotesOnStockMove')}
          onChange={handleNotesChange}
          defaultValue={notes}
          readonly={true}
          style={styles.input}
        />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
  },
});

export default InternalMoveLineNotes;
