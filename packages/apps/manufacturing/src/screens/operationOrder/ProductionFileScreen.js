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

import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  Screen,
  ScrollList,
  HeaderContainer,
  ToggleSwitch,
} from '@axelor/aos-mobile-ui';
import {fetchProductionFile} from '../../features/productionFileSlice';
import {
  ProductionFileLargeCard,
  ProductionFileSmallCard,
} from '../../components';

const ProductionFileScreen = ({route}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loading, moreLoading, isListEnd, productionFileList} = useSelector(
    state => state.productionFile,
  );

  const [tab, setTab] = useState(false);

  const fetchProductionFileAPI = useCallback(
    page => {
      dispatch(
        fetchProductionFile({
          prodProcessLineId: route?.params?.prodProcessLineId,
          page: page,
        }),
      );
    },
    [dispatch, route?.params?.prodProcessLineId],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        fixedItems={
          <ToggleSwitch
            leftTitle={I18n.t('Base_Large')}
            rightTitle={I18n.t('Base_Small')}
            onSwitch={() => setTab(!tab)}
          />
        }
        expandableFilter={false}
      />
      <ScrollList
        loadingList={loading}
        data={productionFileList}
        renderItem={({item}) => {
          if (tab) {
            return (
              <ProductionFileSmallCard
                image={item.image}
                description={item.description}
              />
            );
          }
          return (
            <ProductionFileLargeCard
              image={item.image}
              description={item.description}
            />
          );
        }}
        fetchData={fetchProductionFileAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default ProductionFileScreen;
