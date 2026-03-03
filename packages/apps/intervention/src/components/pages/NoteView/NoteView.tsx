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

import React, {useMemo, useState} from 'react';
import {
  SearchListView,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {InterventionHeader, NoteDetailCard} from '../../molecules';
import {InterventionNoteTypePicker} from '../../organisms';
import {fetchInterventionNote} from '../../../features/interventionNoteSlice';

const NoteView = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {readonly, canCreate, canDelete} = usePermitted({
    modelName: 'com.axelor.apps.intervention.db.InterventionNote',
  });

  const [selectedNoteTypeId, setSelectedNoteTypeId] = useState(null);

  const {loading, moreLoading, isListEnd, interventionNoteList} = useSelector(
    (state: any) => state.intervention_interventionNote,
  );
  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );

  const sliceFunctionData = useMemo(
    () => ({
      deliveredPartnerId: intervention.deliveredPartner?.id,
      noteTypeId: selectedNoteTypeId,
    }),
    [intervention.deliveredPartner?.id, selectedNoteTypeId],
  );

  return (
    <SearchListView
      list={interventionNoteList}
      loading={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      sliceFunction={fetchInterventionNote}
      sliceFunctionData={sliceFunctionData}
      searchPlaceholder={I18n.t('Base_Search')}
      headerTopChildren={<InterventionHeader intervention={intervention} />}
      headerChildren={
        <InterventionNoteTypePicker
          onChange={noteType => setSelectedNoteTypeId(noteType?.id)}
        />
      }
      renderListItem={({item}) => (
        <NoteDetailCard note={item} canDelete={canDelete} canEdit={!readonly} />
      )}
      actionList={
        canCreate
          ? [
              {
                iconName: 'plus',
                title: I18n.t('Intervention_CreateNote'),
                onPress: () =>
                  navigation.navigate('InterventionNoteFormScreen'),
              },
            ]
          : []
      }
    />
  );
};

export default NoteView;
