import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector, useDispatch} from '@axelor/aos-mobile-core';
import {
  DropdownContactView,
  DropdownEventView,
  DropdownGeneralView,
} from '../../../organisms';
import {searchEventById} from '../../../../features/eventSlice';

const LeadDropdownCards = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {lead} = useSelector(state => state.lead);
  const {listEventById} = useSelector(state => state.event);

  useEffect(() => {
    const idList = lead.eventList?.map(item => item.id);
    dispatch(searchEventById(idList));
  }, [dispatch, lead.eventList]);

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
                address={lead.primaryAddress}
                fixedPhone={lead.fixedPhone}
                mobilePhone={lead.mobilePhone}
                emailAddress={lead.emailAddress?.address}
                webSite={lead.webSite}
              />
            ),
          },
          {
            title: I18n.t('Crm_GeneralInformation'),
            key: 2,
            childrenComp: (
              <DropdownGeneralView
                assignedUser={lead.user?.fullName}
                category={lead.type?.name}
                industrySector={lead.industrySector?.name}
              />
            ),
          },
          {
            title: I18n.t('Crm_Events'),
            key: 3,
            childrenComp: (
              <DropdownEventView
                eventList={listEventById}
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

export default LeadDropdownCards;
