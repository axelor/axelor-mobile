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
import {Icon, IconInput} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';

interface SessionNameInputProps {
  style?: any;
  value?: string;
  onChange?: (_v?: string) => void;
  readOnly?: boolean;
  showRequiredFields?: boolean;
  hidden?: boolean;
}

const SessionNameInput = ({
  style,
  value,
  onChange,
  readOnly = false,
  showRequiredFields = false,
  hidden = false,
}: SessionNameInputProps) => {
  const I18n = useTranslator();

  if (hidden) return null;

  return (
    <IconInput
      style={style}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={showRequiredFields}
      placeholder={I18n.t('Base_Connection_SessionName')}
      leftIconsList={[<Icon name="tag-fill" size={14} />]}
    />
  );
};

export default SessionNameInput;
