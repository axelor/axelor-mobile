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

import React, {useEffect, useMemo} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {FormView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {QIFormButton} from '../../components';
import {
  fetchQualityImprovementById,
  updateSteps,
} from '../../features/qualityImprovementSlice';
import {fetchQiResolution} from '../../features/qiResolutionSlice';
import {QualityImprovement} from '../../types';

const QualityImprovementFormScreen = ({route}) => {
  const dispatch = useDispatch();
  const qualityImprovementId = route.params?.qualityImprovementId;

  const {qualityImprovement} = useSelector(
    (state: any) => state.quality_qualityImprovement,
  );

  const {qiResolution} = useSelector(
    (state: any) => state.quality_qiResolution,
  );

  const getDefaults = useMemo(() => {
    return (
      qiResolution?.qiResolutionDefaultsList?.map(item => ({
        id: item.id,
        name: item.name,
        qty: parseFloat(item.quantity ?? '1'),
        description: item.description,
      })) ?? []
    );
  }, [qiResolution]);

  const _defaultValue = useMemo(
    () =>
      qualityImprovementId != null
        ? {
            ...qualityImprovement,
            nonConformingQuantity:
              qualityImprovement?.qiIdentification?.nonConformingQuantity,
            product: qualityImprovement?.qiIdentification?.product,
            QIResolutionDefault: getDefaults,
          }
        : null,
    [getDefaults, qualityImprovement, qualityImprovementId],
  );

  useEffect(() => {
    dispatch(updateSteps(QualityImprovement.Steps.detection));
  }, [dispatch]);

  useEffect(() => {
    if (qualityImprovementId) {
      dispatch(
        (fetchQualityImprovementById as any)({id: qualityImprovementId}),
      );
    }
  }, [dispatch, qualityImprovementId]);

  useEffect(() => {
    if (qualityImprovementId && qualityImprovement) {
      dispatch(
        (fetchQiResolution as any)({id: qualityImprovement?.qiResolution?.id}),
      );
    }
  }, [
    dispatch,
    qualityImprovement,
    qualityImprovement?.qiResolution?.id,
    qualityImprovementId,
  ]);

  return (
    <Screen removeSpaceOnTop={true}>
      <FormView
        defaultValue={_defaultValue}
        formKey="quality_qualityImprovement"
        defaultEditMode
        floatingTools={false}
        actions={[
          {
            key: 'navigation-button',
            type: 'custom',
            customComponent: <QIFormButton />,
          },
        ]}
      />
    </Screen>
  );
};

export default QualityImprovementFormScreen;
