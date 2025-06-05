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
import {fetchQualityImprovementById} from '../../features/qualityImprovementSlice';

const QualityImprovementFormScreen = ({route}) => {
  const dispatch = useDispatch();
  const qualityImprovementId = route.params?.qualityImprovementId;

  const {qualityImprovement} = useSelector(
    (state: any) => state.quality_qualityImprovement,
  );

  const _defaultValue = useMemo(
    () =>
      qualityImprovementId != null
        ? {
            ...qualityImprovement,
          }
        : null,
    [qualityImprovement, qualityImprovementId],
  );

  useEffect(() => {
    if (qualityImprovementId) {
      dispatch(
        (fetchQualityImprovementById as any)({id: qualityImprovementId}),
      );
    }
  }, [dispatch, qualityImprovementId]);

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
