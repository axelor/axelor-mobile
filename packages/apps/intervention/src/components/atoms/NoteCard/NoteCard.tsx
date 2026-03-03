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
import {StyleSheet} from 'react-native';
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import {ObjectCard} from '@axelor/aos-mobile-ui';

interface NoteCardProps {
  style?: any;
  metaFile: any;
  description: string;
  createdOn: string;
  updatedOn: string;
  createdBy: any;
  updatedBy: any;
}

const NoteCard = ({
  style,
  metaFile,
  description,
  createdOn,
  updatedOn,
  createdBy,
  updatedBy,
}: NoteCardProps) => {
  const I18n = useTranslator();

  return (
    <ObjectCard
      style={[styles.container, style]}
      touchable={false}
      showArrow={false}
      upperTexts={{
        items: [
          {
            displayText: metaFile ? metaFile.fileName : description,
            isTitle: true,
            style: styles.marginBottom,
          },
          {
            indicatorText: I18n.t('Intervention_CreatedOn'),
            displayText: formatDate(createdOn, I18n.t('Base_DateFormat')),
          },
          {
            indicatorText: I18n.t('Intervention_UpdatedOn'),
            displayText: formatDate(updatedOn, I18n.t('Base_DateFormat')),
            hideIf: updatedOn == null,
          },
          {
            indicatorText: I18n.t('Intervention_CreatedBy'),
            displayText: createdBy?.fullName,
          },
          {
            indicatorText: I18n.t('Intervention_UpdatedBy'),
            displayText: updatedBy?.fullName,
            hideIf: updatedBy?.fullName == null,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    marginHorizontal: 1,
    marginVertical: 2,
  },
  marginBottom: {
    marginBottom: 5,
  },
});

export default NoteCard;
