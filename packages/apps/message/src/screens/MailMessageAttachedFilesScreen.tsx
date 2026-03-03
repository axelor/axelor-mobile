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
import {DocumentActionCard, File, searchDocument} from '@axelor/aos-mobile-dms';

const MailMessageAttachedFilesScreen = ({route}) => {
  const {files} = route?.params;
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [selectedExtensions, setSelectedExtensions] = useState([]);

  const {
    loadingDocuments,
    moreLoadingDocument,
    isListEndDocument,
    documentList,
  } = useSelector(state => state.dms_document);

  const sliceFunctionData = useMemo(
    () => ({
      extensions: selectedExtensions.map(_extension => _extension.key),
      metaFileIds: files.map((_file: any) => _file.id),
    }),
    [files, selectedExtensions],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={documentList}
        loading={loadingDocuments}
        moreLoading={moreLoadingDocument}
        isListEnd={isListEndDocument}
        sliceFunction={searchDocument}
        sliceFunctionData={sliceFunctionData}
        displaySearchValue={item => item.fileName}
        searchPlaceholder={I18n.t('Base_Search')}
        chipComponent={
          <ChipSelect
            mode="multi"
            selectionItems={File.getFileExtensionList(Colors)}
            onChangeValue={setSelectedExtensions}
            showClearButton
          />
        }
        renderListItem={({item}) => (
          <DocumentActionCard document={item} disableEdit disabledDelete />
        )}
        expandableFilter={false}
      />
    </Screen>
  );
};

export default MailMessageAttachedFilesScreen;
