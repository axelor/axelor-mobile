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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useMetafileUri, useSelector} from '@axelor/aos-mobile-core';
import {ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {Project} from '../../../types';

interface ProjectCardProps {
  style?: any;
  onPress: () => void;
  customerPicture: any;
  customerName: string;
  name: string;
  code: string;
  company: string;
  assignedTo: string;
  projectStatus: number;
  parentProject: string;
}

const ProjectCard = ({
  style,
  onPress,
  customerPicture,
  name,
  code,
  customerName,
  company,
  assignedTo,
  projectStatus,
  parentProject,
}: ProjectCardProps) => {
  const Colors = useThemeColor();
  const formatMetaFile = useMetafileUri();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);

  const borderStyle = useMemo(() => {
    return getStyles(Project.getStatusColor(projectStatus, Colors)?.background)
      .border;
  }, [Colors, projectStatus]);

  const noCustomer = useMemo(() => {
    return customerName == null && customerPicture == null;
  }, [customerName, customerPicture]);

  return (
    <ObjectCard
      onPress={onPress}
      style={[borderStyle, style]}
      image={
        !noCustomer
          ? {
              generalStyle: styles.imageIcon,
              imageSize: styles.imageSize,
              resizeMode: 'contain',
              defaultIconSize: 50,
              source: formatMetaFile(customerPicture?.id),
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
            indicatorText: customerName,
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
            indicatorText: 'partnerFixedPhone',
            hideIfNull: true,
            iconName: 'telephone-fill',
          },
          {
            indicatorText: 'partnerEmail',
            hideIfNull: true,
            iconName: 'envelope-fill',
          },
          {
            indicatorText: parentProject,
            hideIfNull: true,
            iconName: 'diagram-3-fill',
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  imageIcon: {
    height: 50,
    width: 50,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
});

export default ProjectCard;
