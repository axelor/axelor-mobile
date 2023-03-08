import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  DropdownCardSwitch,
  NotesCard,
  LabelText,
} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {DropdownContactView, DropdownEventView} from '../../organisms';
import {LiteContactCard} from '../../molecules';
import {getLastEvent, getNextEvent} from '../../../utils/dateEvent';

const ProspectBody = ({navigation}) => {
  const {prospect} = useSelector(state => state.prospect);
  const {listContactById} = useSelector(state => state.contact);
  const {listEventPartner} = useSelector(state => state.event);
  const I18n = useTranslator();

  const lastEventProspect = useMemo(() => {
    return getLastEvent(listEventPartner);
  }, [listEventPartner]);

  const nextEventProspect = useMemo(() => {
    return getNextEvent(listEventPartner);
  }, [listEventPartner]);

  return (
    <>
      <NotesCard title={I18n.t('Crm_Notes')} data={prospect.description} />
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
                <View>
                  {prospect.user?.fullName && (
                    <LabelText
                      title={I18n.t('Crm_AssignedTo')}
                      iconName={'user-tie'}
                      value={prospect.user?.fullName}
                    />
                  )}
                  {prospect.type?.name && (
                    <LabelText
                      title={I18n.t('Crm_Categorie')}
                      value={prospect.partnerCategory?.name}
                    />
                  )}
                  {prospect.industrySector?.name && (
                    <LabelText
                      title={I18n.t('Crm_Sector')}
                      value={prospect.industrySector?.name}
                    />
                  )}
                  {!prospect.user?.fullName &&
                    !prospect.type?.name &&
                    !prospect.industrySector?.name && (
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
                  listContactById.map((contact, index) => (
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
                  ))
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
                  lastEvent={lastEventProspect}
                  nextEvent={nextEventProspect}
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

export default ProspectBody;
