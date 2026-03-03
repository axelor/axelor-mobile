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
  defaultValue?: any;
  onChange: (value?: any) => void;
  objectState?: any;
  required?: boolean;
  readonly?: boolean;
}

const QIDetectionSearchBarAux = ({
  style,
  title = 'Quality_Detection',
  defaultValue,
  onChange,
  objectState,
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

  const originFieldName = useMemo(() => {
    const type = objectState?.type;

    if (type === QualityImprovement.type.Product) {
      return 'isProductOrigin';
    } else if (type === QualityImprovement.type.System) {
      return 'isSystemOrigin';
    } else {
      return null;
    }
  }, [QualityImprovement.type, objectState?.type]);

  const detectionOrigin = useMemo(
    () => objectState?.detectionOrigin,
    [objectState?.detectionOrigin],
  );

  const searchQIDetectionAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchQIDetection as any)({
          page,
          searchValue,
          origin: originFieldName,
          detectionOrigin,
        }),
      );
    },
    [detectionOrigin, dispatch, originFieldName],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={QiDetectionList}
      loadingList={loadingQiDetections}
      moreLoading={moreLoadingQiDetection}
      isListEnd={isListEndQiDetection}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={searchQIDetectionAPI}
      displayValue={displayItemName}
      required={required}
      readonly={readonly}
      showDetailsPopup={true}
      navigate={false}
      oneFilter={false}
    />
  );
};

const QIDetectionSearchBar = (props: QIDetectionSearchBarProps) => {
  return <QIDetectionSearchBarAux {...props} />;
};

export default QIDetectionSearchBar;
