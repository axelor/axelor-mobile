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

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {HorizontalRule} from '@axelor/aos-mobile-ui';
import {CustomFieldForm, usePermitted} from '@axelor/aos-mobile-core';
import {CustomFieldPopup, SectionHeader} from '../../molecules';

const CustomSection = ({
  titleKey,
  fieldType,
  visible = true,
  modelId,
  refreshKey,
  onRefresh,
}: {
  titleKey: string;
  fieldType: string;
  visible?: boolean;
  modelId: number;
  refreshKey: number;
  onRefresh: () => void;
}) => {
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.project.db.ProjectTask',
  });

  const [expanded, setExpanded] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);

  if (!visible) {
    return null;
  }

  return (
    <>
      <SectionHeader
        titleKey={titleKey}
        expanded={expanded}
        onPress={() => setExpanded(_current => !_current)}
        onEdit={() => setAlertVisible(true)}
        showEdit={!readonly}
      />
      {expanded && (
        <>
          <CustomFieldForm
            model="com.axelor.apps.project.db.ProjectTask"
            fieldType={fieldType}
            modelId={modelId}
            style={styles.form}
            readonly
            key={refreshKey}
          />
          <HorizontalRule style={styles.horizontalRule} />
        </>
      )}
      <CustomFieldPopup
        titleKey={titleKey}
        fieldType={fieldType}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        onSave={onRefresh}
        projectTaskId={modelId}
      />
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  horizontalRule: {
    marginVertical: 12,
    width: '90%',
    alignSelf: 'center',
  },
});

export default CustomSection;
