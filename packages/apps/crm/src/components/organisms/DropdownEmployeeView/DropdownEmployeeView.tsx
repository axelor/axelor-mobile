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
import {useNavigation, useTranslator} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import {LiteContactCard} from '../../molecules';

type Contact = {
  id: number;
  simpleFullName: string;
  fixedPhone: string;
  'emailAddress.address': string;
};

interface DropdownEmployeeViewProps {
  contactList?: Contact[];
}

const DropdownEmployeeView = ({contactList}: DropdownEmployeeViewProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  if (!Array.isArray(contactList) || contactList.length === 0) {
    return (
      <View>
        <Text>{I18n.t('Crm_NoContactAssociated')}</Text>
      </View>
    );
  }

  return contactList.map((contact, index) => {
    return (
      <LiteContactCard
        key={index}
        contactFullname={contact.simpleFullName}
        fixedPhoneNumber={contact.fixedPhone}
        email={contact['emailAddress.address']}
        style={styles.item}
        onPress={() =>
          navigation.navigate('ContactDetailsScreen', {
            idContact: contact.id,
          })
        }
      />
    );
  });
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default DropdownEmployeeView;
