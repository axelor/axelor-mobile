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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  TourValidateButton,
  TourDetailsHeader,
  TourLineActionCard,
} from '../../components';
import {fetchTourById} from '../../features/tourSlice';
import {searchTourLine} from '../../features/tourLineSlice';
import {TourLine} from '../../types';

const TourDetailsScreen = ({route}) => {
  const {tourId} = route.params;

  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {tour} = useSelector(state => state.tour);
  const {tourLineList, loadingTourLineList, moreLoading, isListEnd} =
    useSelector(state => state.tourLine);

  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    dispatch(fetchTourById({tourId: tourId}));
  }, [dispatch, tourId]);

  const fetchTourLineAPI = useCallback(
    (page = 0) => {
      dispatch(
        searchTourLine({
          page: page,
          tourId: tour?.id,
          isValidated: selectedStatus[0]?.key,
        }),
      );
    },
    [dispatch, selectedStatus, tour],
  );

  const hasUnvalidatedItems = useMemo(() => {
    return tourLineList.some(item => !item.isValidated);
  }, [tourLineList]);

  if (tour?.id !== tourId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        hasUnvalidatedItems && <TourValidateButton tourId={tourId} />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TourDetailsHeader />}
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Crm_Status_Planned'),
                color: Colors.secondaryColor,
                key: TourLine.status.Planned,
              },
              {
                title: I18n.t('Crm_Status_Validated'),
                color: Colors.successColor,
                key: TourLine.status.Validated,
              },
            ]}
          />
        }
      />
      <ScrollList
        loadingList={loadingTourLineList}
        data={tourLineList}
        fetchData={fetchTourLineAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
        renderItem={({item}) => (
          <TourLineActionCard
            name={item?.partner?.fullName}
            address={item?.address?.fullName}
            isValidated={item?.isValidated}
            eventId={item?.event?.id}
            id={item.id}
            tourId={tourId}
          />
        )}
      />
    </Screen>
  );
};

export default TourDetailsScreen;
