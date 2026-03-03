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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {isEmpty, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {HeaderContainer, NotesCard, ScrollView} from '@axelor/aos-mobile-ui';
import {DatesDisplay} from '../../atoms';
import {
  PartnerActionCard,
  ProjectHeader,
  ProjectSiteTags,
} from '../../molecules';
import {ProjectDropdownCards} from '../../organisms';

const GeneralInformationView = ({
  additionalDropdownItems,
}: {
  additionalDropdownItems?: any[];
}) => {
  const I18n = useTranslator();

  const {project} = useSelector((state: any) => state.project_project);

  if (project == null || isEmpty(project)) {
    return null;
  }

  return (
    <View>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProjectHeader />}
      />
      <ScrollView>
        <View style={styles.margin}>
          <DatesDisplay fromDate={project.fromDate} toDate={project.toDate} />
          <ProjectSiteTags />
        </View>
        <NotesCard
          title={I18n.t('Base_Description')}
          data={project.description}
        />
        <PartnerActionCard partner={project.clientPartner} />
        <PartnerActionCard partner={project.contactPartner} isContact />
        <ProjectDropdownCards additionalItems={additionalDropdownItems} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  margin: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default GeneralInformationView;
