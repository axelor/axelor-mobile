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
  ClientBottom,
  ClientDropdownCards,
  ClientHeader,
} from '../../components';
import {getClientbyId} from '../../features/clientSlice';

const ClientDetailsScreen = ({navigation, route}) => {
  const idClient = route.params.idClient;
  const I18n = useTranslator();
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

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer expandableFilter={false} fixedItems={<ClientHeader />} />
      <ScrollView>
        <NotesCard title={I18n.t('Crm_Notes')} data={client.description} />
        <ClientDropdownCards navigation={navigation} />
      </ScrollView>
      <ClientBottom idClient={idClient} navigation={navigation} />
    </Screen>
  );
};

export default ClientDetailsScreen;
