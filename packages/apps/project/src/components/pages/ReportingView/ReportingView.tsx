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
import {useSelector} from '@axelor/aos-mobile-core';
import {HeaderContainer, Text} from '@axelor/aos-mobile-ui';
import {ProjectHeader} from '../../molecules';
import {previousProjectActivity} from '../../../api/project-api';

const ReportingView = () => {
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

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text>{JSON.stringify(item)}</Text>
    </View>
  );

  const renderSectionHeader = ({section: {title}}) => (
    <View style={styles.header}>
      <Text>{title}</Text>
    </View>
  );

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
    padding: 10,
  },
});

export default ReportingView;
