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
import {searchQIAnalysisMethod} from '../../../features/qiAnalysisMethodSlice';

interface QIMethodAnalysisSearchBarProps {
  style?: any;
  title?: string;
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const QIMethodAnalysisSearchBarAux = ({
  style = null,
  title = 'Quality_QIMethodAnalysis',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: QIMethodAnalysisSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);

  const {
    qiAnalysisMethodList,
    loadingQiAnalysisMethods,
    moreLoadingQiAnalysisMethod,
    isListEndQiAnalysisMethod,
  } = useSelector((state: any) => state.quality_qiAnalysisMethod);
  const {QualityImprovement} = useTypes();

  const {typeForm, gravityForm} = useSelector(
    (state: any) => state.quality_qualityImprovement,
  );

  const origin = useMemo(() => {
    if (typeForm === QualityImprovement.type.Product) {
      return 'isProduct';
    } else if (typeForm === QualityImprovement.type.System) {
      return 'isSystem';
    } else {
      return null;
    }
  }, [QualityImprovement.type, typeForm]);

  const gravity = useMemo(() => {
    if (gravityForm === QualityImprovement.gravityTypeSelect.Critical) {
      return 'isCritical';
    } else if (gravityForm === QualityImprovement.gravityTypeSelect.Major) {
      return 'isMajor';
    } else {
      if (gravityForm === QualityImprovement.gravityTypeSelect.Minor) {
        return 'isMinor';
      } else {
        return null;
      }
    }
  }, [
    QualityImprovement.gravityTypeSelect.Critical,
    QualityImprovement.gravityTypeSelect.Major,
    QualityImprovement.gravityTypeSelect.Minor,
    gravityForm,
  ]);

  const searchQIAnalysisMethodAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        (searchQIAnalysisMethod as any)({
          page,
          searchValue,
          companyId: user.activeCompany?.id,
          origin: origin,
          gravity: gravity,
        }),
      );
    },
    [dispatch, gravity, origin, user.activeCompany?.id],
  );

  return (
    <AutoCompleteSearch
      style={style}
      title={I18n.t(title)}
      objectList={qiAnalysisMethodList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={searchQIAnalysisMethodAPI}
      displayValue={displayItemName}
      placeholder={title}
      showDetailsPopup={true}
      loadingList={loadingQiAnalysisMethods}
      moreLoading={moreLoadingQiAnalysisMethod}
      isListEnd={isListEndQiAnalysisMethod}
      navigate={false}
      oneFilter={false}
    />
  );
};

const QIMethodAnalysisSearchBar = ({
  style = null,
  title = 'Quality_QIDetection',
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: QIMethodAnalysisSearchBarProps) => {
  return (
    <QIMethodAnalysisSearchBarAux
      style={style}
      title={title}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default QIMethodAnalysisSearchBar;
