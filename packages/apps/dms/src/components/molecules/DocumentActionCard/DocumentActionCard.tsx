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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useFileApi,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  ActionCardType,
  ActionSheet,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  addToFavorites,
  deleteDocument,
  deleteFavoriteDocument,
  removeFromFavorites,
} from '../../../features/documentSlice';
import {DocumentCard} from '../../atoms';

interface Action extends ActionCardType {
  order?: number;
  closeAfter?: boolean;
}

interface DocumentActionCardProps {
  document: any;
  handleRefresh?: () => void;
  disableFavorites?: boolean;
  disableDownload?: boolean;
  disableEdit?: boolean;
  disabledDelete?: boolean;
  customOnPress?: () => void;
  additionnalActions?: Action[];
}

const DocumentActionCard = ({
  document,
  handleRefresh,
  disableFavorites = false,
  disableDownload = false,
  disableEdit = false,
  disabledDelete = false,
  customOnPress,
  additionnalActions,
}: DocumentActionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const fileApi = useFileApi();
  const navigation = useNavigation();
  const {readonly, canDelete} = usePermitted({
    modelName: 'com.axelor.dms.db.DMSFile',
  });
  const dispatch: any = useDispatch();

  const [isActionsVisible, setIsActionsVisible] = useState(false);

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);

  const isFavorite = useMemo(
    () => user?.favouriteFileSet.some(({id}: any) => id === document.id),
    [document.id, user?.favouriteFileSet],
  );

  const handleOpenFile = useCallback(async () => {
    await fileApi.openInExternalApp({
      id: document.metaFile?.id,
      fileName: document.metaFile?.fileName,
    });
  }, [fileApi, document]);

  const handleDownloadFile = useCallback(async () => {
    await fileApi.saveToDevice({
      id: document.metaFile?.id,
      fileName: document.metaFile?.fileName,
    });
  }, [fileApi, document]);

  const actionList = useMemo(
    () => [
      {
        iconName: 'eye-fill',
        helper: I18n.t('Dms_Open'),
        onPress: handleOpenFile,
      },
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
        closeAfter: false,
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
      ...(additionnalActions ?? []),
    ],
    [
      I18n,
      handleOpenFile,
      isFavorite,
      Colors,
      disableFavorites,
      mobileSettings?.isFavoritesManagementEnabled,
      mobileSettings?.isDownloadAllowed,
      mobileSettings?.isRenamingAllowed,
      mobileSettings?.isFileDeletionAllowed,
      readonly,
      handleDownloadFile,
      disableDownload,
      disableEdit,
      disabledDelete,
      canDelete,
      additionnalActions,
      dispatch,
      document,
      user?.id,
      navigation,
      handleRefresh,
    ],
  );

  const visibleActions = useMemo(
    () =>
      actionList
        .map((_i, idx) => ({..._i, order: _i.order ?? idx * 10}))
        .sort((a, b) => a.order - b.order)
        .filter(action => !action.hidden),
    [actionList],
  );

  const handleCardPress = useCallback(() => {
    if (customOnPress != null) {
      customOnPress?.();
    } else if (visibleActions.length > 1) {
      setIsActionsVisible(true);
    } else {
      visibleActions[0]?.onPress();
    }
  }, [customOnPress, visibleActions]);

  return (
    <>
      <DocumentCard
        style={styles.container}
        document={document}
        customOnPress={handleCardPress}
      />
      <ActionSheet
        visible={isActionsVisible}
        title={document.fileName}
        actionList={visibleActions}
        onClose={() => setIsActionsVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 2,
  },
});

export default DocumentActionCard;
