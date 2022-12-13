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
} from '@aos-mobile/ui';
import {
  useTranslator,
  useSelector,
  useDispatch,
  ScannerAutocompleteSearch,
} from '@aos-mobile/core';
import {fetchCrmLeads, fetchCrmLeadStatus} from '../../features/crmLeadSlice';
import {CrmLeadsCard} from '../../components';
import Lead from '../../types/lead';

const LeadListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const {
    loadingCrmLead,
    moreLoading,
    isListEnd,
    crmLeadList,
    crmLeadStatusList,
  } = useSelector(state => state.crmLead);
  const {userId} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const Colors = useThemeColor();
  const [assigned, setAssigned] = useState(false);
  const [product, setProduct] = useState(null);
  const [filteredList, setFilteredList] = useState(crmLeadList);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const fetchCrmLeadsAPI = useCallback(
    page => {
      dispatch(fetchCrmLeads({page: page}));
    },
    [dispatch],
  );
  const fetchCrmLeadFilter = useCallback(
    filter => {
      dispatch(fetchCrmLeads({searchValue: filter}));
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
    dispatch(fetchCrmLeadStatus());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(filterOnUserAssigned(filterOnStatus(crmLeadList)));
  }, [crmLeadList, filterOnUserAssigned, filterOnStatus]);

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
            <ScannerAutocompleteSearch
              objectList={crmLeadList}
              value={product}
              onChangeValue={item => setProduct(item)}
              fetchData={fetchCrmLeadFilter}
              placeholder={I18n.t('Crm_CrmLeads')}
              oneFilter={true}
              selectLastItem={false}
            />
          </View>
        }
        chipComponent={
          <ChipSelect scrollable={true}>
            {crmLeadStatusList.map((status, index) => {
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
      {crmLeadList != null && crmLeadList.length > 0 ? (
        <ScrollList
          loadingList={loadingCrmLead}
          data={filteredList}
          renderItem={({item}) => (
            <CrmLeadsCard
              style={styles.item}
              leadsFullname={item.simpleFullName}
              leadsCompany={item.enterpriseName}
              leadsAddress={
                item.primaryAddress !== null ? item.primaryAddress : null
              }
              leadsFixedPhone={
                item.fixedPhone !== null ? item.fixedPhone : null
              }
              leadsPhoneNumber={
                item.mobilePhone !== null ? item.mobilePhone : null
              }
              leadsEmail={item.emailAddress.name}
              leadScoring={item.leadScoring}
              leadVersion={item.version}
              leadsId={item.id}
              leadsStatus={item.leadStatus}
              allLeadStatus={crmLeadStatusList}
              onPress={() => {}}
            />
          )}
          fetchData={fetchCrmLeadsAPI}
          moreLoading={moreLoading}
          isListEnd={isListEnd}
        />
      ) : null}
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
