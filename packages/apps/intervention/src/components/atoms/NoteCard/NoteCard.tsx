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
import {formatDate, useTranslator} from '@axelor/aos-mobile-core';
import {LabelText, ObjectCard} from '@axelor/aos-mobile-ui';

interface NoteCardProps {
  style?: any;
  metaFile: any;
  description: string;
  createdOn: string;
  updatedOn: string;
  createdBy: any;
}

const NoteCard = ({
  style,
  metaFile,
  description,
  createdOn,
  updatedOn,
  createdBy,
}: NoteCardProps) => {
  const I18n = useTranslator();

  return (
    <View style={style}>
      <ObjectCard
        style={styles.container}
        touchable={false}
        showArrow={false}
        upperTexts={{
          items: [
            {
              displayText: metaFile ? metaFile.fileName : description,
              isTitle: true,
            },
            {
              customComponent: (
                <LabelText
                  title={I18n.t('Intervention_CreatedOn')}
                  value={formatDate(createdOn, I18n.t('Base_DateFormat'))}
                />
              ),
            },
            {
              customComponent: (
                <LabelText
                  title={I18n.t('Intervention_UpdatedOn')}
                  value={formatDate(updatedOn, I18n.t('Base_DateFormat'))}
                />
              ),
              hideIf: updatedOn == null,
            },
            {
              customComponent: (
                <LabelText
                  title={I18n.t('Intervention_CreatedBy')}
                  value={createdBy.fullName}
                />
              ),
            },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 1,
    marginVertical: 1,
  },
});

export default NoteCard;
