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

import React, {useCallback, useEffect, useState} from 'react';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  TourDetailsButton,
  TourDetailsHeader,
  TourLineCard,
} from '../../components';
import {fetchControlTourById} from '../../features/tourSlice';
import {searchTourLine} from '../../features/tourLineSlice';
import {TourLineType} from '../../types';

const TourDetailsScreen = ({route}) => {
  const {tourId} = route.params;

  const dispatch = useDispatch();
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {tourLineList, loadingTourLineList, moreLoading, isListEnd} =
    useSelector(state => state.tourLine);

  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    dispatch(fetchControlTourById({tourId: tourId}));
  }, [dispatch, tourId]);

  const fetchTourLineAPI = useCallback(
    (page = 0) => {
      dispatch(
        searchTourLine({
          page: page,
          tourId: tourId,
          status:
            selectedStatus[0]?.key === TourLineType.status.Planned
              ? false
              : selectedStatus[0]?.key === TourLineType.status.Validated
              ? true
              : null,
        }),
      );
    },
    [dispatch, selectedStatus, tourId],
  );

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<TourDetailsButton tourId={tourId} />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TourDetailsHeader totalTourLine={tourLineList?.length} />}
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Crm_Event_Status_Planned'),
                color: Colors.secondaryColor,
                key: TourLineType.status.Planned,
              },
              {
                title: I18n.t('Crm_Status_Validated'),
                color: Colors.successColor,
                key: TourLineType.status.Validated,
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
          <TourLineCard
            name={item?.partner?.fullName}
            adress={item?.address?.fullName}
            eventId={item?.event?.id}
            isValidated={item?.isValidated}
            id={item.id}
          />
        )}
      />
    </Screen>
  );
};

export default TourDetailsScreen;
