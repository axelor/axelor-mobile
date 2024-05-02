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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  DateDisplay,
  isEmpty,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  DropdownCardSwitch,
  HeaderContainer,
  Icon,
  NotesCard,
  TagList,
  Text,
  ScrollView,
  checkNullString,
} from '@axelor/aos-mobile-ui';
import {PartnerIconCard, ProjectHeader} from '../../molecules';

const GeneralInformationView = () => {
  const I18n = useTranslator();

  const {project} = useSelector((state: any) => state.project_project);
  const {base: baseConfig} = useSelector(state => state.appConfig);

  const siteSet = useMemo(() => {
    return project?.siteSet?.map(site => ({title: site?.fullName}));
  }, [project?.siteSet]);

  const members = useMemo(() => {
    return project?.membersUserSet?.map(member => ({title: member?.fullName}));
  }, [project?.membersUserSet]);

  if (project == null || isEmpty(project)) {
    return null;
  }

  console.log('siteset', project);

  return (
    <View>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<ProjectHeader project={project} />}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.margin}>
          <View style={styles.dateContainer}>
            <DateDisplay date={project.fromDate} />
            {project.fromDate != null && project.toDate != null && (
              <Icon name="arrow-right" size={30} style={styles.icon} />
            )}
            <DateDisplay date={project.toDate} />
          </View>
          {baseConfig?.enableSiteManagementForProject && (
            <TagList title={I18n.t('Project_Sites')} tags={siteSet} />
          )}
        </View>
        <NotesCard
          title={I18n.t('Base_Description')}
          data={project?.description}
          style={styles.notesCard}
        />
        <PartnerIconCard
          partnerPicture={project.clientPartner?.picture}
          partnerName={project.clientPartner?.name}
          partnerJob={project.clientPartner?.jobTitleFunction}
        />
        <PartnerIconCard
          partnerPicture={project.contactPartner?.picture}
          partnerName={project.contactPartner?.name}
          partnerJob={project.contactPartner?.jobTitleFunction}
        />
        <DropdownCardSwitch
          dropdownItems={[
            {
              key: 1,
              title: I18n.t('Project_Invoicing'),
              childrenComp: <Text>Test</Text>,
            },
          ]}
        />
        <DropdownCardSwitch
          dropdownItems={[
            {
              key: 1,
              title: I18n.t('Project_Members'),
              childrenComp: (
                <>
                  {!checkNullString(project?.team?.name) && (
                    <Text>{`${I18n.t('Project_Team')} : ${
                      project?.team?.name
                    }`}</Text>
                  )}
                  <TagList title={I18n.t('Project_Members')} tags={members} />
                </>
              ),
            },
          ]}
          style={styles.marginBottom}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: null,
  },
  margin: {
    marginHorizontal: 24,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 2,
  },
  notesCard: {
    marginTop: 24,
  },
  marginBottom: {
    marginBottom: 100,
  },
});

export default GeneralInformationView;
