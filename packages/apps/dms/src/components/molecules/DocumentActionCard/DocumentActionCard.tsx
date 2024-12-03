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
import {
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {DocumentCard} from '../../atoms';

interface DocumentActionCardProps {
  document: any;
}

const DocumentActionCard = ({document}: DocumentActionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);

  return (
    <ActionCard
      actionList={[
        {
          iconName: 'download',
          helper: I18n.t('Dms_Download'),
          large: true,
          onPress: () => console.log('Download'),
          hidden: !mobileSettings?.isDownloadAllowed,
        },
        {
          iconName: 'star',
          iconColor: Colors.progressColor.background,
          helper: I18n.t('Dms_AddToFavorites'),
          onPress: () => console.log('Add to favorites'),
          hidden: !mobileSettings?.isFavoritesManagementEnabled,
        },
        {
          iconName: 'info-circle',
          helper: I18n.t('Dms_Details'),
          onPress: () => console.log('Details'),
        },
        {
          iconName: 'pencil-fill',
          helper: I18n.t('Dms_Rename'),
          onPress: () =>
            navigation.navigate('DocumentFormScreen', {
              document,
            }),
          hidden: !mobileSettings?.isRenamingAllowed,
        },
        {
          iconName: 'trash-fill',
          iconColor: Colors.errorColor.background,
          helper: I18n.t('Dms_Delete'),
          onPress: () => console.log('Delete'),
          hidden: !mobileSettings?.isFileDeletionAllowed,
        },
      ]}
      translator={I18n.t}>
      <DocumentCard document={document} />
    </ActionCard>
  );
};

export default DocumentActionCard;
