import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  LabelText,
  DropdownCardSwitch,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {DropdownContactView, DropdownEventView} from '../../organisms';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
import {getLastEvent, getNextEvent} from '../../../utils/dateEvent';

const LeadBody = ({navigation}) => {
  const I18n = useTranslator();
  const {lead} = useSelector(state => state.lead);
  const {listEventById} = useSelector(state => state.event);

  const lastEventLead = useMemo(() => {
    return getLastEvent(listEventById);
  }, [listEventById]);

  const nextEventLead = useMemo(() => {
    return getNextEvent(listEventById);
  }, [listEventById]);

  return (
    <>
      <NotesCard title={I18n.t('Crm_Description')} data={lead.description} />
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
                <View>
                  {lead.user?.fullName && (
                    <LabelText
                      title={I18n.t('Crm_AssignedTo')}
                      iconName={'user-tie'}
                      value={lead.user?.fullName}
                    />
                  )}
                  {lead.type?.name && (
                    <LabelText
                      title={I18n.t('Crm_Categorie')}
                      value={lead.type?.name}
                    />
                  )}
                  {lead.industrySector?.name && (
                    <LabelText
                      title={I18n.t('Crm_Sector')}
                      value={lead.industrySector?.name}
                    />
                  )}
                  {!lead.user?.fullName &&
                    !lead.type?.name &&
                    !lead.industrySector?.name && (
                      <View>
                        <Text>{I18n.t('Crm_NoGeneralInformation')}</Text>
                      </View>
                    )}
                </View>
              ),
            },
            {
              title: I18n.t('Crm_Events'),
              key: 3,
              childrenComp: (
                <DropdownEventView
                  lastEvent={lastEventLead}
                  nextEvent={nextEventLead}
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
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default LeadBody;
