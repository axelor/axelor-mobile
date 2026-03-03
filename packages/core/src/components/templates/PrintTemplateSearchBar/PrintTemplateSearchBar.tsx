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
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchPrintingTemplate} from '../../../features/printTemplateSlice';
import {useTranslator} from '../../../i18n';
import {useDispatch, useSelector} from '../../../redux/hooks';
import {displayItemName} from '../../../utils';

interface PrintTemplateSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
  required?: boolean;
  readonly?: boolean;
  idList: number[];
}

const PrintTemplateSearchBar = ({
  style = null,
  title = 'Base_PrintTemplate',
  defaultValue = null,
  onChange = () => {},
  required = true,
  readonly = false,
  idList,
}: PrintTemplateSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {printTemplateList, loadingList, moreLoading, isListEnd} = useSelector(
    state => state.printTemplate,
  );

  const searchPrintTemplateAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchPrintingTemplate as any)({
          page,
          searchValue,
          idList: idList,
        }),
      );
    },
    [dispatch, idList],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={printTemplateList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchPrintTemplateAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      showDetailsPopup={true}
      loadingList={loadingList}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={false}
      oneFilter={false}
    />
  );
};

export default PrintTemplateSearchBar;
