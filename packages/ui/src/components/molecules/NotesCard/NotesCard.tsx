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
import {StyleSheet, View} from 'react-native';
import {Card, HtmlInput, Text} from '../../atoms';

interface NotesCardProps {
  title: string;
  data: string;
  style?: any;
}

const NotesCard = ({title, data, style}: NotesCardProps) => {
  if (data == null || data === '') {
    return null;
  }

  return (
    <View style={[styles.description, style]}>
      <Text style={styles.title}>{title}</Text>
      <Card style={styles.note}>
        <HtmlInput defaultInput={data} readonly={true} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    flexDirection: 'column',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    marginLeft: 10,
  },
  note: {
    justifyContent: 'center',
    width: '100%',
    elevation: 0,
    shadowOpacity: 0,
    borderRadius: 7,
    marginVertical: 8,
    paddingRight: 10,
    paddingVertical: 10,
  },
});

export default NotesCard;
