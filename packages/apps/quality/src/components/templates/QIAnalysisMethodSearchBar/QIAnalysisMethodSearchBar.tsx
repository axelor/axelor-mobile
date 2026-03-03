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
import {searchQIAnalysisMethod} from '../../../features/qiAnalysisMethodSlice';

interface QIAnalysisMethodSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: (value?: any) => void;
  objectState?: any;
  required?: boolean;
  readonly?: boolean;
}

const QIAnalysisMethodSearchBarAux = ({
  style,
  title = 'Quality_AnalysisMethod',
  defaultValue,
  onChange,
  objectState,
  readonly = false,
  required = false,
}: QIAnalysisMethodSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {QualityImprovement} = useTypes();

  const {user} = useSelector(state => state.user);
  const {
    qiAnalysisMethodList,
    loadingQiAnalysisMethods,
    moreLoadingQiAnalysisMethod,
    isListEndQiAnalysisMethod,
  } = useSelector((state: any) => state.quality_qiAnalysisMethod);

  const gravityFieldName = useMemo(() => {
    const gravity = objectState?.gravityTypeSelect;

    if (gravity === QualityImprovement.gravityTypeSelect.Critical) {
      return 'isCritical';
    } else if (gravity === QualityImprovement.gravityTypeSelect.Major) {
      return 'isMajor';
    } else if (gravity === QualityImprovement.gravityTypeSelect.Minor) {
      return 'isMinor';
    } else {
      return null;
    }
  }, [QualityImprovement.gravityTypeSelect, objectState?.gravityTypeSelect]);

  const originFieldName = useMemo(() => {
    const type = objectState?.type;

    if (type === QualityImprovement.type.Product) {
      return 'isProduct';
    } else if (type === QualityImprovement.type.System) {
      return 'isSystem';
    } else {
      return null;
    }
  }, [QualityImprovement.type, objectState?.type]);

  const searchQIAnalysisMethodAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchQIAnalysisMethod as any)({
          page,
          searchValue,
          companyId: user.activeCompany?.id,
          origin: originFieldName,
          gravity: gravityFieldName,
        }),
      );
    },
    [dispatch, gravityFieldName, originFieldName, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      placeholder={I18n.t(title)}
      objectList={qiAnalysisMethodList}
      loadingList={loadingQiAnalysisMethods}
      moreLoading={moreLoadingQiAnalysisMethod}
      isListEnd={isListEndQiAnalysisMethod}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={searchQIAnalysisMethodAPI}
      displayValue={displayItemName}
      required={required}
      readonly={readonly}
      showDetailsPopup={true}
      navigate={false}
      oneFilter={false}
    />
  );
};

const QIAnalysisMethodSearchBar = (props: QIAnalysisMethodSearchBarProps) => {
  return <QIAnalysisMethodSearchBarAux {...props} />;
};

export default QIAnalysisMethodSearchBar;
