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
import {StyleSheet, View} from 'react-native';
import {CustomFieldForm, useTranslator} from '@axelor/aos-mobile-core';
import {Alert} from '@axelor/aos-mobile-ui';

interface CustomFieldPopupProps {
  visible: boolean;
  titleKey: string;
  fieldType: string;
  onClose: () => void;
  onSave: () => void;
  projectTaskId: number;
}

const CustomFieldPopup = ({
  visible,
  titleKey,
  fieldType,
  onClose,
  onSave,
  projectTaskId,
}: CustomFieldPopupProps) => {
  const I18n = useTranslator();

  return (
    <Alert
      visible={visible}
      style={styles.container}
      title={I18n.t(titleKey)}
      translator={I18n.t}
      cancelButtonConfig={{
        onPress: onClose,
        showInHeader: true,
      }}>
      <View style={styles.content}>
        <CustomFieldForm
          model="com.axelor.apps.project.db.ProjectTask"
          fieldType={fieldType}
          modelId={projectTaskId}
          readonly={false}
          hideFormBackground={true}
          hideButtonBackground={true}
          additionalActions={[
            {
              key: 'validateChanges',
              type: 'update',
              useDefaultAction: true,
              readonlyAfterAction: true,
              postActions: () => {
                onSave();
                onClose();
              },
            },
          ]}
        />
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    height: '80%',
  },
});

export default CustomFieldPopup;
