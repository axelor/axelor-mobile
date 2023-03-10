import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  DropdownContactView,
  DropdownEventView,
  DropdownGeneralView,
} from '../../../organisms';
import {fetchContactEventById} from '../../../../features/eventSlice';

const ContactDropdownCards = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {contact} = useSelector(state => state.contact);
  const {listEventContact} = useSelector(state => state.event);

  useEffect(() => {
    dispatch(fetchContactEventById(contact?.id));
  }, [dispatch, contact?.id]);

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        styleTitle={styles.textTitle}
        dropdownItems={[
          {
            title: I18n.t('Crm_Contact'),
            key: 0,
            childrenComp: (
              <DropdownContactView
                address={contact.mainAddress?.fullName}
                fixedPhone={contact.fixedPhone}
                mobilePhone={contact.mobilePhone}
                emailAddress={contact.emailAddress?.address}
                webSite={contact.webSite}
              />
            ),
          },
          {
            title: I18n.t('Crm_GeneralInformation'),
            key: 10,
            childrenComp: (
              <DropdownGeneralView
                assignedUser={contact.user?.fullName}
                language={contact.language?.name}
              />
            ),
          },
          {
            title: I18n.t('Crm_Events'),
            key: 20,
            childrenComp: (
              <DropdownEventView
                eventList={listEventContact}
                navigation={navigation}
              />
            ),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default ContactDropdownCards;
