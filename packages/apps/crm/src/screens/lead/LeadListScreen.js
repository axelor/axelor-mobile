import React, {useCallback, useState, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  ToggleSwitch,
  ScrollList,
  ChipSelect,
  Chip,
  useThemeColor,
  getCommonStyles,
  AutoCompleteSearch,
} from '@aos-mobile/ui';
import {useDispatch, useSelector, useTranslator} from '@aos-mobile/core';
import {fetchLeads, fetchLeadStatus} from '../../features/leadSlice';
import {LeadsCard} from '../../components';
import Lead from '../../types/lead';

const LeadListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {loadingLead, moreLoading, isListEnd, leadList, leadStatusList} =
    useSelector(state => state.lead);
  const {userId} = useSelector(state => state.auth);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [filteredList, setFilteredList] = useState(leadList);
  const [assigned, setAssigned] = useState(false);
  const [lead, setLead] = useState(null);
  const [filter, setFilter] = useState(null);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const fetchLeadsAPI = useCallback(
    page => {
      dispatch(fetchLeads({searchValue: filter, page: page}));
    },
    [dispatch, filter],
  );

  const fetchLeadFilter = useCallback(
    searchValue => {
      setFilter(searchValue);
      dispatch(fetchLeads({searchValue: searchValue, page: 0}));
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
            selectedStatus.find(status => item?.leadStatus?.id === status.id),
          );
        } else {
          return list;
        }
      }
    },
    [selectedStatus],
  );

  useEffect(() => {
    dispatch(fetchLeadStatus());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(filterOnUserAssigned(filterOnStatus(leadList)));
  }, [leadList, filterOnUserAssigned, filterOnStatus]);

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
              objectList={leadList}
              value={lead}
              onChangeValue={setLead}
              fetchData={fetchLeadFilter}
              placeholder={I18n.t('Crm_Leads')}
              oneFilter={true}
              selectLastItem={false}
            />
          </View>
        }
        chipComponent={
          <ChipSelect scrollable={true}>
            {leadStatusList.map((status, index) => {
              return (
                <Chip
                  key={index}
                  selected={isSelected(status)}
                  title={status.name}
                  onPress={() => updateStatus(status)}
                  selectedColor={Lead.getStatusColor(index, Colors)}
                />
              );
            })}
          </ChipSelect>
        }
      />
      <ScrollList
        loadingList={loadingLead}
        data={filteredList}
        renderItem={({item}) => (
          <LeadsCard
            style={styles.item}
            leadsFullname={item.simpleFullName}
            leadsCompany={item.enterpriseName}
            leadsAddress={item.primaryAddress}
            leadsFixedPhone={item.fixedPhone}
            leadsPhoneNumber={item.mobilePhone}
            leadsEmail={item['emailAddress.address']}
            leadScoring={item.leadScoring}
            leadVersion={item.version}
            leadsId={item.id}
            leadsStatus={item.leadStatus}
            allLeadStatus={leadStatusList}
            onPress={() =>
              navigation.navigate('LeadDetailsScreen', {
                lead: item,
                colorIndex: leadStatusList?.findIndex(
                  status => status.id === item.leadStatus.id,
                ),
              })
            }
          />
        )}
        fetchData={fetchLeadsAPI}
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
  headerContainer: {alignItems: 'center'},
  toggleSwitchContainer: {width: '90%', height: 40},
  toggle: {width: '54%', height: 38, borderRadius: 13},
});

export default LeadListScreen;
