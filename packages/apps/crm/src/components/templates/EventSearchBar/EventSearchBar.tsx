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

import React, {useCallback} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {fetchPlannedEvent} from '../../../features/eventSlice';

interface EventSearchBarProps {
  style?: any;
  title?: string;
  showTitle?: boolean;
  defaultValue?: string;
  onChange?: (any: any) => void;
  navigate?: boolean;
  oneFilter?: boolean;
  showDetailsPopup?: boolean;
  fetchData?: Object;
}

const EventSearchBar = ({
  style,
  title = 'Crm_Events',
  defaultValue,
  onChange,
  showDetailsPopup = true,
  showTitle = false,
  navigate = false,
  oneFilter = false,
  fetchData,
}: EventSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {eventList, loadingEventList, moreLoading, isListEnd} = useSelector(
    state => state.event,
  );

  const fetchEventSearchBarAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (fetchPlannedEvent as any)({...(fetchData ?? {}), page, searchValue}),
      );
    },
    [dispatch, fetchData],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      loadingList={loadingEventList}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      objectList={eventList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchEventSearchBarAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

export default EventSearchBar;
