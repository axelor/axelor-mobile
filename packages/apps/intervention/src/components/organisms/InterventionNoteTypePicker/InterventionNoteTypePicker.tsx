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
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';
import {fetchInterventionNoteType} from '../../../features/interventionNoteSlice';

interface InterventionNoteTypePickerProps {
  defaultValue?: string;
  onChange: (noteType: any) => void;
  isScrollViewContainer?: boolean;
}

const InterventionNoteTypePicker = ({
  defaultValue = null,
  onChange = () => {},
  isScrollViewContainer = false,
}: InterventionNoteTypePickerProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {interventionNoteTypeList} = useSelector(
    (state: any) => state.intervention_interventionNote,
  );

  useEffect(() => {
    dispatch((fetchInterventionNoteType as any)());
  }, [dispatch]);

  return (
    <Picker
      title={I18n.t('Intervention_Type')}
      listItems={interventionNoteTypeList}
      labelField="name"
      valueField="id"
      defaultValue={defaultValue}
      onValueChange={onChange}
      isValueItem
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

export default InterventionNoteTypePicker;
