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
import {View} from 'react-native';
import {NotesCard} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface DropdownTaskDescriptionProps {
  style?: any;
  description?: string;
  internalDescription?: string;
}

const DropdownTaskDescription = ({
  style,
  description,
  internalDescription,
}: DropdownTaskDescriptionProps) => {
  const I18n = useTranslator();

  return (
    <View style={style}>
      <NotesCard title={I18n.t('Base_Description')} data={description} />
      <NotesCard
        title={I18n.t('Project_InternalDescription')}
        data={internalDescription}
      />
    </View>
  );
};

export default DropdownTaskDescription;
