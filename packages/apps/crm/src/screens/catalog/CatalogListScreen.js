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

import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  checkNullString,
  HeaderContainer,
  MultiValuePicker,
  Screen,
  ScrollList,
  useThemeColor,
  WarningCard,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {CatalogCard, CatalogsSearchBar} from '../../components';
import {fetchCatalog, fetchCatalogType} from '../../features/catalogSlice';
import {fetchCrmConfigApi} from '../../features/crmConfigSlice';
import Catalog from '../../types/catalog';

const CatalogListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {crmConfig} = useSelector(state => state.crmConfig);
  const {user} = useSelector(state => state.user);
  const {loadingCatalog, moreLoading, isListEnd, catalogList, catalogTypeList} =
    useSelector(state => state.catalog);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [filter, setFilter] = useState(null);

  const handleDataSearch = useCallback(searchValue => {
    setFilter(searchValue);
  }, []);

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
      dispatch(fetchCatalog({page: page}));
    },
    [dispatch],
  );

  const filterOnStatus = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      }

      if (!Array.isArray(selectedStatus) || selectedStatus.length === 0) {
        return list;
      }

      return list?.filter(item =>
        selectedStatus.find(status => item?.catalogType?.id === status.key),
      );
    },
    [selectedStatus],
  );

  useEffect(() => {
    dispatch(fetchCrmConfigApi());
    dispatch(fetchCatalogType());
  }, [dispatch]);

  const filteredList = useMemo(
    () => filterOnStatus(catalogList),
    [catalogList, filterOnStatus],
  );

  if (crmConfig?.isManageCatalogs == null) {
    return null;
  }

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
            <CatalogsSearchBar
              showDetailsPopup={false}
              oneFilter={true}
              onFetchDataAction={handleDataSearch}
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
        filter={!checkNullString(filter)}
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
