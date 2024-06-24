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
import {StyleSheet, View} from 'react-native';
import {FormView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {HeaderContainer} from '@axelor/aos-mobile-ui';
import {updateProject} from '@axelor/aos-mobile-hr';
import {ProjectHeader} from '../../molecules';

const TimeView = () => {
  const dispatch = useDispatch();

  const {project} = useSelector((state: any) => state.project_project);

  useEffect(() => {
    dispatch(updateProject(project));
  }, [dispatch, project]);

  const defaultValue = useMemo(() => {
    return {
      project: project,
      date: new Date().toISOString().split('T')[0],
    };
  }, [project]);

  return (
    <View>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProjectHeader />}
      />
      <View style={styles.container}>
        <FormView
          formKey="project_TimesheetLine"
          actions={[]}
          defaultValue={defaultValue}
          floatingTools={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default TimeView;
