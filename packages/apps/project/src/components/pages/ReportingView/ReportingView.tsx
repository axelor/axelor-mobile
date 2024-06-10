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
import {SectionList, StyleSheet, View} from 'react-native';
import {DateDisplay, useSelector} from '@axelor/aos-mobile-core';
import {
  Badge,
  HeaderContainer,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {ProjectHeader} from '../../molecules';
import {previousProjectActivity} from '../../../api/project-api';

const ReportingView = () => {
  const Colors = useThemeColor();

  const {project} = useSelector((state: any) => state.project_project);

  const [dataList, setDataList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const dateLimit = useMemo(() => {
    const limitDate = new Date();
    limitDate.setFullYear(limitDate.getFullYear() - 1); //this is for test, need to change with project?createdOn.
    return limitDate;
  }, []);

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
          startDate: formatDate(_startDate),
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

  const formatDate = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const convertToDate = dateStr => {
    const [month, day, year] = dateStr.split('/').map(Number);

    return new Date(year, month - 1, day);
  };

  const calculateTimeDifference = time => {
    const date = new Date(time);
    const now = new Date();

    if (isNaN(date.getTime())) {
      return;
    }

    const dateInMs = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const nowInMs = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    const differenceInMilliseconds = nowInMs - dateInMs;
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24),
    );

    if (differenceInDays > 0) {
      return `modifié il y a ${differenceInDays} jour${
        differenceInDays > 1 ? 's' : ''
      }`;
    } else {
      const differenceInHours = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60),
      );
      if (differenceInHours > 0) {
        return `modifié il y a ${differenceInHours} heure${
          differenceInHours > 1 ? 's' : ''
        }`;
      } else {
        const differenceInMinutes = Math.floor(
          differenceInMilliseconds / (1000 * 60),
        );
        return `modifié il y a ${differenceInMinutes} minute${
          differenceInMinutes > 1 ? 's' : ''
        }`;
      }
    }
  };

  const renderItem = ({item}) => {
    const key = Object.keys(item)?.[0];

    const activity = item?.[key]?.[0].activity || {};

    const modelName = item?.[key]?.[0]?.modelName;

    const tracks = activity?.tracks || [];

    const time = item?.[key]?.[0].time || '';

    const user = item?.[key]?.[0].user || '';

    const utilityClass = item?.[key]?.[0].utilityClass;

    console.log('modelName', modelName);

    return (
      <View style={styles.item}>
        <Text>{Object.keys(item)?.[0]}</Text>
        <Badge
          title={modelName}
          color={
            utilityClass === 'danger'
              ? Colors.cautionColor
              : utilityClass === 'success'
              ? Colors.successColor
              : Colors.primaryColor
          }
        />
        {tracks.map((track, index) => (
          <View key={index} style={styles.trackItem}>
            <Text writingType="important">{track.title}:</Text>
            <Text>{track.value}</Text>
          </View>
        ))}
        <Text>{user}</Text>
        <Text>{calculateTimeDifference(time)}</Text>
      </View>
    );
  };

  const renderSectionHeader = ({section: {title}}) => {
    const dateToDisplay = convertToDate(title).toString();
    return (
      <View style={styles.header}>
        <DateDisplay date={dateToDisplay} displayYear={true} />
      </View>
    );
  };

  return (
    <View>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProjectHeader />}
      />
      <SectionList
        sections={dataList}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        onEndReached={handlePreviousActivity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignContent: 'center',
    padding: 10,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  trackTitle: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default ReportingView;
