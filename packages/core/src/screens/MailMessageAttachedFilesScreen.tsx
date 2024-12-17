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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  AttachmentCard,
  ChipSelect,
  File,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../i18n';
import {useDispatch, useSelector} from '../redux/hooks';
import {openFileInExternalApp} from '../tools';
import {getAttachedFilesDetails} from '../features/attachedFilesSlice';

const MailMessageAttachedFilesScreen = ({route}) => {
  const {files} = route.params;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {baseUrl, token, jsessionId} = useSelector(state => state.auth);
  const {loading, attachedFilesList} = useSelector(
    state => state.attachedFiles,
  );

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [extensionList, setExtensionList] = useState([]);

  const handleShowFile = async item => {
    await openFileInExternalApp(
      {fileName: item.fileName, id: item.id, isMetaFile: true},
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
  };

  const fetchFilesAPI = useCallback(() => {
    dispatch(
      (getAttachedFilesDetails as any)({
        listFiles: files,
      }),
    );
  }, [dispatch, files]);

  const filterOnSelectExtension = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return list;
      } else if (selectedStatus.length > 0) {
        return list.filter(item =>
          selectedStatus.find(
            status => File.getFileExtension(item.fileName) === status.key,
          ),
        );
      } else {
        return list;
      }
    },
    [selectedStatus],
  );

  const filteredList = useMemo(
    () => filterOnSelectExtension(attachedFilesList),
    [filterOnSelectExtension, attachedFilesList],
  );

  useEffect(() => {
    setExtensionList(
      Array.from(
        new Set(
          attachedFilesList?.map(item => File.getFileExtension(item.fileName)),
        ),
      ),
    );
  }, [files, attachedFilesList]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        chipComponent={
          <ChipSelect
            mode="multi"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={extensionList.map(ext => {
              return {
                title: `${ext}`.toUpperCase(),
                color: Colors.primaryColor,
                key: ext,
              };
            })}
          />
        }
      />
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <AttachmentCard
            fileName={item.fileName}
            onPress={() => handleShowFile(item)}
            creationDate={item.createdOn}
            translator={I18n.t}
          />
        )}
        fetchData={fetchFilesAPI}
        filter={true}
        moreLoading={false}
        isListEnd={true}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default MailMessageAttachedFilesScreen;
