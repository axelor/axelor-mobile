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

import React, {useCallback, useEffect, useState} from 'react';
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
  showTitle?: boolean;
  oneFilter?: boolean;
}

const CustomSearchBarAux = ({
  item,
  style,
  title,
  defaultValue,
  onChange,
  required,
  readonly,
  showTitle = true,
  oneFilter = true,
}: props) => {
  const [searchFields, setSearchFields] = useState<string[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [isListEnd, setIsListEnd] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchModelFields({modelName: item.targetModel}).then(setSearchFields);
  }, [item]);

  const searchDataAPI = useCallback(
    ({page = 0, searchValue}: {page: number; searchValue?: string}) => {
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
      style={style}
      title={showTitle ? title : undefined}
      objectList={data}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchDataAPI}
      displayValue={(_item: any) =>
        Array.isArray(searchFields) && searchFields.length > 0
          ? _item[searchFields[0]]
          : (_item.fullName ?? _item.name)
      }
      placeholder={title}
      showDetailsPopup={true}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      oneFilter={oneFilter}
    />
  );
};

const CustomSearchBar = (props: props) => {
  return <CustomSearchBarAux {...props} />;
};

export default CustomSearchBar;
