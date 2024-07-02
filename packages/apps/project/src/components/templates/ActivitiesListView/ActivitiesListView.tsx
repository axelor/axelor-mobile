/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {
  SectionList,
  StyleSheet,
  View,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  DateDisplay,
  MailMessageNotificationCard,
  formatTime,
  useSelector,
  useTranslator,
  formatDate,
} from '@axelor/aos-mobile-core';
import {Badge, Image, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {previousProjectActivity} from '../../../api/project-api';

const STATES = {
  Danger: 'danger',
  Success: 'success',
};

const ActivitiesListView = () => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {project} = useSelector((state: any) => state.project_project);
  const {baseUrl} = useSelector((state: any) => state.auth);

  const [dataList, setDataList] = useState([]);
  const [startDate, setStartDate] = useState(() => {
    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() + 1);
    return initialDate;
  });
  const [refreshing, setRefreshing] = useState(false);

  const dateLimit = useMemo(() => {
    const limitDate = new Date();
    limitDate.setFullYear(project.createdOn);
    return limitDate;
  }, [project.createdOn]);

  const handlePreviousActivity = useCallback(() => {
    setStartDate(prevStartDate => {
      const newStartDate = new Date(prevStartDate);
      newStartDate.setMonth(newStartDate.getMonth() - 1);
      return newStartDate;
    });
  }, []);

  const fetchActivityData = useCallback(
    async _startDate => {
      try {
        const res = await previousProjectActivity({
          projectId: project?.id,
          startDate: formatDate(_startDate, 'MM/DD/YYYY'),
        });

        const activityList = res.data.data[0]?.values?.$activityList?.[0] || {};
        const formattedData = Object.keys(activityList).map(date => ({
          title: date,
          data: activityList[date],
        }));

        if (formattedData.length === 0 && _startDate >= dateLimit) {
          handlePreviousActivity();
        } else {
          setDataList(prevData => [...prevData, ...formattedData]);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [project?.id, dateLimit, handlePreviousActivity],
  );

  useEffect(() => {
    if (project?.id) {
      fetchActivityData(startDate);
    }
  }, [fetchActivityData, startDate, project?.id]);

  const convertToDate = dateStr => {
    const [month, day, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setStartDate(() => {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
    setDataList([]);
    fetchActivityData(new Date()).finally(() => setRefreshing(false));
  }, [fetchActivityData]);

  const renderItem = ({item}) => {
    const updates = item[Object.keys(item)[0]];

    return updates.map(update => {
      const {
        activity = {},
        modelName,
        time,
        user,
        utilityClass,
        title,
        userId,
      } = update;
      const tracks = activity?.tracks || [];

      return (
        <View style={styles.item} key={time}>
          <View style={styles.avatarContainer}>
            <Image
              generalStyle={styles.avatar}
              defaultIconSize={25}
              resizeMode="contain"
              source={{
                uri:
                  baseUrl +
                  `ws/rest/com.axelor.auth.db.User/${userId}/image/download?image=true`,
              }}
            />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.updatedText}>{`${I18n.t(
              'Project_UpdatedBy',
            )} ${user} ${formatTime(time, I18n.t('Base_TimeFormat'))}`}</Text>
            <MailMessageNotificationCard
              title={title}
              tracks={tracks}
              customTopComponent={
                <View style={styles.headerMailMessage}>
                  <Badge
                    title={modelName}
                    color={
                      utilityClass === STATES.Danger
                        ? Colors.errorColor
                        : utilityClass === STATES.Success
                        ? Colors.successColor
                        : Colors.primaryColor
                    }
                  />
                </View>
              }
            />
          </View>
        </View>
      );
    });
  };

  const renderSectionHeader = ({section: {title}}) => {
    const dateToDisplay = convertToDate(title);
    const isValidDate = !isNaN(dateToDisplay.getTime());
    const displayDate = isValidDate ? dateToDisplay : new Date();

    return (
      <View style={styles.header}>
        <DateDisplay date={displayDate.toString()} displayYear={true} />
      </View>
    );
  };

  return (
    <SectionList
      sections={dataList}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => renderItem({item})}
      renderSectionHeader={renderSectionHeader}
      onEndReached={handlePreviousActivity}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  item: {
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  updatedText: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
  },
  header: {
    padding: 10,
  },
  headerMailMessage: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  avatar: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Dimensions.get('window').width * 0.12,
    width: Dimensions.get('window').width * 0.12,
    height: Dimensions.get('window').width * 0.12,
  },
  cardContainer: {
    width: Dimensions.get('window').width * 0.83,
    overflow: 'hidden',
  },
});

export default ActivitiesListView;
