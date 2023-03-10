import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer, NotesCard} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {LeadHeader, LeadDropdownCards, LeadBottom} from '../../components';
import {fetchLeadById} from '../../features/leadSlice';

const LeadDetailsScreen = ({navigation, route}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const idLead = route.params.idLead;
  const versionLead = route.params.versionLead;
  const colorIndex = route.params.colorIndex;
  const {mobileSettings} = useSelector(state => state.config);
  const {lead} = useSelector(state => state.lead);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.crm.db.Lead"
          modelId={idLead}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={lead?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, lead, idLead]);

  useEffect(() => {
    dispatch(fetchLeadById({leadId: idLead}));
  }, [dispatch, idLead]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <LeadHeader
            colorIndex={colorIndex}
            idLead={idLead}
            versionLead={versionLead}
          />
        }
      />
      <ScrollView>
        <NotesCard title={I18n.t('Crm_Description')} data={lead.description} />
        <LeadDropdownCards navigation={navigation} />
      </ScrollView>
      <LeadBottom idLead={idLead} navigation={navigation} />
    </Screen>
  );
};

export default LeadDetailsScreen;
