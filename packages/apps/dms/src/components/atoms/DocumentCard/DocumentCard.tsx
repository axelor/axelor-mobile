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
import {
  formatDateTime,
  openFileInExternalApp,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {LabelText, ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {File} from '../../../types';

interface DocumentCardProps {
  style?: any;
  document: any;
  customOnPress?: () => void;
}

const DocumentCard = ({style, document, customOnPress}: DocumentCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const fileColor = useMemo(
    () => File.getFileColor(document.metaFile?.fileName, Colors).background,
    [Colors, document.metaFile?.fileName],
  );

  const styles = useMemo(() => getStyles(fileColor), [fileColor]);

  const addedOn = useMemo(
    () =>
      `${I18n.t('Base_AddedOn')} ${formatDateTime(document.createdOn, I18n.t('Base_DateTimeFormat'))}`,
    [I18n, document.createdOn],
  );

  const handleOpenFile = async () => {
    await openFileInExternalApp(
      {
        fileName: document.metaFile?.fileName,
        id: document.metaFile?.id,
        isMetaFile: true,
      },
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
  };

  return (
    <ObjectCard
      style={[styles.card, style]}
      showArrow={false}
      onPress={customOnPress ?? handleOpenFile}
      upperTexts={{
        items: [
          {
            customComponent: (
              <LabelText
                iconName={File.getFileIcon(document.fileName)}
                color={fileColor}
                value={document.fileName}
                size={16}
                textSize={16}
                onlyOneLine
              />
            ),
          },
          {
            iconName: 'person-fill',
            indicatorText: document.createdBy?.fullName,
          },
          {
            iconName: 'calendar-event',
            indicatorText: addedOn,
          },
        ],
      }}
    />
  );
};

const getStyles = (borderColor: string) =>
  StyleSheet.create({
    card: {
      marginVertical: 2,
      marginHorizontal: 0,
      marginRight: 2,
      borderLeftWidth: 7,
      borderLeftColor: borderColor,
    },
  });

export default DocumentCard;
