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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useFileApi, useTranslator} from '@axelor/aos-mobile-core';
import {ActionCardType, ActionSheet} from '@axelor/aos-mobile-ui';
import {useDocumentActions} from '../../../providers';
import {DocumentCard} from '../../atoms';

interface Action extends ActionCardType {
  key?: string;
  closeAfter?: boolean;
}

interface DocumentActionCardProps {
  document: any;
  handleRefresh?: () => void;
  customOnPress?: () => void;
  disableActions?: boolean;
  disabledActionKeys?: string[];
}

const DocumentActionCard = ({
  document,
  handleRefresh,
  customOnPress,
  disableActions = false,
  disabledActionKeys,
}: DocumentActionCardProps) => {
  const I18n = useTranslator();
  const fileApi = useFileApi();
  const {getLeafActions} = useDocumentActions();

  const [isActionsVisible, setIsActionsVisible] = useState(false);

  const handleOpenFile = useCallback(async () => {
    await fileApi.openInExternalApp({
      id: document.metaFile?.id,
      fileName: document.metaFile?.fileName,
    });
  }, [fileApi, document]);

  const actionList = useMemo<Action[]>(() => {
    const providerActions: Action[] = disableActions
      ? []
      : (getLeafActions(document, {handleRefresh})?.filter(
          _action =>
            _action.key == null || !disabledActionKeys?.includes(_action.key),
        ) ?? []);

    return [
      {
        iconName: 'eye-fill',
        helper: I18n.t('Dms_Open'),
        onPress: handleOpenFile,
      },
      ...providerActions,
    ];
  }, [
    I18n,
    handleOpenFile,
    disableActions,
    disabledActionKeys,
    getLeafActions,
    document,
    handleRefresh,
  ]);

  const visibleActions = useMemo(
    () => actionList.filter(action => !action.hidden),
    [actionList],
  );

  const handleCardPress = useCallback(() => {
    if (customOnPress != null) {
      customOnPress?.();
    } else if (visibleActions.length > 1) {
      setIsActionsVisible(true);
    } else {
      visibleActions[0]?.onPress();
    }
  }, [customOnPress, visibleActions]);

  return (
    <>
      <DocumentCard
        style={styles.container}
        document={document}
        customOnPress={handleCardPress}
      />
      <ActionSheet
        visible={isActionsVisible}
        title={document.fileName}
        actionList={visibleActions}
        onClose={() => setIsActionsVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 2,
  },
});

export default DocumentActionCard;
