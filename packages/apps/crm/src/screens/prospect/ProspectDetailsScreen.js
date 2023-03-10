import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer, NotesCard} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  ProspectBottom,
  ProspectDropdownCards,
  ProspectHeader,
} from '../../components';
import {fetchProspectById} from '../../features/prospectSlice';

const ProspectDetailsScreen = ({navigation, route}) => {
  const idProspect = route.params.idProspect;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.config);
  const {prospect} = useSelector(state => state.prospect);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.base.db.Partner"
          modelId={idProspect}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={prospect?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, idProspect, prospect]);

  useEffect(() => {
    dispatch(fetchProspectById({partnerId: idProspect}));
  }, [dispatch, idProspect]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProspectHeader />}
      />
      <ScrollView>
        <NotesCard title={I18n.t('Crm_Notes')} data={prospect.description} />
        <ProspectDropdownCards navigation={navigation} />
      </ScrollView>
      <ProspectBottom idProspect={idProspect} navigation={navigation} />
    </Screen>
  );
};

export default ProspectDetailsScreen;
