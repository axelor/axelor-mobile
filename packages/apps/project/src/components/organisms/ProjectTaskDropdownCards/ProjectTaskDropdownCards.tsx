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
import {StyleSheet} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCardSwitch, checkNullString} from '@axelor/aos-mobile-ui';
import {
  DropdownTaskCharacteristics,
  DropdownTaskDescription,
} from '../../molecules';

const ProjectTaskDropdownCards = () => {
  const I18n = useTranslator();

  const {projectTask} = useSelector((state: any) => state.project_projectTask);

  const items = useMemo(() => {
    const result = [
      {
        key: 1,
        title: I18n.t('Project_Characteristics'),
        childrenComp: (
          <DropdownTaskCharacteristics
            projectTaskCategory={projectTask.projectTaskCategory}
            projectTaskSection={projectTask.projectTaskSection}
            targetVersion={projectTask.targetVersion}
            taskDate={projectTask.taskDate}
            taskEndDate={projectTask.taskEndDate}
            taskDeadline={projectTask.taskDeadline}
            projectTaskTagSet={projectTask.projectTaskTagSet}
          />
        ),
      },
    ];

    if (
      !checkNullString(projectTask?.description) ||
      !checkNullString(projectTask?.internalDescription)
    ) {
      result.push({
        key: 2,
        title: I18n.t('Project_Descriptions'),
        childrenComp: (
          <DropdownTaskDescription
            description={projectTask?.description}
            internalDescription={projectTask?.internalDescription}
          />
        ),
      });
    }

    return result;
  }, [I18n, projectTask]);

  return <DropdownCardSwitch dropdownItems={items} style={styles.dropdown} />;
};

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 5,
  },
});

export default ProjectTaskDropdownCards;
