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

import React, {useCallback, useMemo} from 'react';
import {
  downloadFileOnPhone,
  useDispatch,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  addToFavorites,
  deleteDocument,
  deleteFavoriteDocument,
  removeFromFavorites,
} from '../../../features/documentSlice';
import {DocumentCard} from '../../atoms';

interface DocumentActionCardProps {
  document: any;
  handleRefresh?: () => void;
  disableFavorites?: boolean;
  disableDownload?: boolean;
  disableEdit?: boolean;
  disabledDelete?: boolean;
  customOnPress?: () => void;
}

const DocumentActionCard = ({
  document,
  handleRefresh,
  disableFavorites = false,
  disableDownload = false,
  disableEdit = false,
  disabledDelete = false,
  customOnPress,
}: DocumentActionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const {readonly, canDelete} = usePermitted({
    modelName: 'com.axelor.dms.db.DMSFile',
  });
  const dispatch: any = useDispatch();

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);
  const {baseUrl, token, jsessionId} = useSelector(state => state.auth);

  const isFavorite = useMemo(
    () => user?.favouriteFileSet.some(({id}) => id === document.id),
    [document.id, user?.favouriteFileSet],
  );

  const handleDownloadFile = useCallback(async () => {
    await downloadFileOnPhone(
      {fileName: document.fileName, id: document.id, isMetaFile: false},
      {baseUrl, token, jsessionId},
      I18n,
    );
  }, [I18n, baseUrl, document, jsessionId, token]);

  return (
    <ActionCard
      actionList={[
        {
          iconName: isFavorite ? 'star-fill' : 'star',
          iconColor: Colors.progressColor.background,
          helper: I18n.t('Dms_AddToFavorites'),
          onPress: () =>
            dispatch(
              ((isFavorite ? removeFromFavorites : addToFavorites) as any)({
                documentId: document.id,
                userId: user?.id,
              }),
            ),
          hidden:
            disableFavorites || !mobileSettings?.isFavoritesManagementEnabled,
          disabled: readonly,
        },
        {
          iconName: 'download',
          helper: I18n.t('Dms_Download'),
          onPress: handleDownloadFile,
          hidden: disableDownload || !mobileSettings?.isDownloadAllowed,
        },
        {
          iconName: 'pencil-fill',
          helper: I18n.t('Dms_Rename'),
          onPress: () =>
            navigation.navigate('DocumentFormScreen', {
              document,
            }),
          hidden: disableEdit || !mobileSettings?.isRenamingAllowed || readonly,
        },
        {
          iconName: 'trash-fill',
          iconColor: Colors.errorColor.background,
          helper: I18n.t('Dms_Delete'),
          onPress: () =>
            dispatch(
              ((isFavorite ? deleteFavoriteDocument : deleteDocument) as any)({
                documentId: document.id,
                userId: user?.id,
              }),
            ).then(() => handleRefresh?.()),
          hidden:
            disabledDelete ||
            !canDelete ||
            !mobileSettings?.isFileDeletionAllowed,
        },
      ]}
      translator={I18n.t}>
      <DocumentCard document={document} customOnPress={customOnPress} />
    </ActionCard>
  );
};

export default DocumentActionCard;
