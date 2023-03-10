import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {
  DropdownContactView,
  DropdownEmployeeView,
  DropdownEventView,
  DropdownGeneralView,
} from '../../../organisms';
import {searchContactById} from '../../../../features/contactSlice';
import {fetchPartnerEventById} from '../../../../features/eventSlice';

const ClientDropdownCards = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {client} = useSelector(state => state.client);
  const {listContactById} = useSelector(state => state.contact);
  const {listEventPartner} = useSelector(state => state.event);

  useEffect(() => {
    const idList = client.contactPartnerSet?.map(item => item.id);
    dispatch(searchContactById(idList));
  }, [dispatch, client.contactPartnerSet]);

  useEffect(() => {
    dispatch(fetchPartnerEventById(client?.id));
  }, [dispatch, client?.id]);

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        styleTitle={styles.textTitle}
        dropdownItems={[
          {
            title: I18n.t('Crm_Contact'),
            key: 1,
            childrenComp: (
              <DropdownContactView
                address={client.mainAddress?.fullName}
                fixedPhone={client.fixedPhone}
                emailAddress={client.emailAddress?.address}
                webSite={client.webSite}
              />
            ),
          },
          {
            title: I18n.t('Crm_GeneralInformation'),
            key: 2,
            childrenComp: (
              <DropdownGeneralView
                assignedUser={client.user?.fullName}
                category={client.partnerCategory?.name}
                industrySector={client.industrySector?.name}
                priceList={client.salePartnerPriceList?.label}
              />
            ),
          },
          {
            title: I18n.t('Crm_Employees'),
            key: 3,
            childrenComp: (
              <DropdownEmployeeView
                contactList={listContactById}
                navigation={navigation}
              />
            ),
          },
          {
            title: I18n.t('Crm_Events'),
            key: 4,
            childrenComp: (
              <DropdownEventView
                eventList={listEventPartner}
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

export default ClientDropdownCards;
