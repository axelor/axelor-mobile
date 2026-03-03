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

import React, {useEffect, useMemo, useState} from 'react';
import {
  headerActionsProvider,
  SearchTreeView,
  useNavigation,
  useDispatch,
  useSelector,
  useTranslator,
  usePermitted,
} from '@axelor/aos-mobile-core';
import {ChipSelect, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  addToFavorites,
  removeFromFavorites,
  searchDocument,
  searchDirectory,
} from '../../../features/documentSlice';
import {searchDocumentApi} from '../../../api';
import {AuthorFilter, DirectoryCard} from '../../atoms';
import {DocumentActionCard} from '../../molecules';
import {File} from '../../../types';

interface DocumentListProps {
  defaultParent?: any;
  isAttachedFilesList?: boolean;
  hideActions?: boolean;
  customOnPress?: (file: any) => void;
}

const DocumentList = ({
  defaultParent,
  isAttachedFilesList = false,
  hideActions = false,
  customOnPress,
}: DocumentListProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const {canCreate, readonly} = usePermitted({
    modelName: 'com.axelor.dms.db.DMSFile',
  });
  const dispatch = useDispatch();

  const [author, setAuthor] = useState(null);
  const [selectedExtensions, setSelectedExtensions] = useState([]);
  const [parentList, setParentList] = useState([]);

  const {
    loadingDocument,
    moreLoadingDocument,
    isListEndDocument,
    documentList,
    directoryList,
  } = useSelector((state: any) => state.dms_document);
  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {user} = useSelector(state => state.user);

  const sliceParentFunctionData = useMemo(
    () => ({
      authorId: author?.id,
    }),
    [author?.id],
  );

  const sliceFunctionData = useMemo(
    () => ({
      authorId: author?.id,
      extensions: selectedExtensions.map(_extension => _extension.key),
    }),
    [author?.id, selectedExtensions],
  );

  useEffect(() => {
    headerActionsProvider.registerModel('dms_all_documents', {
      actions: [
        {
          key: 'newDocument',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Dms_NewDocument'),
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate,
          onPress: () =>
            navigation.navigate('DocumentFormScreen', {
              parent: parentList.at(-1),
            }),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, canCreate, navigation, parentList]);

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchTreeView
        parentList={directoryList}
        list={documentList}
        loading={loadingDocument}
        moreLoading={moreLoadingDocument}
        isListEnd={isListEndDocument}
        sliceParentFunction={searchDirectory}
        sliceParentFunctionData={sliceParentFunctionData}
        sliceFunction={searchDocument}
        sliceFunctionData={sliceFunctionData}
        sliceFunctionDataParentIdName="parentDirectoryId"
        sliceFunctionDataNoParentName="noParent"
        fetchBranchData={branchId =>
          searchDocumentApi({
            authorId: author?.id,
            extensions: selectedExtensions.map(_extension => _extension.key),
            parentDirectoryId: branchId,
          })
        }
        branchCondition={item => item.isDirectory}
        displayParentSearchValue={item => item.fileName}
        searchParentPlaceholder={I18n.t('Dms_ParentFolder')}
        searchPlaceholder={I18n.t('Base_Search')}
        isHideableParentSearch={false}
        parentFieldName="parent"
        renderBranch={({item}) => <DirectoryCard directory={item} />}
        getBranchActions={branch => {
          if (hideActions) {
            return null;
          }

          const isFavorite = user?.favouriteFolderSet.some(
            ({id}) => id === branch.item.id,
          );

          const sliceFunction = isFavorite
            ? removeFromFavorites
            : addToFavorites;

          return [
            {
              iconName: isFavorite ? 'star-fill' : 'star',
              iconColor: Colors.progressColor.background,
              helper: I18n.t('Dms_AddToFavorites'),
              onPress: () =>
                dispatch(
                  (sliceFunction as any)({
                    documentId: branch.item.id,
                    userId: user?.id,
                  }),
                ),
              hidden: !mobileSettings?.isFavoritesManagementEnabled,
              disabled: readonly,
            },
            {
              iconName: 'pencil-fill',
              helper: I18n.t('Dms_Rename'),
              onPress: () =>
                navigation.navigate('DocumentFormScreen', {
                  document: branch.item,
                }),
              hidden: !mobileSettings?.isRenamingAllowed || readonly,
            },
          ];
        }}
        renderLeaf={({item}) => (
          <DocumentActionCard
            document={item}
            handleRefresh={() => setSelectedExtensions(current => [...current])}
            disableFavorites={hideActions}
            disableDownload={hideActions}
            disableEdit={hideActions}
            disabledDelete={hideActions}
            customOnPress={
              customOnPress ? () => customOnPress(item) : undefined
            }
          />
        )}
        headerChildren={<AuthorFilter author={author} setAuthor={setAuthor} />}
        chipComponent={
          <ChipSelect
            mode="multi"
            selectionItems={File.getFileExtensionList(Colors)}
            onChangeValue={setSelectedExtensions}
            showClearButton
          />
        }
        displayBreadcrumb
        defaultParent={defaultParent}
        manageParentFilter={!isAttachedFilesList}
        onParentChange={setParentList}
      />
    </Screen>
  );
};

export default DocumentList;
