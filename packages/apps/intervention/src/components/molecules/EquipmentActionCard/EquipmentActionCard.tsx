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
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useNavigation,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {EquipmentCard} from '../../atoms';
import {
  archiveEquipment,
  copyEquipment,
} from '../../../features/equipmentSlice';

interface EquipmentActionCardProps {
  idEquipment: number;
  equipmentVersion: number;
  sequence: string;
  name: string;
  code: string;
  equipmentFamily: string;
  inService: boolean;
  isUnlinkAction?: boolean;
  canCopy?: boolean;
  canEdit?: boolean;
  canArchive?: boolean;
  handleArchive?: () => void;
  handleUnlink?: () => void;
  handleDuplicate?: (equipmentId: number) => void;
}

const EquipmentActionCard = ({
  idEquipment,
  equipmentVersion,
  sequence,
  name,
  code,
  equipmentFamily,
  inService,
  isUnlinkAction = false,
  canCopy = true,
  canEdit = true,
  canArchive = true,
  handleArchive = () => {},
  handleUnlink,
  handleDuplicate,
}: EquipmentActionCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <ActionCard
      translator={I18n.t}
      actionList={[
        {
          iconName: 'x-lg',
          helper: I18n.t('Intervention_Unlink'),
          large: !canCopy,
          onPress: handleUnlink,
          hidden: !isUnlinkAction,
        },
        {
          iconName: 'front',
          helper: I18n.t('Intervention_Duplicate'),
          large: !isUnlinkAction,
          onPress: () =>
            (dispatch as any)(
              (copyEquipment as any)({
                equipmentId: idEquipment,
              }),
            ).then(({payload}) => {
              const equipmentId = payload?.id;
              if (equipmentId != null) {
                handleDuplicate != null
                  ? handleDuplicate(equipmentId)
                  : navigation.navigate('EquipmentFormView', {
                      idEquipment: equipmentId,
                      isCreation: true,
                    });
              }
            }),
          hidden: !canCopy,
        },
        {
          iconName: canEdit ? 'pencil-fill' : 'file-earmark-text',
          helper: I18n.t('Intervention_Edit'),
          onPress: () =>
            navigation.navigate('EquipmentFormView', {
              idEquipment,
            }),
        },
        {
          iconName: 'archive-fill',
          iconColor: Colors.errorColor.background,
          helper: I18n.t('Intervention_Archive'),
          onPress: () =>
            (dispatch as any)(
              (archiveEquipment as any)({
                equipmentId: idEquipment,
                equipmentVersion,
              }),
            ).then(() => handleArchive()),
          hidden: !canArchive,
        },
      ]}>
      <EquipmentCard
        sequence={sequence}
        name={name}
        code={code}
        equipmentFamily={equipmentFamily}
        inService={inService}
      />
    </ActionCard>
  );
};

export default EquipmentActionCard;
