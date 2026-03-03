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

import React, {useMemo, useState} from 'react';
import {
  useSelector,
  SearchListView,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ChipSelect, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {AuthorFilter, DocumentActionCard} from '../components';
import {searchFavoriteDocument} from '../features/documentSlice';
import {File} from '../types';

const MyFavoriteDocumentsScreen = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [author, setAuthor] = useState(null);
  const [selectedExtensions, setSelectedExtensions] = useState([]);

  const {user} = useSelector(state => state.user);
  const {
    loadingFavoriteDocument,
    moreLoadingFavoriteDocument,
    isListEndFavoriteDocument,
    favoriteDocumentList,
  } = useSelector(state => state.dms_document);

  const sliceFunctionData = useMemo(
    () => ({
      authorId: author?.id,
      extensions: selectedExtensions.map(_extension => _extension.key),
      favoriteFileIds:
        user?.favouriteFileSet?.length > 0
          ? user?.favouriteFileSet?.map((file: any) => file.id)
          : [-1],
    }),
    [author?.id, selectedExtensions, user?.favouriteFileSet],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={favoriteDocumentList}
        loading={loadingFavoriteDocument}
        moreLoading={moreLoadingFavoriteDocument}
        isListEnd={isListEndFavoriteDocument}
        sliceFunction={searchFavoriteDocument}
        sliceFunctionData={sliceFunctionData}
        displaySearchValue={item => item.fileName}
        searchPlaceholder={I18n.t('Base_Search')}
        headerChildren={<AuthorFilter author={author} setAuthor={setAuthor} />}
        chipComponent={
          <ChipSelect
            mode="multi"
            selectionItems={File.getFileExtensionList(Colors)}
            onChangeValue={setSelectedExtensions}
            showClearButton
          />
        }
        renderListItem={({item}) => <DocumentActionCard document={item} />}
      />
    </Screen>
  );
};

export default MyFavoriteDocumentsScreen;
