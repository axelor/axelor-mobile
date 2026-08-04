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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  ActionSheet,
  Badge,
  checkNullString,
  HtmlViewer,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  deleteTeamTask,
  updateTeamTaskStatus,
} from '../../../features/teamTaskSlice';

const MAX_DESCRIPTION_HEIGHT = Dimensions.get('window').height * 0.3;

interface TeamTaskActionSheetProps {
  task: any;
  visible: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

const TeamTaskActionSheet = ({
  task,
  visible,
  onClose,
  onRefresh,
}: TeamTaskActionSheetProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch: any = useDispatch();
  const {TeamTask} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();
  const {readonly, canDelete} = usePermitted({
    modelName: 'com.axelor.team.db.TeamTask',
  });

  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (!visible) setIsDeleteConfirmation(false);
  }, [visible]);

  const handleStatusChange = useCallback(
    (status: string) => {
      dispatch(
        updateTeamTaskStatus({
          id: task?.id,
          version: task?.version,
          status,
        }),
      ).then(() => onRefresh?.());
    },
    [dispatch, onRefresh, task?.id, task?.version],
  );

  const handleDelete = useCallback(() => {
    dispatch(deleteTeamTask({id: task?.id})).then(() => onRefresh?.());
  }, [dispatch, onRefresh, task?.id]);

  const actionList = useMemo(() => {
    if (isDeleteConfirmation) {
      return [
        {
          iconName: 'trash3-fill',
          iconColor: Colors.errorColor.background,
          helper: I18n.t('Team_ConfirmDeletion'),
          onPress: handleDelete,
        },
        {
          iconName: 'x-lg',
          helper: I18n.t('Base_Cancel'),
          onPress: () => setIsDeleteConfirmation(false),
          closeAfter: false,
        },
      ];
    }

    const isClosed = task?.status === TeamTask?.status.Closed;
    const isCanceled = task?.status === TeamTask?.status.Canceled;

    return [
      {
        iconName: 'pencil-fill',
        helper: I18n.t('Team_EditTask'),
        onPress: () =>
          navigation.navigate('TeamTaskDetailsScreen', {taskId: task?.id}),
        hidden: readonly,
      },
      {
        iconName: 'play-fill',
        helper: I18n.t('Team_StartTask'),
        onPress: () => handleStatusChange(TeamTask?.status.InProgress),
        hidden: readonly || task?.status !== TeamTask?.status.New,
      },
      {
        iconName: 'check-lg',
        iconColor: Colors.successColor.background,
        helper: I18n.t('Team_FinishTask'),
        onPress: () => handleStatusChange(TeamTask?.status.Closed),
        hidden: readonly || isClosed || isCanceled,
      },
      {
        iconName: 'arrow-counterclockwise',
        helper: I18n.t('Team_ReopenTask'),
        onPress: () => handleStatusChange(TeamTask?.status.New),
        hidden: readonly || (!isClosed && !isCanceled),
      },
      {
        iconName: 'slash-circle',
        iconColor: Colors.cautionColor.background,
        helper: I18n.t('Team_CancelTask'),
        onPress: () => handleStatusChange(TeamTask?.status.Canceled),
        hidden: readonly || isClosed || isCanceled,
      },
      {
        iconName: 'trash3-fill',
        iconColor: Colors.errorColor.background,
        helper: I18n.t('Team_DeleteTask'),
        onPress: () => setIsDeleteConfirmation(true),
        hidden: !canDelete,
        closeAfter: false,
      },
    ];
  }, [
    Colors,
    I18n,
    TeamTask?.status,
    canDelete,
    handleDelete,
    handleStatusChange,
    isDeleteConfirmation,
    navigation,
    readonly,
    task?.id,
    task?.status,
  ]);

  const renderRecap = useCallback(
    () => (
      <View style={styles.recap}>
        <View style={styles.rowWrapper}>
          <Text writingType="title" numberOfLines={2} style={styles.flex}>
            {task?.name}
          </Text>
          <View style={styles.badges}>
            {!checkNullString(task?.status) && (
              <Badge
                title={getItemTitle(TeamTask?.status, task?.status)}
                color={getItemColor(TeamTask?.status, task?.status)}
              />
            )}
            {!checkNullString(task?.priority) && (
              <Badge
                title={getItemTitle(TeamTask?.priority, task?.priority)}
                color={getItemColor(TeamTask?.priority, task?.priority)}
              />
            )}
          </View>
        </View>
        {!checkNullString(task?.description) && (
          <HtmlViewer
            html={task.description}
            maxHeight={MAX_DESCRIPTION_HEIGHT}
          />
        )}
      </View>
    ),
    [
      TeamTask?.priority,
      TeamTask?.status,
      getItemColor,
      getItemTitle,
      task?.description,
      task?.name,
      task?.priority,
      task?.status,
    ],
  );

  const renderDeleteConfirmation = useCallback(
    () => (
      <View style={styles.recap}>
        <Text writingType="title">{I18n.t('Team_DeleteTask')}</Text>
        <Text>{I18n.t('Team_DeleteTaskConfirmation')}</Text>
      </View>
    ),
    [I18n],
  );

  if (task == null) return null;

  return (
    <ActionSheet
      visible={visible}
      title={I18n.t('Team_TaskActions')}
      headerChildren={
        isDeleteConfirmation ? renderDeleteConfirmation() : renderRecap()
      }
      actionList={actionList}
      onClose={onClose}
    />
  );
};

const styles = StyleSheet.create({
  recap: {
    gap: 8,
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default TeamTaskActionSheet;
