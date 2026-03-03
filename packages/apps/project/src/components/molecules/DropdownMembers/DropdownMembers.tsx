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
import {View} from 'react-native';
import {LabelText, TagList} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface DropdownMembersProps {
  style?: any;
  team: string;
  memberSet?: any[];
}

const DropdownMembers = ({style, team, memberSet}: DropdownMembersProps) => {
  const I18n = useTranslator();

  const members = useMemo(() => {
    return memberSet?.map(member => ({title: member?.fullName}));
  }, [memberSet]);

  return (
    <View style={style}>
      <LabelText
        title={`${I18n.t('Project_Team')} :`}
        value={team ?? '-'}
        textSize={16}
      />
      <TagList title={I18n.t('Project_Members')} tags={members} />
    </View>
  );
};

export default DropdownMembers;
