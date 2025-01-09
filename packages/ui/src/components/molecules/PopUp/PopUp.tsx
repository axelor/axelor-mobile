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
import {StyleSheet, View, Modal} from 'react-native';
import {checkNullString} from '../../../utils/strings';
import {Card, Text} from '../../atoms';

interface PopUpProps {
  style?: any;
  visible: boolean;
  title?: string;
  data?: string;
  children: any;
  childrenStyle?: any;
}

const PopUp = ({
  style,
  visible,
  title,
  data,
  children,
  childrenStyle,
}: PopUpProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => console.log('closed')}>
      <View style={styles.modalBackground}>
        <Card style={[styles.container, style]}>
          {!checkNullString(title) && (
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{title}</Text>
            </View>
          )}
          {!checkNullString(data) && (
            <View style={styles.contentContainer}>
              <Text style={styles.text}>{data}</Text>
            </View>
          )}
          <View style={[styles.buttonContainer, childrenStyle]}>
            {children}
          </View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginBottom: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
});

export default PopUp;
