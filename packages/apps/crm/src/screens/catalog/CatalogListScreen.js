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

import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  MultiValuePicker,
  Screen,
  useThemeColor,
  WarningCard,
} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useDispatch,
  useIsAdmin,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {CatalogCard} from '../../components';
import {fetchCatalog, fetchCatalogType} from '../../features/catalogSlice';
import Catalog from '../../types/catalog';

const CatalogListScreen = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const isAdmin = useIsAdmin();

  const {crm: crmConfig} = useSelector(state => state.appConfig);
  const {loadingCatalog, moreLoading, isListEnd, catalogList, catalogTypeList} =
    useSelector(state => state.catalog);

  const [selectedStatus, setSelectedStatus] = useState([]);

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

  useEffect(() => {
    dispatch(fetchCatalogType());
  }, [dispatch]);

  const sliceFunctionData = useMemo(
    () => ({
      statusList: selectedStatus,
    }),
    [selectedStatus],
  );

  if (crmConfig?.isManageCatalogs == null) {
    return null;
  }

  if (!crmConfig?.isManageCatalogs) {
    return (
      <View>
        <WarningCard
          errorMessage={
            isAdmin
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
      <SearchListView
        expandableFilter={false}
        list={catalogList}
        loading={loadingCatalog}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchCatalog}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={() => {}}
        searchPlaceholder={I18n.t('Crm_Catalogs')}
        fixedItems={
          <MultiValuePicker
            style={styles.headerItem}
            listItems={catalogTypeListItems}
            title={I18n.t('Base_Status')}
            onValueChange={statusList => setSelectedStatus(statusList)}
          />
        }
        renderListItem={({item}) => (
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
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headerItem: {
    alignSelf: 'center',
  },
});

export default CatalogListScreen;
