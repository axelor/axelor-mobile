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

import React, {useMemo} from 'react';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {
  useNavigation,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {QualityImprovementCard} from '../../atoms';

const FIRST_STATUS_SEQUENCE = 1;

interface QualityImprovement {
  id: number;
  sequence: string;
  qiDetection: any;
  qiStatus: any;
  gravityTypeSelect?: number;
}

interface QualityImprovementActionCardProps {
  style?: any;
  qualityImprovement: QualityImprovement;
  onPress?: () => void;
}

const QualityImprovementActionCard = ({
  style,
  qualityImprovement,
  onPress,
}: QualityImprovementActionCardProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.quality.db.QualityImprovement',
  });

  const isEditable = useMemo(
    () =>
      !readonly &&
      qualityImprovement.qiStatus?.sequence === FIRST_STATUS_SEQUENCE,
    [qualityImprovement.qiStatus?.sequence, readonly],
  );

  return (
    <ActionCard
      style={style}
      actionList={[
        {
          iconName: 'pencil-fill',
          helper: I18n.t('Quality_EditImprovement'),
          onPress: () =>
            navigation.navigate('QualityImprovementFormScreen', {
              qualityImprovementId: qualityImprovement.id,
            }),
          hidden: !isEditable,
        },
      ]}
      translator={I18n.t}>
      <QualityImprovementCard
        onPress={onPress}
        sequence={qualityImprovement.sequence}
        qiDetection={qualityImprovement.qiDetection?.name}
        status={qualityImprovement.qiStatus}
        gravityTypeSelect={qualityImprovement.gravityTypeSelect}
      />
    </ActionCard>
  );
};

export default QualityImprovementActionCard;
