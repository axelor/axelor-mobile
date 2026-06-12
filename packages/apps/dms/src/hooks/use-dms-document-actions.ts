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

import {useEffect} from 'react';
import {
  useDispatch,
  useFileApi,
  useNavigation,
  useOnline,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {
  addToFavorites,
  deleteDocument,
  deleteFavoriteDocument,
  removeFromFavorites,
} from '../features/documentSlice';
import {documentActionsProvider} from '../providers';

export const useDmsDocumentActions = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const fileApi = useFileApi();
  const dispatch: any = useDispatch();
  const {DMSFile} = useTypes();
  const {readonly, canDelete} = usePermitted({
    modelName: 'com.axelor.dms.db.DMSFile',
  });

  const {isConnected} = useOnline();
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    documentActionsProvider.registerLeafActions('dms', (item, context) => {
      if (item?.id == null) return [];

      const isFavorite = user?.favouriteFileSet?.some(
        ({id}: any) => id === item.id,
      );

      return [
        {
          key: DMSFile?.actionKey?.Favorite,
          iconName: isFavorite ? 'star-fill' : 'star',
          iconColor: Colors.progressColor.background,
          helper: I18n.t('Dms_AddToFavorites'),
          onPress: () =>
            dispatch(
              ((isFavorite ? removeFromFavorites : addToFavorites) as any)({
                documentId: item.id,
                userId: user?.id,
              }),
            ),
          hidden: !isConnected || !mobileSettings?.isFavoritesManagementEnabled,
          disabled: readonly,
          closeAfter: false,
        },
        {
          key: DMSFile?.actionKey?.Download,
          iconName: 'download',
          helper: I18n.t('Dms_Download'),
          onPress: () =>
            fileApi.saveToDevice({
              id: item.metaFile?.id,
              fileName: item.metaFile?.fileName,
            }),
          hidden: !mobileSettings?.isDownloadAllowed,
        },
        {
          key: DMSFile?.actionKey?.Rename,
          iconName: 'pencil-fill',
          helper: I18n.t('Dms_Rename'),
          onPress: () =>
            navigation.navigate('DocumentFormScreen', {document: item}),
          hidden:
            !isConnected || !mobileSettings?.isRenamingAllowed || readonly,
        },
        {
          key: DMSFile?.actionKey?.Delete,
          iconName: 'trash-fill',
          iconColor: Colors.errorColor.background,
          helper: I18n.t('Dms_Delete'),
          onPress: () =>
            dispatch(
              ((isFavorite ? deleteFavoriteDocument : deleteDocument) as any)({
                documentId: item.id,
                userId: user?.id,
              }),
            ).then(() => context?.handleRefresh?.()),
          hidden:
            !isConnected ||
            !canDelete ||
            !mobileSettings?.isFileDeletionAllowed,
        },
      ];
    });

    documentActionsProvider.registerBranchActions('dms', branch => {
      const item = branch?.item;

      if (item?.id == null) return [];

      const isFavorite = user?.favouriteFolderSet?.some(
        ({id}: any) => id === item.id,
      );

      return [
        {
          key: DMSFile?.actionKey?.Favorite,
          iconName: isFavorite ? 'star-fill' : 'star',
          iconColor: Colors.progressColor.background,
          helper: I18n.t('Dms_AddToFavorites'),
          onPress: () =>
            dispatch(
              ((isFavorite ? removeFromFavorites : addToFavorites) as any)({
                documentId: item.id,
                userId: user?.id,
              }),
            ),
          hidden: !isConnected || !mobileSettings?.isFavoritesManagementEnabled,
          disabled: readonly,
        },
        {
          key: DMSFile?.actionKey?.Rename,
          iconName: 'pencil-fill',
          helper: I18n.t('Dms_Rename'),
          onPress: () =>
            navigation.navigate('DocumentFormScreen', {document: item}),
          hidden:
            !isConnected || !mobileSettings?.isRenamingAllowed || readonly,
        },
      ];
    });
  }, [
    Colors,
    DMSFile?.actionKey,
    I18n,
    canDelete,
    dispatch,
    fileApi,
    isConnected,
    mobileSettings,
    navigation,
    readonly,
    user?.favouriteFileSet,
    user?.favouriteFolderSet,
    user?.id,
  ]);
};
