import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector, useTranslator} from '@aos-mobile/core';
import {fetchProductionFile} from '../../features/productionFileSlice';
import {
  ProductionFileLargeCard,
  ProductionFileSmallCard,
} from '../../components/organisms';
import {
  Screen,
  ScrollList,
  HeaderContainer,
  ToggleSwitch,
} from '@aos-mobile/ui';

const ProductionFileScreen = ({route, navigation}) => {
  const [tab, setTab] = useState(false);
  const {loading, moreLoading, isListEnd, productionFileList} = useSelector(
    state => state.productionFile,
  );
  const I18n = useTranslator();
  const dispatch = useDispatch();

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
                imageId={item.image?.id}
                description={item.description}
              />
            );
          }
          return (
            <ProductionFileLargeCard
              imageId={item.image?.id}
              description={item.description}
            />
          );
        }}
        fetchData={fetchProductionFileAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

export default ProductionFileScreen;
