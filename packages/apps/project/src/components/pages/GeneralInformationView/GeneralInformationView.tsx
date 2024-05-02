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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {isEmpty, useSelector} from '@axelor/aos-mobile-core';
import {HeaderContainer, ScrollView, Text} from '@axelor/aos-mobile-ui';
import {ProjectHeader} from '../../molecules';

const GeneralInformationView = () => {
  const {project} = useSelector((state: any) => state.project_project);

  if (project == null || isEmpty(project)) {
    return null;
  }

  return (
    <View>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProjectHeader project={project} />}
      />
      <ScrollView style={styles.scrollView}>
        <Text>Test</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
  },
  dropdownCardTitle: {
    fontWeight: 'bold',
  },
  stopwatch: {
    width: '90%',
    marginTop: 30,
    marginVertical: 0,
  },
});

export default GeneralInformationView;
