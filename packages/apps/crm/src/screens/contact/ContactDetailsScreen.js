import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {ContactBody, ContactBottom, ContactHeader} from '../../components';
import {fetchContactEventById} from '../../features/eventSlice';
import {fetchPartner} from '../../features/partnerSlice';
import {getContact} from '../../features/contactSlice';

const ContactDetailsScreen = ({navigation, route}) => {
  const idContact = route.params.idContact;
  const dispatch = useDispatch();
  const {mobileSettings} = useSelector(state => state.config);
  const {contact} = useSelector(state => state.contact);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.base.db.Partner"
          modelId={contact?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={contact?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, contact]);

  useEffect(() => {
    dispatch(getContact({contactId: idContact}));
  }, [dispatch, idContact]);

  useEffect(() => {
    dispatch(fetchContactEventById(idContact));
  }, [dispatch, idContact]);

  useEffect(() => {
    contact?.mainPartner &&
      dispatch(fetchPartner({partnerId: contact?.mainPartner?.id}));
  }, [dispatch, contact?.mainPartner?.id, contact?.mainPartner]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ContactHeader />}
      />
      <ScrollView>
        <ContactBody navigation={navigation} />
      </ScrollView>
      <ContactBottom idContact={idContact} navigation={navigation} />
    </Screen>
  );
};

export default ContactDetailsScreen;
