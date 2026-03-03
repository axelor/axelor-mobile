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

import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FormView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {HeaderContainer} from '@axelor/aos-mobile-ui';
import {updateProject} from '@axelor/aos-mobile-hr';
import {clearReset} from '../../../features/timesheetLinesSlice';

const TimeView = ({
  project,
  projectTask,
  headerComponent,
}: {
  project: any;
  projectTask?: any;
  headerComponent: ReactNode;
}) => {
  const dispatch = useDispatch();

  const {resetTimeForm} = useSelector(
    (state: any) => state.project_timesheetLines,
  );

  const [formValue, setFormValue] = useState({});

  const defaultValue = useMemo(() => {
    return {
      project,
      projectTask,
      isTaskLog: projectTask != null,
      date: new Date().toISOString().split('T')[0],
      useDuration: false,
    };
  }, [project, projectTask]);

  useEffect(() => {
    dispatch(updateProject(project));
  }, [dispatch, project]);

  useEffect(() => {
    if (resetTimeForm) {
      setFormValue(current => ({...current}));
      dispatch(clearReset());
    }
  }, [dispatch, resetTimeForm]);

  useEffect(() => {
    setFormValue(defaultValue);
  }, [defaultValue]);

  return (
    <View style={styles.container}>
      <HeaderContainer expandableFilter={false} fixedItems={headerComponent} />
      <FormView
        formKey="project_TimesheetLine"
        actions={[]}
        defaultValue={formValue}
        floatingTools={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TimeView;
