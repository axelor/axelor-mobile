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
import {Text, LabelText} from '@axelor/aos-mobile-ui';
import {useSelector, AOSImageBubble} from '@axelor/aos-mobile-core';

const ContactHeader = ({}) => {
  const {contact} = useSelector(state => state.contact);

  return (
    <View style={styles.headerContainerChildren}>
      <AOSImageBubble metaFileId={contact?.picture?.id} />
      <View style={styles.headerInfo}>
        <Text style={styles.textTitle} fontSize={16}>
          {contact.simpleFullName}
        </Text>
        <LabelText
          iconName="building-fill"
          title={contact.mainPartner?.fullName}
        />
        {contact?.jobTitleFunction != null && (
          <LabelText
            iconName="suitcase-lg-fill"
            title={contact?.jobTitleFunction?.name}
          />
        )}
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
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default ContactHeader;
