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
import {searchTicketStatus} from '../../../features/ticketSlice';

interface TicketStatusSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const TicketStatusSearchBar = ({
  style = null,
  title = 'Helpdesk_Status',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: TicketStatusSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    ticketStatusList,
    loadingTicketStatus,
    moreLoadingTicketStatus,
    isListEndTicketStatus,
  } = useSelector((state: any) => state.ticket);

  const searchTicketStatusAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((searchTicketStatus as any)({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={ticketStatusList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchTicketStatusAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingTicketStatus}
      moreLoading={moreLoadingTicketStatus}
      isListEnd={isListEndTicketStatus}
      navigate={false}
      oneFilter={false}
    />
  );
};

export default TicketStatusSearchBar;
