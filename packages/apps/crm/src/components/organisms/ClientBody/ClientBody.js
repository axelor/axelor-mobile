import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  Text,
  DropdownCardSwitch,
  NotesCard,
  LabelText,
} from '@axelor/aos-mobile-ui';
import DropdownContactView from '../DropdownContactView/DropdownContactView';
import DropdownEventView from '../DropdownEventView/DropdownEventView';
import {LiteContactCard} from '../../molecules';
import {getLastEvent, getNextEvent} from '../../../utils/dateEvent';

const ClientBody = ({navigation}) => {
  const I18n = useTranslator();
  const {client} = useSelector(state => state.client);
  const {listContactById} = useSelector(state => state.contact);
  const {listEventPartner} = useSelector(state => state.event);
  const lastEventClient = useMemo(() => {
    return getLastEvent(listEventPartner);
  }, [listEventPartner]);

  const nextEventClient = useMemo(() => {
    return getNextEvent(listEventPartner);
  }, [listEventPartner]);

  return (
    <>
      <NotesCard title={I18n.t('Crm_Notes')} data={client.description} />
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
                <View>
                  {client.user?.fullName && (
                    <LabelText
                      title={I18n.t('Crm_AssignedTo')}
                      iconName={'user-tie'}
                      value={client.user?.fullName}
                    />
                  )}
                  {client.type?.name && (
                    <LabelText
                      title={I18n.t('Crm_Categorie')}
                      value={client.partnerCategory?.name}
                    />
                  )}
                  {client.industrySector?.name && (
                    <LabelText
                      title={I18n.t('Crm_Sector')}
                      value={client.industrySector?.name}
                    />
                  )}
                  {client.salePartnerPriceList?.label && (
                    <LabelText
                      title={I18n.t('Crm_PriceList')}
                      value={client.salePartnerPriceList?.label}
                    />
                  )}
                  {!client.user?.fullName &&
                    !client.type?.name &&
                    !client.industrySector?.name &&
                    !client.salePartnerPriceList?.label && (
                      <View>
                        <Text>{I18n.t('Crm_NoGeneralInformation')}</Text>
                      </View>
                    )}
                </View>
              ),
            },
            {
              title: I18n.t('Crm_Employees'),
              key: 3,
              childrenComp:
                listContactById.length > 0 ? (
                  listContactById.map((contact, index) => {
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
                  })
                ) : (
                  <View>
                    <Text>{I18n.t('Crm_NoContactAssociated')}</Text>
                  </View>
                ),
            },
            {
              title: I18n.t('Crm_Events'),
              key: 4,
              childrenComp: (
                <DropdownEventView
                  lastEvent={lastEventClient}
                  nextEvent={nextEventClient}
                  navigation={navigation}
                />
              ),
            },
          ]}
        />
      </View>
    </>
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

export default ClientBody;
