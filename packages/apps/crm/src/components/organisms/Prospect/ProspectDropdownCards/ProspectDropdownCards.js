import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  DropdownContactView,
  DropdownEmployeeView,
  DropdownEventView,
  DropdownGeneralView,
} from '../../../organisms';
import {searchContactById} from '../../../../features/contactSlice';
import {fetchPartnerEventById} from '../../../../features/eventSlice';

const ProspectDropdownCards = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {prospect} = useSelector(state => state.prospect);
  const {listContactById} = useSelector(state => state.contact);
  const {listEventPartner} = useSelector(state => state.event);

  useEffect(() => {
    const idList = prospect.contactPartnerSet?.map(item => item.id);
    dispatch(searchContactById(idList));
  }, [dispatch, prospect.contactPartnerSet]);

  useEffect(() => {
    dispatch(fetchPartnerEventById(prospect?.id));
  }, [dispatch, prospect?.id]);

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
                address={prospect.mainAddress?.fullName}
                fixedPhone={prospect.fixedPhone}
                emailAddress={prospect.emailAddress?.address}
                webSite={prospect.webSite}
              />
            ),
          },
          {
            title: I18n.t('Crm_GeneralInformation'),
            key: 2,
            childrenComp: (
              <DropdownGeneralView
                assignedUser={prospect.user?.fullName}
                category={prospect.type?.name}
                industrySector={prospect.industrySector?.name}
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
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default ProspectDropdownCards;
