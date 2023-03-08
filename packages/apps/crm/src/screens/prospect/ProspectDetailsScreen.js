import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {ProspectBody, ProspectBottom, ProspectHeader} from '../../components';
import {searchContactById} from '../../features/contactSlice';
import {fetchPartnerEventById} from '../../features/eventSlice';
import {fetchProspectById} from '../../features/prospectSlice';

const ProspectDetailsScreen = ({navigation, route}) => {
  const idProspect = route.params.idProspect;
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

  useEffect(() => {
    const idList = prospect.contactPartnerSet?.map(item => item.id);
    dispatch(searchContactById(idList));
  }, [dispatch, prospect.contactPartnerSet]);

  useEffect(() => {
    dispatch(fetchPartnerEventById(idProspect));
  }, [dispatch, idProspect]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProspectHeader />}
      />
      <ScrollView>
        <ProspectBody navigation={navigation} />
      </ScrollView>
      <ProspectBottom idProspect={idProspect} navigation={navigation} />
    </Screen>
  );
};

export default ProspectDetailsScreen;
