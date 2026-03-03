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
  openFileInExternalApp,
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {NoteCard} from '../../atoms';
import {deleteInterventionNote} from '../../../features/interventionNoteSlice';

interface NoteContent {
  id: number;
  partner: any;
  metaFile: any;
  description: string;
  createdOn: string;
  updatedOn: string;
  createdBy: any;
  updatedBy: any;
}

interface NoteDetailCardProps {
  style?: any;
  note: NoteContent;
  canDelete?: boolean;
  canEdit?: boolean;
}

const NoteDetailCard = ({
  note,
  canDelete = true,
  canEdit = true,
}: NoteDetailCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const handleOpenFile = async () => {
    await openFileInExternalApp(
      {
        fileName: note.metaFile?.fileName,
        id: note.metaFile?.id,
        isMetaFile: true,
      },
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
  };

  return (
    <ActionCard
      translator={I18n.t}
      actionList={[
        {
          iconName: 'arrows-angle-expand',
          helper: I18n.t('Intervention_OpenFile'),
          large: true,
          onPress: handleOpenFile,
          hidden: !note.metaFile,
        },
        {
          iconName: canEdit ? 'pencil-fill' : 'file-earmark-text',
          helper: I18n.t('Intervention_Edit'),
          onPress: () =>
            navigation.navigate('InterventionNoteFormScreen', {
              noteId: note.id,
            }),
        },
        {
          iconName: 'trash3-fill',
          iconColor: Colors.errorColor.background,
          helper: I18n.t('Intervention_Delete'),
          onPress: () =>
            dispatch(
              (deleteInterventionNote as any)({
                interventionNoteId: note.id,
                deliveredPartnerId: note.partner.id,
              }),
            ),
          hidden: !canDelete,
        },
      ]}>
      <NoteCard {...note} />
    </ActionCard>
  );
};

export default NoteDetailCard;
