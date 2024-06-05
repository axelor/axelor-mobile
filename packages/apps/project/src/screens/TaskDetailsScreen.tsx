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

import React, {useEffect, useMemo} from 'react';
import {GridView, HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {
  CustomFieldForm,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchProjectTaskById} from '../features/projectTaskSlice';
import {ProjectSimpleCard, TaskButton, TaskDetailsHeader} from '../components';
import ProjectTaskDropdownCards from '../components/organisms/ProjectTaskDropdownCards/ProjectTaskDropdownCards';
import {fetchProjectStatus} from '../features/projectSlice';
import {fetchTimesheetLinesByTask} from '../features/timesheetLinesSlice';
import {ScrollView, View} from 'react-native';

const TaskDetailsScreen = ({navigation, route}) => {
  const projecTaskId = route?.params?.projecTaskId;

  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {projectTask} = useSelector((state: any) => state.project_projectTask);
  const {timesheetLineList} = useSelector(
    (state: any) => state.project_timesheetLines,
  );

  useEffect(() => {
    dispatch((fetchProjectTaskById as any)({projecTaskId}));
    dispatch(fetchProjectStatus());
    dispatch((fetchTimesheetLinesByTask as any)({projectTaskId: projecTaskId}));
  }, [projecTaskId, dispatch]);

  const formattedData = useMemo(() => {
    if (Array.isArray(timesheetLineList) && timesheetLineList.length > 0) {
      return timesheetLineList.map(item => ({
        project: item.project?.fullName ?? '',
        date: item.date,
        duration: item.duration,
        product: item.product?.fullName ?? '',
        projectTask: item.projectTask?.fullName ?? '',
        toInvoice: item.toInvoice ? 'X' : '',
        comments: item.comments ?? '',
      }));
    } else {
      return [];
    }
  }, [timesheetLineList]);

  return (
    <Screen removeSpaceOnTop={true} fixedItems={<TaskButton />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TaskDetailsHeader />}
      />
      <ScrollView>
        <ProjectSimpleCard
          code={projectTask?.project?.code}
          name={projectTask?.project?.name}
          projectStatus={projectTask?.project?.projectStatus}
          onPress={() => {
            navigation.navigate('ProjectDetailsScreen', {
              projectId: projectTask?.project?.id,
            });
          }}
        />
        <ProjectTaskDropdownCards />
        <CustomFieldForm
          model="com.axelor.apps.project.db.ProjectTask"
          fieldType="attrs"
          modelId={projectTask.id}
        />
        <View>
          <GridView
            data={formattedData}
            columns={[
              {title: I18n.t('Project_Project'), key: 'project'},
              {title: I18n.t('Project_Task'), key: 'projectTask'},
              {title: I18n.t('Project_Date'), key: 'date'},
              {title: I18n.t('Project_Product'), key: 'product'},
              {title: I18n.t('Project_Duration'), key: 'duration'},
              {title: I18n.t('Project_ToInvoice'), key: 'toInvoice'},
              {title: I18n.t('Base_Comments'), key: 'comments'},
            ]}
            title={I18n.t('Project_TimeSpent')}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default TaskDetailsScreen;
