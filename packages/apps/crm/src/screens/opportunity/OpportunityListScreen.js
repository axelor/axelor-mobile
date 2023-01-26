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
  ChipSelect,
  Chip,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {OpportunityCard} from '../../components';
import {
  fetchOpportunities,
  fetchOpportunityStatus,
} from '../../features/opportunitySlice';
import {Opportunity} from '../../types';

const OpportunityListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {userId} = useSelector(state => state.auth);
  const {
    loading,
    moreLoading,
    isListEnd,
    opportunityList,
    opportunityStatusList,
  } = useSelector(state => state.opportunity);

  const [filteredList, setFilteredList] = useState(opportunityList);
  const [assigned, setAssigned] = useState(false);
  const [filter, setFilter] = useState(null);
  const [opportunity, setOpportunity] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const fetchOpportunityAPI = useCallback(
    page => {
      dispatch(fetchOpportunities({searchValue: filter, page: page}));
    },
    [dispatch, filter],
  );

  const fetchOpportunityFilter = useCallback(
    searchValue => {
      setFilter(searchValue);
      dispatch(fetchOpportunities({searchValue: searchValue, page: 0}));
    },
    [dispatch],
  );

  const updateStatus = status => {
    if (isSelected(status)) {
      setSelectedStatus(
        selectedStatus?.filter(activeStatus => activeStatus.id !== status.id),
      );
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const isSelected = status => {
    return (
      selectedStatus?.find(activeStatus => activeStatus.id === status.id) !=
      null
    );
  };

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

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (selectedStatus.length > 0) {
          return list?.filter(item =>
            selectedStatus.find(
              status => item?.opportunityStatus?.id === status.id,
            ),
          );
        } else {
          return list;
        }
      }
    },
    [selectedStatus],
  );

  useEffect(() => {
    setFilteredList(filterOnUserAssigned(filterOnStatus(opportunityList)));
  }, [filterOnUserAssigned, filterOnStatus, opportunityList]);

  useEffect(() => {
    dispatch(fetchOpportunityStatus());
  }, [dispatch]);

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
              objectList={opportunityList}
              value={opportunity}
              onChangeValue={setOpportunity}
              fetchData={fetchOpportunityFilter}
              placeholder={I18n.t('Crm_Opportunity')}
              oneFilter={true}
              selectLastItem={false}
            />
          </View>
        }
        chipComponent={
          <ChipSelect scrollable={true}>
            {opportunityStatusList?.map?.((status, index) => {
              return (
                <Chip
                  key={index}
                  selected={isSelected(status)}
                  title={status.name}
                  onPress={() => updateStatus(status)}
                  selectedColor={Opportunity.getStatusColor(index, Colors)}
                  marginHorizontal={5}
                />
              );
            })}
          </ChipSelect>
        }
      />
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <OpportunityCard
            amount={item.amount}
            expectedCloseDate={item.expectedCloseDate}
            name={item.name}
            opportunityScoring={item.opportunityRating}
            reference={item.opportunitySeq}
            allOpportunityStatus={opportunityStatusList}
            currencySymbol={item.currencySymbol}
            opportunityStatus={item.opportunityStatus}
            onPress={() =>
              navigation.navigate('OpportunityDetailsScreen', {
                opportunityId: item.id,
              })
            }
            style={styles.item}
          />
        )}
        fetchData={fetchOpportunityAPI}
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
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
});

export default OpportunityListScreen;
