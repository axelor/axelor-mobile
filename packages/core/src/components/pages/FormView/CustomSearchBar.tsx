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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  AutoCompleteSearch,
  FormInput,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {customComponentOptions} from '../../../forms/types';
import {fetchData} from '../../../features/metaJsonFieldSlice';
import {fetchModelFields} from '../../../forms/studio/api.helpers';

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
  style,
  title,
  defaultValue,
  onChange,
  required,
  readonly,
}: props) => {
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {loading, moreLoading, isListEnd, data} = useSelector(
    (state: any) => state.metaJsonField,
  );

  const [searchFields, setSearchFields] = useState<string[]>([]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const searchClientAndProspectAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (fetchData as any)({
          page,
          searchValue,
          modelName: item.targetModel,
          domain: item.domain,
          searchFields,
        }),
      );
    },
    [dispatch, item, searchFields],
  );

  useEffect(() => {
    fetchModelFields({modelName: item.targetModel}).then(setSearchFields);
  }, [item]);

  if (readonly) {
    return (
      <FormInput
        style={style}
        title={title}
        readOnly={true}
        defaultValue={defaultValue}
      />
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null, style]}>
      <Text style={styles.title}>{title}</Text>
      <AutoCompleteSearch
        style={[
          styles.search,
          defaultValue == null && required ? styles.requiredBorder : null,
        ]}
        objectList={data}
        value={defaultValue}
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
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      zIndex: 41,
    },
    title: {
      marginHorizontal: 30,
    },
    requiredBorder: {
      borderColor: Colors.errorColor.background,
    },
    search: {
      width: '100%',
    },
  });

export default CustomSearchBar;
