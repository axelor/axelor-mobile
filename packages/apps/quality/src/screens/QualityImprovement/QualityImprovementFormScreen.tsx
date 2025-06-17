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
  fetchQualityImprovement,
  updateSteps,
} from '../../features/qualityImprovementSlice';
import {QualityImprovement} from '../../types';

const QualityImprovementFormScreen = ({route}) => {
  const {qualityImprovementId: qiId} = route.params ?? {};
  const dispatch = useDispatch();

  const {qualityImprovement} = useSelector(
    state => state.quality_qualityImprovement,
  );

  useEffect(() => {
    dispatch(updateSteps(QualityImprovement.Steps.detection));
  }, [dispatch]);

  useEffect(() => {
    if (qiId) {
      dispatch((fetchQualityImprovement as any)({id: qiId}));
    }
  }, [dispatch, qiId]);

  const _defaultValue = useMemo(() => {
    if (!qiId || qualityImprovement?.id !== qiId) {
      return {stepper: QualityImprovement.Steps.detection};
    }

    const {qiIdentification, qiResolution} = qualityImprovement;

    return {
      stepper: QualityImprovement.Steps.detection,
      ...qiIdentification,
      ...qualityImprovement,
      qiResolutionDefaults:
        qiResolution?.qiResolutionDefaultsList?.map(item => ({
          ...item,
          qty: parseFloat(item.quantity ?? '1'),
        })) ?? [],
    };
  }, [qualityImprovement, qiId]);

  return (
    <Screen>
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
