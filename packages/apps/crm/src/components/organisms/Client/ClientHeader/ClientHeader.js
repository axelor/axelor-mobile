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
import {useSelector, AOSImageBubble} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';

const ClientHeader = ({style = null}) => {
  const {client} = useSelector(state => state.client);

  return (
    <View style={[styles.headerContainerChildren, style]}>
      <AOSImageBubble metaFileId={client?.picture?.id} />
      <View style={styles.headerInfo}>
        <Text style={styles.textTitle} fontSize={16}>
          {client.simpleFullName}
        </Text>
        <Text fontSize={14}>{client.partnerSeq}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerChildren: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center',
  },
  headerInfo: {
    flexDirection: 'column',
    marginLeft: '7%',
    flex: 1,
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default ClientHeader;
