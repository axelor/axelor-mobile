/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {useThemeColor, Icon, ObjectCard} from '@axelor/aos-mobile-ui';
import {
  openFileInExternalApp,
  useSelector,
  useTranslator,
  useBinaryImageUri,
} from '@axelor/aos-mobile-core';
import Catalog from '../../../types/catalog';

interface PartnerCardProps {
  style?: any;
  name: string;
  description: string;
  category: string;
  id: number;
  version: number;
  catalogueType?: any;
  allCatalogType?: any;
  pdfFile?: any;
}
const CatalogCard = ({
  style,
  name,
  description,
  category,
  id,
  version,
  catalogueType,
  allCatalogType,
  pdfFile,
}: PartnerCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatBinaryFile = useBinaryImageUri();

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const colorBadgeStyle = useMemo(() => {
    const colorIndex = allCatalogType?.findIndex(
      status => status.id === catalogueType?.id,
    );
    return Catalog.getStatusColor(colorIndex, Colors);
  }, [Colors, allCatalogType, catalogueType]);

  const handleShowFile = async () => {
    await openFileInExternalApp(
      {fileName: pdfFile?.fileName, id: pdfFile?.id, isMetaFile: true},
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
  };

  return (
    <ObjectCard
      onPress={handleShowFile}
      style={style}
      showArrow={false}
      image={{
        generalStyle: styles.imageIcon,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 70,
        source: formatBinaryFile(id, version, 'com.axelor.apps.crm.db.Catalog'),
      }}
      upperTexts={{
        items: [
          {displayText: name, isTitle: true},
          {displayText: description, hideIfNull: true},
        ],
      }}
      sideBadges={{
        items: [
          {
            displayText: category,
            color: colorBadgeStyle,
          },
        ],
      }}
      lowerBadges={{
        items: [
          {
            customComponent: <Icon name="box-arrow-up-right" size={10} />,
          },
        ],
        fixedOnRightSide: true,
      }}
    />
  );
};

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

export default CatalogCard;
