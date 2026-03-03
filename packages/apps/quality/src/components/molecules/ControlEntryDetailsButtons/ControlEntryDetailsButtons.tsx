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
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {updateControlEntry} from '../../../features/controlEntrySlice';

const ControlEntryDetailsButtons = () => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.quality.db.ControlEntry',
  });
  const {ControlEntry} = useTypes();

  const {controlEntry} = useSelector((state: any) => state.controlEntry);

  if (readonly) {
    return null;
  }

  return (
    <Button
      title={I18n.t('Quality_MarkAsCompleted')}
      onPress={() => {
        dispatch(
          (updateControlEntry as any)({
            controlEntry: {
              ...controlEntry,
              statusSelect: ControlEntry?.statusSelect.Completed,
            },
            controlEntryId: controlEntry.id,
          }),
        );
      }}
      iconName="check-lg"
    />
  );
};

export default ControlEntryDetailsButtons;
