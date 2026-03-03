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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch, Label} from '@axelor/aos-mobile-ui';
import {searchDirectory} from '../../../features/documentSlice';

interface ParentDirectorySearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
  displayRootInfo?: boolean;
}

const ParentDirectorySearchBar = ({
  style = null,
  title = 'Dms_ParentFolder',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  displayRootInfo = false,
}: ParentDirectorySearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingDirectory,
    moreLoadingDirectory,
    isListEndDirectory,
    directoryList,
  } = useSelector(state => state.dms_document);

  const searchParentDirectoryAPI = useCallback(
    ({searchValue, page = 0}) => {
      dispatch((searchDirectory as any)({searchValue, page}));
    },
    [dispatch],
  );

  return (
    <>
      {displayRootInfo && defaultValue == null && (
        <Label
          style={styles.label}
          type="info"
          message={I18n.t('Dms_SearchBarRootInfo')}
        />
      )}
      <AutoCompleteSearch
        style={style}
        title={I18n.t(title)}
        objectList={directoryList}
        value={defaultValue}
        required={required}
        readonly={readonly}
        onChangeValue={onChange}
        fetchData={searchParentDirectoryAPI}
        displayValue={item => item.fileName}
        placeholder={I18n.t(title)}
        showDetailsPopup={true}
        loadingList={loadingDirectory}
        moreLoading={moreLoadingDirectory}
        isListEnd={isListEndDirectory}
        navigate={false}
        oneFilter={false}
        translator={I18n.t}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default ParentDirectorySearchBar;
