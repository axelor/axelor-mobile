/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SectionList, StyleSheet, View, RefreshControl} from 'react-native';
import {DateDisplay, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Label, Text} from '@axelor/aos-mobile-ui';
import {
  initProjectActivity,
  previousProjectActivity,
} from '../../../api/project-api';
import {ActivityCard} from '../../molecules';

const PERIOD_IN_DAYS = 30;
const MAX_EMPTY_PERIODS = 12;

const substractDays = (date: Date, days: number): Date => {
  const _date = new Date(date);
  _date.setDate(_date.getDate() - days);
  return _date;
};

const getSectionDate = (titleMapList: any[]): string | undefined => {
  for (const _titleMap of titleMapList ?? []) {
    const _activities: any[] = _titleMap?.[Object.keys(_titleMap)[0]] ?? [];
    const _time = _activities.find(_activity => _activity?.time != null)?.time;

    if (_time != null && !isNaN(new Date(_time).getTime())) return _time;
  }

  return undefined;
};

const parseResponse = (res: any) => {
  const values = res?.data?.data?.[0]?.values;
  const activityList: any = values?.$activityList?.[0] ?? {};

  return {
    startDate: values?.$startDate,
    sections: (Object.entries(activityList) as any[])
      .filter(([, _content]) => Array.isArray(_content))
      .map(([_title, _content]: [string, any[]]) => ({
        title: _title,
        date: getSectionDate(_content),
        data: _content,
      })),
  };
};

const ActivityListView = () => {
  const I18n = useTranslator();

  const {project} = useSelector(state => state.project_project);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dataList, setDataList] = useState<any[]>([]);

  const cursorRef = useRef<any>(null);
  const isFetchingRef = useRef(false);
  const isEndReachedRef = useRef(false);

  const dateLimit = useMemo(
    () => (project?.createdOn != null ? new Date(project.createdOn) : null),
    [project?.createdOn],
  );

  const updateCursor = useCallback(
    (startDate: string, date: Date) => {
      if (startDate == null || date == null || isNaN(date.getTime())) {
        cursorRef.current = null;
        isEndReachedRef.current = true;
        return;
      }

      cursorRef.current = {value: startDate, date};
      isEndReachedRef.current = dateLimit != null && date <= dateLimit;
    },
    [dateLimit],
  );

  const fetchPreviousData = useCallback(async () => {
    if (
      project?.id == null ||
      isFetchingRef.current ||
      isEndReachedRef.current ||
      cursorRef.current == null
    )
      return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      let sections: any[] = [];
      let requestCount = 0;

      while (
        sections.length === 0 &&
        (dateLimit != null || requestCount < MAX_EMPTY_PERIODS) &&
        !isEndReachedRef.current &&
        cursorRef.current != null
      ) {
        requestCount++;

        const res = await previousProjectActivity({
          projectId: project.id,
          startDate: cursorRef.current.value,
        });
        const parsedResponse = parseResponse(res);

        updateCursor(
          parsedResponse.startDate,
          substractDays(cursorRef.current.date, PERIOD_IN_DAYS),
        );
        sections = parsedResponse.sections;
      }

      if (sections.length > 0) {
        setDataList(_current => [..._current, ...sections]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, [project?.id, dateLimit, updateCursor]);

  const fetchInitialData = useCallback(async () => {
    if (project?.id == null) return;

    isFetchingRef.current = true;
    isEndReachedRef.current = false;
    cursorRef.current = null;
    setLoading(true);

    let hasData = false;

    try {
      const res = await initProjectActivity({projectId: project.id});
      const {startDate, sections} = parseResponse(res);

      updateCursor(startDate, substractDays(new Date(), PERIOD_IN_DAYS - 1));
      setDataList(sections);
      hasData = sections.length > 0;
    } catch (error) {
      console.error(error);
      setDataList([]);
    } finally {
      isFetchingRef.current = false;
      setRefreshing(false);
    }

    if (!hasData) {
      await fetchPreviousData();
    }

    setLoading(false);
  }, [project?.id, updateCursor, fetchPreviousData]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setDataList([]);
    fetchInitialData();
  }, [fetchInitialData]);

  const renderItem = ({item}: any) => {
    const updates = item[Object.keys(item)[0]];

    return updates.map((update: any) => {
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
        <ActivityCard
          key={time}
          userId={userId}
          userName={user}
          time={time}
          title={title}
          tracks={tracks}
          modelName={modelName}
          utilityClass={utilityClass}
        />
      );
    });
  };

  const renderSectionHeader = ({section: {title, date}}: any) => (
    <View style={styles.header}>
      {date != null ? (
        <DateDisplay date={date} displayYear={true} size={14} />
      ) : (
        <Text writingType="important">{title}</Text>
      )}
    </View>
  );

  const keyExtractor = (item: any, index: number) => {
    const _activities = item?.[Object.keys(item)[0]] ?? [];

    return `${_activities[0]?.time ?? Object.keys(item)[0]}-${index}`;
  };

  if (dataList.length === 0 && !loading && !refreshing) {
    return (
      <Label
        style={styles.label}
        type="info"
        message={I18n.t('Project_NoActivity')}
      />
    );
  }

  return (
    <SectionList
      sections={dataList}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      onEndReached={fetchPreviousData}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
  },
  label: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default ActivityListView;
