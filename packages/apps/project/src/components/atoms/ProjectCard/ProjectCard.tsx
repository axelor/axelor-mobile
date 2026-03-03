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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  useMetafileUri,
  useSelector,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {Icon, ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';

interface ProjectCardProps {
  style?: any;
  onPress: () => void;
  customer: any;
  name: string;
  code: string;
  company: string;
  assignedTo: string;
  projectStatus: any;
  parentProject: string;
  isCopyCard?: boolean;
}

const ProjectCard = ({
  style,
  onPress,
  customer,
  name,
  code,
  company,
  assignedTo,
  projectStatus,
  parentProject,
  isCopyCard = false,
}: ProjectCardProps) => {
  const Colors = useThemeColor();
  const formatMetaFile = useMetafileUri();
  const {getItemColorFromIndex} = useTypeHelpers();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);
  const {projectStatusList} = useSelector(state => state.project_project);

  const borderStyle = useMemo(() => {
    return (
      projectStatus != null &&
      getStyles(
        getItemColorFromIndex(projectStatusList, projectStatus)?.background,
      )?.border
    );
  }, [getItemColorFromIndex, projectStatus, projectStatusList]);

  const isCustomerLinked = useMemo(() => customer?.id != null, [customer]);

  return (
    <ObjectCard
      onPress={onPress}
      style={[borderStyle, style]}
      showArrow={!isCopyCard}
      leftContainerFlex={9}
      image={
        isCustomerLinked
          ? {
              generalStyle: styles.imageSize,
              imageSize: styles.imageSize,
              resizeMode: 'contain',
              defaultIconSize: 50,
              source: formatMetaFile(customer?.picture?.id),
            }
          : null
      }
      upperTexts={{
        items: [
          {displayText: name, isTitle: true},
          {
            displayText: code,
            hideIfNull: true,
          },
          {
            indicatorText: customer?.name,
            hideIfNull: true,
            iconName: 'person-fill',
          },
        ],
      }}
      lowerTexts={{
        items: [
          {
            indicatorText: company,
            hideIfNull: true,
            hideIf:
              !baseConfig?.enableMultiCompany || user?.companySet?.length <= 1,
            iconName: 'building-fill',
          },
          {
            indicatorText: assignedTo,
            hideIfNull: true,
            iconName: 'pin-angle-fill',
          },
          {
            indicatorText: parentProject,
            hideIfNull: true,
            iconName: 'diagram-3-fill',
            numberOfLines: 2,
          },
        ],
      }}
      sideBadges={{
        style: styles.badges,
        items: [
          isCopyCard && {
            customComponent: (
              <Icon name="copy" color={Colors.secondaryColor.background} />
            ),
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  imageSize: {
    height: 50,
    width: 50,
  },
  badges: {
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
  },
});

export default ProjectCard;
