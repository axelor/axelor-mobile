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
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Screen, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {searchDocument, searchDirectory} from '../features/documentSlice';
import {searchDocumentApi} from '../api';
import {DirectoryCard, DocumentsFilters} from '../components';

const AllDocumentsScreen = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [author, setAuthor] = useState(null);

  const {
    loadingDocument,
    moreLoadingDocument,
    isListEndDocument,
    documentList,
    directoryList,
  } = useSelector((state: any) => state.dms_document);

  const sliceParentFunctionData = useMemo(
    () => ({
      authorId: author?.id,
    }),
    [author?.id],
  );

  const sliceFunctionData = useMemo(
    () => ({
      authorId: author?.id,
    }),
    [author?.id],
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
            parentDirectoryId: branchId,
          })
        }
        branchCondition={item => item.isDirectory}
        displayParentSearchValue={item => item.fileName}
        searchParentPlaceholder={I18n.t('Dms_ParentFolder')}
        searchPlaceholder={I18n.t('Base_Search')}
        parentFieldName="parent"
        renderBranch={({item}) => <DirectoryCard directory={item} />}
        getBranchActions={branch => [
          {
            iconName: 'star',
            iconColor: Colors.progressColor.background,
            helper: I18n.t('Dms_AddToFavorites'),
            onPress: () => console.log('Add to favorites'),
          },
          {
            iconName: 'info-circle',
            helper: I18n.t('Dms_Details'),
            onPress: () => console.log('Details'),
          },
          {
            iconName: 'pencil-fill',
            helper: I18n.t('Dms_Rename'),
            large: true,
            onPress: () => console.log('Rename'),
          },
        ]}
        renderLeaf={({item}) => (
          <Text writingType="important">{item.fileName}</Text>
        )}
        headerChildren={
          <DocumentsFilters author={author} setAuthor={setAuthor} />
        }
      />
    </Screen>
  );
};

export default AllDocumentsScreen;
