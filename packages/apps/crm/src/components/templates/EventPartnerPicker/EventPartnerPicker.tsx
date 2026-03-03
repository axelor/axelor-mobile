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

import React, {useEffect} from 'react';
import {Picker} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {fetchPartnerEventById} from '../../../features/eventSlice';

const EventPartnerPicker = ({
  title = 'Crm_Event',
  defaultValue = null,
  onChange,
  readonly = false,
  required = false,
  partner,
  style,
}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {listEventPartner} = useSelector(state => state.event);

  useEffect(() => {
    dispatch((fetchPartnerEventById as any)(partner?.id));
  }, [dispatch, partner?.id]);

  return (
    <Picker
      style={style}
      title={I18n.t(title)}
      defaultValue={defaultValue}
      listItems={listEventPartner}
      labelField="subject"
      valueField="id"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
      isValueItem={true}
    />
  );
};

export default EventPartnerPicker;
