import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
  getCommonStyles,
  ToggleSwitch,
  AutoCompleteSearch,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchContact} from '../../features/contactSlice';
import {PartnerCard} from '../../components';

const ContactListScreen = ({navigation}) => {
  const {userId} = useSelector(state => state.auth);
  const {loadingContact, moreLoading, isListEnd, contactList} = useSelector(
    state => state.contact,
  );
  const [filteredList, setFilteredList] = useState(contactList);
  const [assigned, setAssigned] = useState(false);
  const [contact, setContact] = useState(null);
  const [filter, setFilter] = useState(null);
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const fetchContactAPI = useCallback(
    page => {
      dispatch(fetchContact({searchValue: filter, page: page}));
    },
    [dispatch, filter],
  );

  const fetchContactFilter = useCallback(
    searchValue => {
      setFilter(searchValue);
      dispatch(fetchContact({searchValue: searchValue, page: 0}));
    },
    [dispatch],
  );

  const filterOnUserAssigned = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (assigned) {
          return list?.filter(item => item?.user?.id === userId);
        } else {
          return list;
        }
      }
    },
    [assigned, userId],
  );

  useEffect(() => {
    setFilteredList(filterOnUserAssigned(contactList));
  }, [filterOnUserAssigned, contactList]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <ToggleSwitch
              styleContainer={[commonStyles.filter, commonStyles.filterSize]}
              styleToogle={styles.toggle}
              leftTitle={I18n.t('Crm_All')}
              rightTitle={I18n.t('Crm_AssignedToMe')}
              onSwitch={() => setAssigned(!assigned)}
            />
            <AutoCompleteSearch
              objectList={contactList}
              value={contact}
              onChangeValue={setContact}
              fetchData={fetchContactFilter}
              placeholder={I18n.t('Crm_Contacts')}
              oneFilter={true}
              selectLastItem={false}
            />
          </View>
        }
      />
      <ScrollList
        loadingList={loadingContact}
        data={filteredList}
        renderItem={({item}) => (
          <PartnerCard
            style={styles.item}
            partnerFullName={item.simpleFullName}
            partnerReference={item.partnerSeq}
            partnerAdress={item.mainAddress?.fullName}
            partnerFixedPhone={item.fixedPhone}
            partnerEmail={
              item['emailAddress.address'] || item.emailAddress?.address
            }
            partnerPicture={item.picture}
            partnerCompany={item.mainPartner?.fullName}
            onPress={() =>
              navigation.navigate('ContactDetailsScreen', {
                idContact: item.id,
                contactMainPartner: item.mainPartner,
              })
            }
          />
        )}
        fetchData={fetchContactAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headerContainer: {
    alignItems: 'center',
  },
  toggleSwitchContainer: {
    width: '90%',
    height: 40,
  },
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
});

export default ContactListScreen;
