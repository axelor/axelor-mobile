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

import React from 'react';
import {StyleSheet} from 'react-native';
import {NumberBubble, ToggleSwitch, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {QualityImprovementLineType} from '../../atoms/QualityImprovementLineCard/QualityImprovementLineCard';

interface QualityImprovementLineTypeSwitchProps {
  mode: QualityImprovementLineType;
  onChange: (mode: QualityImprovementLineType) => void;
  defectCount: number;
  decisionCount: number;
}

/* Defects | Decisions switch with counts, same pattern as ExpenseLineTypeSwitch. */
const QualityImprovementLineTypeSwitch = ({
  mode,
  onChange,
  defectCount,
  decisionCount,
}: QualityImprovementLineTypeSwitchProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <ToggleSwitch
      styleContainer={styles.toggleContainer}
      styleToogle={styles.toggleElt}
      leftTitle={I18n.t('Quality_Defects')}
      rightTitle={I18n.t('Quality_Decisions')}
      leftElement={
        <NumberBubble
          style={styles.indicator}
          size={25}
          number={defectCount}
          color={Colors.inverseColor}
          isNeutralBackground
        />
      }
      rigthElement={
        <NumberBubble
          style={styles.indicator}
          size={25}
          number={decisionCount}
          color={Colors.inverseColor}
          isNeutralBackground
        />
      }
      onSwitch={() => onChange(mode === 'defect' ? 'decision' : 'defect')}
    />
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    /* No flex: 1 here (unlike ExpenseLineTypeSwitch, which sits in a row):
       in the header column it collapses the switch over the rows above. */
    marginHorizontal: 24,
  },
  toggleElt: {
    paddingVertical: 6,
  },
  indicator: {
    marginLeft: 5,
  },
});

export default QualityImprovementLineTypeSwitch;
