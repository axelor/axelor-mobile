/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {Alert} from '@axelor/aos-mobile-ui';
import {CustomFieldForm} from '@axelor/aos-mobile-core';

interface CustomFieldPopupProps {
  onClose: () => void;
  translator?: (key: string) => string;
  editingParams: any;
  projectTaskId: number;
}

const CustomFieldPopup = ({
  onClose,
  translator = key => key,
  editingParams,
  projectTaskId,
}: CustomFieldPopupProps) => {
  return (
    <Alert
      visible={editingParams !== null}
      title={editingParams?.title}
      translator={translator}
      cancelButtonConfig={{
        onPress: onClose,
        showInHeader: true,
      }}>
      {editingParams && (
        <View style={styles.popupContainer}>
          <View style={styles.popupChildren}>
            <CustomFieldForm
              model="com.axelor.apps.project.db.ProjectTask"
              fieldType={editingParams.fieldType}
              modelId={projectTaskId}
              readonly={false}
              hideBackgroundForm={true}
              hideBackgroundButton={true}
              additionalActions={[
                {
                  key: 'validateChanges',
                  type: 'update',
                  useDefaultAction: true,
                  readonlyAfterAction: true,
                  postActions: onClose,
                },
              ]}
            />
          </View>
        </View>
      )}
    </Alert>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: -50,
  },
  popupChildren: {
    height: '80%',
  },
});

export default CustomFieldPopup;
