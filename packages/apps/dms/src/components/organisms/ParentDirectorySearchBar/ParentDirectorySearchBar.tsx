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

import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchDirectory} from '../../../features/documentSlice';

interface ParentDirectorySearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const ParentDirectorySearchBar = ({
  style = null,
  title = 'Dms_ParentFolder',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: ParentDirectorySearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {
    loadingDirectory,
    moreLoadingDirectory,
    isListEndDirectory,
    directoryList,
  } = useSelector((state: any) => state.dms_document);

  const extendedDirectoryList = useMemo(
    () => [
      {
        ...(user.dmsRoot ?? mobileSettings.defaultDmsRoot),
        fileName: I18n.t('Dms_Root'),
      },
      ...directoryList,
    ],
    [I18n, directoryList, mobileSettings.defaultDmsRoot, user.dmsRoot],
  );

  const searchParentDirectoryAPI = useCallback(
    ({searchValue, page = 0}) => {
      dispatch((searchDirectory as any)({searchValue, page}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={extendedDirectoryList}
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
  );
};

export default ParentDirectorySearchBar;
