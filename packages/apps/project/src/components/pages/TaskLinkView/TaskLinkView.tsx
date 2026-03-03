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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useDispatch,
  useSelector,
  useTranslator,
  clipboardProvider,
} from '@axelor/aos-mobile-core';
import {
  GroupByScrollList,
  HeaderContainer,
  HorizontalRule,
} from '@axelor/aos-mobile-ui';
import {TaskCard} from '../../atoms';
import {TaskDetailsHeader} from '../../molecules';
import {searchProjectTaskLink} from '../../../features/projectTaskSlice';

const TaskLinkView = ({}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {
    projectTask,
    taskLinkList,
    loadingTaskLink,
    moreLoadingTaskLink,
    isListEndTaskLink,
  } = useSelector((state: any) => state.project_projectTask);

  useEffect(() => {
    dispatch((searchProjectTaskLink as any)({taskId: projectTask?.id}));
  }, [dispatch, projectTask?.id]);

  const fetchProjectTaskLinkAPI = useCallback(
    (page = 0) => {
      dispatch(
        (searchProjectTaskLink as any)({
          taskId: projectTask?.id,
          page: page,
        }),
      );
    },
    [dispatch, projectTask?.id],
  );

  const separatorCondition = useCallback(
    (prevItem: any, currentItem: any) =>
      prevItem.projectTaskLinkType.id !== currentItem.projectTaskLinkType.id,
    [],
  );

  return (
    <View style={styles.container}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TaskDetailsHeader />}
      />
      <GroupByScrollList
        translator={I18n.t}
        data={taskLinkList}
        loadingList={loadingTaskLink}
        isListEnd={isListEndTaskLink}
        moreLoading={moreLoadingTaskLink}
        fetchData={fetchProjectTaskLinkAPI}
        renderItem={({item}) => (
          <TaskCard
            name={item?.relatedTask.name}
            assignedTo={item?.relatedTask?.assignedTo?.fullName}
            taskDeadline={item?.relatedTask?.taskDeadline}
            parentTask={item?.relatedTask?.parentTask?.name}
            progress={item?.relatedTask?.progress}
            priority={item?.relatedTask?.priority}
            status={item?.relatedTask?.status}
            isCopyCard={true}
            showArrow={false}
            onPress={() =>
              clipboardProvider.copyToClipboard(item?.relatedTask.name)
            }
          />
        )}
        separatorCondition={separatorCondition}
        fetchBottomIndicator={() => ({text: ''})}
        customBottomSeparator={<HorizontalRule style={styles.horizotalRule} />}
        fetchTopIndicator={item => ({
          title: item.projectTaskLinkType.name,
          position: 'left',
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizotalRule: {
    marginTop: 15,
    width: '60%',
    alignSelf: 'center',
  },
});

export default TaskLinkView;
