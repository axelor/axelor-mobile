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

import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {
  LabelText,
  TagList,
  checkNullString,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface DropdownTaskCharacteristicsProps {
  style?: any;
  projectTaskCategory?: any;
  projectTaskSection?: any;
  targetVersion?: any;
  taskDate?: string;
  taskEndDate?: string;
  taskDeadline?: string;
  projectTaskTagSet?: any;
}

const DropdownTaskCharacteristics = ({
  style,
  projectTaskCategory,
  projectTaskSection,
  targetVersion,
  taskDate,
  taskEndDate,
  taskDeadline,
  projectTaskTagSet,
}: DropdownTaskCharacteristicsProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const tagsList = useMemo(() => {
    return projectTaskTagSet?.map(tag => ({
      title: tag?.name,
      color: Colors[tag?.colorSelect],
    }));
  }, [projectTaskTagSet, Colors]);

  const renderLabelText = useCallback(
    (titleKey: string, value: string | number) => {
      if (!checkNullString(value)) {
        return (
          <LabelText
            title={`${I18n.t(titleKey)} :`}
            value={value}
            textSize={16}
          />
        );
      }
      return null;
    },
    [I18n],
  );

  return (
    <View style={style}>
      {renderLabelText('Project_Category', projectTaskCategory?.name)}
      {renderLabelText('Project_Section', projectTaskSection?.name)}
      {renderLabelText('Project_TargetVersion', targetVersion?.title)}
      {renderLabelText('Project_StartDate', taskDate)}
      {renderLabelText('Project_DueDate', taskEndDate)}
      {renderLabelText('Project_Deadline', taskDeadline)}
      <TagList title={I18n.t('Project_Tags')} tags={tagsList} />
    </View>
  );
};

export default DropdownTaskCharacteristics;
