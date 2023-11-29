/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  ChipSelect,
  getCommonStyles,
  HeaderContainer,
  NumberBubble,
  Picker,
  Screen,
  ScrollList,
  ToggleSwitch,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  TimesheetDetailCard,
  TimesheetWaitingValidationSearchBar,
} from '../../components';
import {
  fetchTimesheet,
  fetchTimesheetToValidate,
} from '../../features/timesheetSlice';
import {Timesheet} from '../../types';

const TimesheetListScreen = ({}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const [mode, setMode] = useState(Timesheet.mode.personnal);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const {
    myTimesheetList,
    loadingMyTimesheet,
    moreLoadingMyTimesheet,
    isListEndMyTimesheet,
    timesheetToValidateList,
    loadingTimesheetToValidate,
    moreLoadingTimesheetToValidate,
    isListEndTimesheetToValidate,
    totalNumberTimesheetToValidate,
  } = useSelector(state => state.timesheet);
  const {timesheet: timesheetConfig} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);

  const timesheetStatusListItems = useMemo(() => {
    return Timesheet.getStatusList(
      timesheetConfig.needValidation,
      Colors,
      I18n,
    );
  }, [Colors, I18n, timesheetConfig.needValidation]);

  useEffect(() => {
    dispatch(fetchTimesheetToValidate({page: 0, user: user}));
  }, [dispatch, user]);

  const fetchTimesheetAPI = useCallback(
    (page = 0) => {
      dispatch(fetchTimesheet({userId: user?.id, page: page}));
    },
    [dispatch, user],
  );

  const fetchTimesheetToValidateAPI = useCallback(
    (page = 0) => {
      dispatch(fetchTimesheetToValidate({page: page, user: user}));
    },
    [dispatch, user],
  );

  const listToDisplay = useMemo(() => {
    if (mode === Timesheet.mode.personnal) {
      return {
        list: myTimesheetList,
        loading: loadingMyTimesheet,
        moreLoading: moreLoadingMyTimesheet,
        isListEnd: isListEndMyTimesheet,
        functionApi: fetchTimesheetAPI,
      };
    } else {
      return {
        list: timesheetToValidateList,
        loading: loadingTimesheetToValidate,
        moreLoading: moreLoadingTimesheetToValidate,
        isListEnd: isListEndTimesheetToValidate,
        functionApi: fetchTimesheetToValidateAPI,
      };
    }
  }, [
    mode,
    moreLoadingMyTimesheet,
    moreLoadingTimesheetToValidate,
    myTimesheetList,
    fetchTimesheetAPI,
    fetchTimesheetToValidateAPI,
    isListEndMyTimesheet,
    isListEndTimesheetToValidate,
    loadingMyTimesheet,
    loadingTimesheetToValidate,
    timesheetToValidateList,
  ]);

  const filterOnStatus = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else {
        if (selectedStatus != null) {
          if (
            !timesheetConfig.needValidation &&
            selectedStatus !== Timesheet.statusSelect.Validate
          ) {
            return list?.filter(
              item => item?.statusSelect !== Timesheet.statusSelect.Validate,
            );
          } else {
            return list?.filter(item => item?.statusSelect === selectedStatus);
          }
        } else {
          return list;
        }
      }
    },
    [selectedStatus, timesheetConfig.needValidation],
  );

  const filteredList = useMemo(
    () => filterOnStatus(listToDisplay.list),
    [filterOnStatus, listToDisplay.list],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <ToggleSwitch
              styleContainer={[commonStyles.filter, commonStyles.filterSize]}
              styleToogle={styles.toggle}
              leftTitle={I18n.t('Hr_MyTimesheets')}
              rightTitle={I18n.t('Hr_ToValidate')}
              rigthElement={
                <NumberBubble
                  style={styles.indicator}
                  number={totalNumberTimesheetToValidate}
                  color={Colors.cautionColor}
                  isNeutralBackground={true}
                />
              }
              onSwitch={() =>
                setMode(_mode => {
                  setSelectedStatus(null);
                  return _mode === Timesheet.mode.personnal
                    ? Timesheet.mode.validation
                    : Timesheet.mode.personnal;
                })
              }
            />
            {mode === Timesheet.mode.personnal &&
              (timesheetConfig.needValidation ? (
                <Picker
                  listItems={timesheetStatusListItems}
                  title={I18n.t('Hr_Status')}
                  onValueChange={setSelectedStatus}
                  labelField="title"
                  valueField="key"
                />
              ) : (
                <ChipSelect
                  mode="switch"
                  onChangeValue={chiplist =>
                    setSelectedStatus(chiplist[0]?.key)
                  }
                  selectionItems={timesheetStatusListItems}
                />
              ))}
            {mode !== Timesheet.mode.personnal && (
              <TimesheetWaitingValidationSearchBar />
            )}
          </View>
        }
      />
      <ScrollList
        loadingList={listToDisplay.loading}
        data={filteredList}
        renderItem={({item}) => (
          <TimesheetDetailCard
            statusSelect={item.statusSelect}
            startDate={item.fromDate}
            endDate={item.toDate}
            company={item.company.name}
            totalDuration={item.periodTotal}
            employeeName={
              mode === Timesheet.mode.validation ? item.employee?.name : null
            }
            onPress={() => console.log('Card pressed.')}
          />
        )}
        fetchData={listToDisplay.functionApi}
        moreLoading={listToDisplay.moreLoading}
        isListEnd={listToDisplay.isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
  indicator: {
    position: 'absolute',
    right: '5%',
  },
});

export default TimesheetListScreen;
