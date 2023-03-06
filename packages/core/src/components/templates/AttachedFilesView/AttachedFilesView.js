/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  AttachmentCard,
  ChipSelect,
  File,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import useTranslator from '../../../i18n/hooks/use-translator';
import {
  getAttachedFiles,
  getAttachedFilesDetails,
} from '../../../features/attachedFilesSlice';
import {openFileInExternalApp} from '../../../tools/FileViewer';

function AttachedFilesView({
  files,
  model,
  modelId,
  isStaticList = false,
  isMetaFile = false,
  screenTitle,
  navigation,
}) {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {baseUrl, token, jsessionId} = useSelector(state => state.auth);
  const {loading, attachedFilesList} = useSelector(
    state => state.attachedFiles,
  );
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [extensionList, setExtensionList] = useState([]);

  const dispatch = useDispatch();

  const handleShowFile = async item => {
    await openFileInExternalApp(
      {fileName: item.fileName, id: item.id, isMetaFile: isMetaFile},
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
  };

  const fetchFilesAPI = useCallback(() => {
    dispatch(
      isStaticList
        ? getAttachedFilesDetails({
            listFiles: files,
            isMetaFile: true,
          })
        : getAttachedFiles({
            model,
            modelId,
          }),
    );
  }, [dispatch, isStaticList, files, model, modelId]);

  const filterOnSelectExtension = useCallback(
    list => {
      if (list == null || list === []) {
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

  React.useLayoutEffect(() => {
    if (screenTitle) {
      navigation.setOptions({
        headerTitle: screenTitle,
      });
    }
  }, [navigation, screenTitle]);

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
            marginHorizontal={5}
            width={Dimensions.get('window').width * 0.25}
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
}

export default AttachedFilesView;
