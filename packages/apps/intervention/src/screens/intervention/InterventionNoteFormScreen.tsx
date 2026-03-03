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

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {FormView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {HeaderContainer, Screen} from '@axelor/aos-mobile-ui';
import {InterventionHeader} from '../../components';
import {
  createInterventionNote,
  fetchInterventionNoteById,
  updateInterventionNote,
} from '../../features/interventionNoteSlice';

const InterventionNoteFormScreen = ({route, navigation}) => {
  const noteId = route?.params?.noteId;
  const dispatch: any = useDispatch();

  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );
  const {interventionNote} = useSelector(
    (state: any) => state.intervention_interventionNote,
  );

  useEffect(() => {
    noteId &&
      dispatch(
        (fetchInterventionNoteById as any)({interventionNoteId: noteId}),
      );
  }, [dispatch, noteId]);

  const defaultValue = useMemo(
    () => (noteId ? interventionNote : null),
    [interventionNote, noteId],
  );

  const creationDefaultValue = useMemo(
    () => ({
      partner: intervention?.deliveredPartner,
    }),
    [intervention?.deliveredPartner],
  );

  const interventionNoteAPI = useCallback(
    objectState => {
      const sliceFunction = noteId
        ? updateInterventionNote
        : createInterventionNote;

      dispatch(
        (sliceFunction as any)({
          interventionNote: objectState,
          deliveredPartnerId: intervention?.deliveredPartner?.id,
        }),
      ).then(() => navigation.pop());
    },
    [dispatch, intervention?.deliveredPartner, navigation, noteId],
  );

  if (noteId && noteId !== interventionNote.id) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        style={styles.headerContainer}
        expandableFilter={false}
        fixedItems={<InterventionHeader intervention={intervention} />}
      />
      <FormView
        formKey="intervention_interventionNote"
        defaultValue={defaultValue}
        creationDefaultValue={creationDefaultValue}
        defaultEditMode={noteId == null}
        actions={[
          {
            key: 'create-interventionNote',
            type: 'create',
            needValidation: true,
            needRequiredFields: true,
            hideIf: () => noteId,
            customAction: ({objectState}) => {
              interventionNoteAPI(objectState);
            },
          },
          {
            key: 'update-interventionNote',
            type: 'update',
            needValidation: true,
            needRequiredFields: true,
            hideIf: () => !noteId,
            customAction: ({objectState}) => {
              interventionNoteAPI(objectState);
            },
          },
        ]}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 10,
  },
});

export default InterventionNoteFormScreen;
