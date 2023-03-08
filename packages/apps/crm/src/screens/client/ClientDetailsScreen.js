import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Screen, HeaderContainer} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {ClientBody, ClientBottom, ClientHeader} from '../../components';
import {searchContactById} from '../../features/contactSlice';
import {fetchPartnerEventById} from '../../features/eventSlice';
import {getClientbyId} from '../../features/clientSlice';

const ClientDetailsScreen = ({navigation, route}) => {
  const idClient = route.params.idClient;
  const dispatch = useDispatch();
  const {mobileSettings} = useSelector(state => state.config);
  const {client} = useSelector(state => state.client);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.base.db.Partner"
          modelId={idClient}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnCrmApp}
          attachedFileScreenTitle={client?.simpleFullName}
        />
      ),
    });
  }, [mobileSettings, navigation, idClient, client]);

  useEffect(() => {
    dispatch(getClientbyId({clientId: idClient}));
  }, [dispatch, idClient]);

  useEffect(() => {
    const idList = client.contactPartnerSet?.map(item => item.id);
    dispatch(searchContactById(idList));
  }, [dispatch, client.contactPartnerSet]);

  useEffect(() => {
    dispatch(fetchPartnerEventById(idClient));
  }, [dispatch, idClient]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer expandableFilter={false} fixedItems={<ClientHeader />} />
      <ScrollView>
        <ClientBody navigation={navigation} />
      </ScrollView>
      <ClientBottom idClient={idClient} navigation={navigation} />
    </Screen>
  );
};

export default ClientDetailsScreen;
