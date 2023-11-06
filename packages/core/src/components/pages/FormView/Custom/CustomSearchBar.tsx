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

import React, {useCallback, useEffect, useState} from 'react';
import {useTranslator} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {customComponentOptions} from '../../../../forms/types';
import {
  fetchModelFields,
  fetchData,
} from '../../../../forms/studio/api.helpers';

interface props extends customComponentOptions {
  item: any;
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: () => any;
  required?: boolean;
  readonly?: boolean;
}

const CustomSearchBar = ({
  item,
  title,
  defaultValue,
  onChange,
  required,
  readonly,
}: props) => {
  const I18n = useTranslator();

  const [searchFields, setSearchFields] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [isListEnd, setIsListEnd] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchModelFields({modelName: item.targetModel}).then(setSearchFields);
  }, [item]);

  const searchClientAndProspectAPI = useCallback(
    ({page = 0, searchValue}) => {
      if (page == null || page === 0) {
        setLoading(true);
      } else {
        setMoreLoading(true);
      }

      fetchData({
        page,
        searchValue,
        modelName: item.targetModel,
        domain: item.domain,
        searchFields,
      })
        .catch(() => {
          setLoading(false);
          setMoreLoading(false);
        })
        .then(_data => {
          setLoading(false);
          setMoreLoading(false);

          if (page == null || page === 0) {
            setData(_data);
            setIsListEnd(false);
          } else {
            if (Array.isArray(_data) && _data.length > 0) {
              setIsListEnd(false);
              setData(_current => [..._current, ..._data]);
            } else {
              setIsListEnd(true);
            }
          }
        });
    },
    [item, searchFields],
  );

  return (
    <AutoCompleteSearch
      title={I18n.t(title)}
      objectList={data}
      value={defaultValue}
      required={required && defaultValue == null}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchClientAndProspectAPI}
      displayValue={_item =>
        _item[searchFields?.length > 0 ? searchFields[0] : 'name']
      }
      placeholder={title}
      showDetailsPopup={true}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
    />
  );
};

export default CustomSearchBar;
