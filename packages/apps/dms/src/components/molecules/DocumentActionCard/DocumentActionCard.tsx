/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../features/documentSlice';
import {DocumentCard} from '../../atoms';

interface DocumentActionCardProps {
  document: any;
}

const DocumentActionCard = ({document}: DocumentActionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {user} = useSelector(state => state.user);

  const isFavorite = useMemo(
    () => user?.favouriteFileSet.some(({id}) => id === document.id),
    [document.id, user?.favouriteFileSet],
  );

  const sliceFunction = useMemo(
    () => (isFavorite ? removeFromFavorites : addToFavorites),
    [isFavorite],
  );

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
          iconName: isFavorite ? 'star-fill' : 'star',
          iconColor: Colors.progressColor.background,
          helper: I18n.t('Dms_AddToFavorites'),
          onPress: () =>
            dispatch(
              (sliceFunction as any)({
                documentId: document.id,
                userId: user?.id,
              }),
            ),
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
