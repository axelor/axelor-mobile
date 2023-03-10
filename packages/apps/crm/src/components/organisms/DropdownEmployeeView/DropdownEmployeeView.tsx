import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
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
  navigation?: any;
}

const DropdownEmployeeView = ({
  contactList,
  navigation,
}: DropdownEmployeeViewProps) => {
  const I18n = useTranslator();

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
