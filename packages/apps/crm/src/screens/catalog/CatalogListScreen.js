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

import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  AutoCompleteSearch,
  ScrollList,
  MultiValuePicker,
  useThemeColor,
  WarningCard,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchCatalog, fetchCatalogType} from '../../features/catalogSlice';
import {CatalogCard} from '../../components';
import Catalog from '../../types/catalog';
import {fetchCrmConfigApi} from '../../features/crmConfigSlice';

const CatalogListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {crmConfig} = useSelector(state => state.crmConfig);
  const {user} = useSelector(state => state.user);
  const {loadingCatalog, moreLoading, isListEnd, catalogList, catalogTypeList} =
    useSelector(state => state.catalog);

  const [filteredList, setFilteredList] = useState(catalogList);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [filter, setFilter] = useState(null);
  const [catalog, setCatalog] = useState(null);

  const catalogTypeListItems = useMemo(() => {
    return catalogTypeList
      ? catalogTypeList.map((status, index) => {
          return {
            title: status.name,
            color: Catalog.getStatusColor(index, Colors),
            key: status.id,
          };
        })
      : [];
  }, [catalogTypeList, Colors]);

  const fetchCatalogAPI = useCallback(
    page => {
      dispatch(fetchCatalog({searchValue: filter, page: page}));
    },
    [dispatch, filter],
  );

  const fetchCatalogFilter = useCallback(
    searchValue => {
      setFilter(searchValue);
      dispatch(fetchCatalog({searchValue: searchValue, page: 0}));
    },
    [dispatch],
  );

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (selectedStatus.length > 0) {
          return list?.filter(item =>
            selectedStatus.find(status => item?.catalogType?.id === status.key),
          );
        } else {
          return list;
        }
      }
    },
    [selectedStatus],
  );

  useEffect(() => {
    dispatch(fetchCrmConfigApi());
    dispatch(fetchCatalogType());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(filterOnStatus(catalogList));
  }, [catalogList, filterOnStatus]);

  if (!crmConfig?.isManageCatalogs) {
    return (
      <View>
        <WarningCard
          errorMessage={
            user?.group?.code === 'admins'
              ? I18n.t('Crm_Catalogs_Disabled') +
                '\n' +
                I18n.t('Crm_Catalogs_Disabled_Admin')
              : I18n.t('Crm_Catalogs_Disabled')
          }
        />
      </View>
    );
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <AutoCompleteSearch
              objectList={catalogList}
              value={catalog}
              onChangeValue={setCatalog}
              fetchData={fetchCatalogFilter}
              placeholder={I18n.t('Crm_Catalogs')}
              oneFilter={true}
              selectLastItem={false}
            />
            <MultiValuePicker
              listItems={catalogTypeListItems}
              title={I18n.t('Base_Status')}
              onValueChange={statusList => setSelectedStatus(statusList)}
            />
          </View>
        }
      />
      <ScrollList
        loadingList={loadingCatalog}
        data={filteredList}
        renderItem={({item}) => (
          <CatalogCard
            style={styles.item}
            id={item.id}
            version={item.version}
            description={item.description}
            name={item.name}
            category={item.catalogType?.name}
            catalogueType={item.catalogType}
            allCatalogType={catalogTypeList}
            pdfFile={item.pdfFile}
          />
        )}
        fetchData={fetchCatalogAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headerContainer: {
    alignItems: 'center',
  },
  toggleSwitchContainer: {
    width: '90%',
    height: 40,
  },
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
});

export default CatalogListScreen;
