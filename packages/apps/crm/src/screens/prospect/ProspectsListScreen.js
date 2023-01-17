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
import {PartnerCard} from '../../components';
import {fetchProspects} from '../../features/prospectSlice';

const ProspectsListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.auth);
  const {loading, moreLoading, isListEnd, prospectList} = useSelector(
    state => state.prospect,
  );
  const [filteredList, setFilteredList] = useState(prospectList);
  const [assigned, setAssigned] = useState(false);
  const [prospect, setProspect] = useState(null);
  const [filter, setFilter] = useState(null);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const fetchProspectAPI = useCallback(
    page => {
      dispatch(fetchProspects({searchValue: filter, page: page}));
    },
    [dispatch, filter],
  );

  const fetchProspectFilter = useCallback(
    searchValue => {
      setFilter(searchValue);
      dispatch(fetchProspects({searchValue: searchValue, page: 0}));
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
    setFilteredList(filterOnUserAssigned(prospectList));
  }, [filterOnUserAssigned, prospectList]);

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
              objectList={prospectList}
              value={prospect}
              onChangeValue={setProspect}
              fetchData={fetchProspectFilter}
              placeholder={I18n.t('Crm_Prospects')}
              oneFilter={true}
              selectLastItem={false}
            />
          </View>
        }
      />
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <PartnerCard
            style={styles.item}
            partnerFullName={item.simpleFullName}
            partnerReference={item.partnerSeq}
            partnerScoring={item.leadScoringSelect || 0}
            partnerAdress={item.mainAddress?.fullName}
            partnerFixedPhone={item.fixedPhone}
            partnerEmail={item.emailAddress?.address}
            partnerPicture={item.picture}
            onPress={() =>
              navigation.navigate('ProspectDetailsScreen', {
                idProspect: item.id,
              })
            }
          />
        )}
        fetchData={fetchProspectAPI}
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

export default ProspectsListScreen;
