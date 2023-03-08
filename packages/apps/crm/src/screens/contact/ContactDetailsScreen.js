import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Screen, HeaderContainer, CircleButton} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {ContactBody, ContactHeader} from '../../components';
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
      <View style={styles.bottomContainer}>
        <CircleButton
          iconName="pen"
          onPress={() =>
            navigation.navigate('ContactFormScreen', {
              idContact: idContact,
            })
          }
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 20,
    marginVertical: 7,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainerChildren: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center',
  },
  headerInfo: {
    flexDirection: 'column',
    marginLeft: '7%',
  },
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
  bottomContainer: {
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
    marginBottom: 25,
  },
});

export default ContactDetailsScreen;
