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
import {useTranslator} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';

interface CompleteRequestButtonsProps {
  leaveQty: number;
  hasNewLine: boolean;
  hasLines: boolean;
  isFinishDisabled: boolean;
  onAddPress: () => void;
  onFinishPress: () => void;
}

const CompleteRequestButtons = ({
  leaveQty,
  hasNewLine,
  hasLines,
  isFinishDisabled,
  onAddPress,
  onFinishPress,
}: CompleteRequestButtonsProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  if (hasNewLine) {
    return (
      <Button
        title={I18n.t('Base_Add')}
        iconName="plus-lg"
        color={Colors.progressColor}
        width="90%"
        disabled={leaveQty === 0}
        onPress={onAddPress}
      />
    );
  }

  if (hasLines) {
    return (
      <Button
        title={I18n.t('Base_Finish')}
        iconName="check-lg"
        width="90%"
        disabled={isFinishDisabled}
        onPress={onFinishPress}
      />
    );
  }

  return null;
};

export default CompleteRequestButtons;
