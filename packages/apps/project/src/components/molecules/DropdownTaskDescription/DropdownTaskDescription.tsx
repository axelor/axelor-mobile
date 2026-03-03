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

import React, {useCallback} from 'react';
import {View} from 'react-native';
import {HtmlInput, Text, checkNullString} from '@axelor/aos-mobile-ui';
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

  const renderDescription = useCallback(
    (titleKey: string, value: string) => {
      if (!checkNullString(value)) {
        return (
          <>
            <Text writingType="important">{`${I18n.t(titleKey)}:`}</Text>
            <HtmlInput defaultInput={value} readonly={true} />
          </>
        );
      }
      return null;
    },
    [I18n],
  );

  return (
    <View style={style}>
      {renderDescription('Base_Description', description)}
      {renderDescription('Project_InternalDescription', internalDescription)}
    </View>
  );
};

export default DropdownTaskDescription;
