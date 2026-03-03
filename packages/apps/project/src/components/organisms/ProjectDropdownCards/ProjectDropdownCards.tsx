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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {DropdownMembers} from '../../molecules';

const ProjectDropdownCards = ({additionalItems}: {additionalItems?: any[]}) => {
  const I18n = useTranslator();

  const {project} = useSelector(state => state.project_project);

  const items = useMemo(
    () =>
      [
        ...(additionalItems ?? []),
        {
          key: 10,
          order: 10,
          title: I18n.t('Project_Members'),
          childrenComp: (
            <DropdownMembers
              team={project?.team?.name}
              memberSet={project?.membersUserSet}
            />
          ),
        },
      ].sort((a, b) => a.order - b.order),
    [I18n, additionalItems, project],
  );

  return <DropdownCardSwitch dropdownItems={items} style={styles.dropdown} />;
};

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 5,
    marginBottom: 100,
  },
});

export default ProjectDropdownCards;
