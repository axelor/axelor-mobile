import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Screen, HeaderContainer, CircleButton} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  HeaderOptionsMenu,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {ProspectBody, ProspectHeader} from '../../components';
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
      <View style={styles.bottomContainer}>
        <CircleButton
          iconName="pen"
          onPress={() =>
            navigation.navigate('ProspectFormScreen', {
              idProspect: idProspect,
            })
          }
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainerChildren: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center',
  },
  headerInfo: {
    flexDirection: 'column',
    marginLeft: '7%',
  },
  headerBadge: {
    flexDirection: 'column',
  },
  container: {
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
  },
  leadScoring: {
    marginTop: '10%',
  },
  bottomContainer: {
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
    marginBottom: 25,
  },
});

export default ProspectDetailsScreen;
