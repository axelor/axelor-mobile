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
import {useTranslator} from '@axelor/aos-mobile-core';
import {checkNullString, HtmlInput, Label, Text} from '@axelor/aos-mobile-ui';

interface DropdownDescriptionsViewProps {
  description?: string;
  internalNote?: string;
}

const DropdownDescriptionsView = ({
  description,
  internalNote,
}: DropdownDescriptionsViewProps) => {
  const I18n = useTranslator();

  const isDescription = useMemo(
    () => !checkNullString(description),
    [description],
  );

  const isInternalNote = useMemo(
    () => !checkNullString(internalNote),
    [internalNote],
  );

  return (
    <View>
      {isDescription && (
        <>
          <Text writingType="important">{`${I18n.t(
            'Base_Description',
          )} :`}</Text>
          <HtmlInput defaultInput={description} readonly={true} />
        </>
      )}
      {isInternalNote && (
        <>
          <Text writingType="important">{`${I18n.t(
            'Sale_InternalNote',
          )} :`}</Text>
          <HtmlInput defaultInput={internalNote} readonly={true} />
        </>
      )}
      {!isDescription && !isInternalNote && (
        <Label message={I18n.t('Sale_NoDescription')} type="info" />
      )}
    </View>
  );
};

export default DropdownDescriptionsView;
