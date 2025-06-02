/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchQIDetection} from '../../../features/qiDetectionSlice';

interface QIDetectionSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const QIDetectionSearchBarAux = ({
  style = null,
  title = 'Quality_QIDetection',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: QIDetectionSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {QualityImprovement} = useTypes();

  const {
    QiDetectionList,
    loadingQiDetections,
    moreLoadingQiDetection,
    isListEndQiDetection,
  } = useSelector((state: any) => state.quality_qiDetection);

  const {typeForm} = useSelector(
    (state: any) => state.quality_qualityImprovement,
  );

  const origin = useMemo(() => {
    if (typeForm === QualityImprovement.type.Product) {
      return 'isProductOrigin';
    } else if (typeForm === QualityImprovement.type.System) {
      return 'isSystemOrigin';
    } else {
      return null;
    }
  }, [QualityImprovement.type, typeForm]);

  const searchQIDetectionAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchQIDetection as any)({
          page,
          searchValue,
          origin: origin,
        }),
      );
    },
    [dispatch, origin],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={QiDetectionList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchQIDetectionAPI}
      displayValue={displayItemName}
      placeholder={title}
      showDetailsPopup={true}
      loadingList={loadingQiDetections}
      moreLoading={moreLoadingQiDetection}
      isListEnd={isListEndQiDetection}
      navigate={false}
      oneFilter={false}
    />
  );
};

const QIDetectionSearchBar = ({
  style = null,
  title = 'Quality_QIDetection',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: QIDetectionSearchBarProps) => {
  return (
    <QIDetectionSearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default QIDetectionSearchBar;
