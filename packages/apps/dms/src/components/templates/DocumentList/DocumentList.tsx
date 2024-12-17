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

import React, {useMemo, useState} from 'react';
import {
  SearchTreeView,
  useNavigation,
  useDispatch,
  useSelector,
  useTranslator,
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
}

const DocumentList = ({
  defaultParent,
  isAttachedFilesList = false,
}: DocumentListProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [author, setAuthor] = useState(null);
  const [selectedExtensions, setSelectedExtensions] = useState([]);

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
        parentFieldName="parent"
        renderBranch={({item}) => <DirectoryCard directory={item} />}
        getBranchActions={branch => {
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
            },
            {
              iconName: 'info-circle',
              helper: I18n.t('Dms_Details'),
              onPress: () => console.log('branch: ', branch),
            },
            {
              iconName: 'pencil-fill',
              helper: I18n.t('Dms_Rename'),
              large: true,
              onPress: () =>
                navigation.navigate('DocumentFormScreen', {
                  document: branch.item,
                }),
              hidden: !mobileSettings?.isRenamingAllowed,
            },
          ];
        }}
        renderLeaf={({item}) => <DocumentActionCard document={item} />}
        headerChildren={<AuthorFilter author={author} setAuthor={setAuthor} />}
        chipComponent={
          <ChipSelect
            mode="multi"
            selectionItems={File.getFileExtensionList(Colors)}
            onChangeValue={setSelectedExtensions}
          />
        }
        displayBreadcrumb
        defaultParent={defaultParent}
        isParentSearchBarVisible={!isAttachedFilesList}
      />
    </Screen>
  );
};

export default DocumentList;
