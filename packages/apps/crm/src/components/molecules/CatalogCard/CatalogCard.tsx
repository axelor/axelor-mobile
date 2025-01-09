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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Text,
  Image,
  Badge,
  useThemeColor,
  Icon,
} from '@axelor/aos-mobile-ui';
import {
  openFileInExternalApp,
  useSelector,
  useTranslator,
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
  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);
  const I18n = useTranslator();
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

  const styles = useMemo(() => getStyles(colorBadgeStyle), [colorBadgeStyle]);

  return (
    <TouchableOpacity onPress={handleShowFile} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.containerLeft}>
          <Image
            generalStyle={styles.imageIcon}
            imageSize={styles.imageSize}
            resizeMode="contain"
            defaultIconSize={70}
            source={{
              uri: `${baseUrl}ws/rest/com.axelor.apps.crm.db.Catalog/${id}/image/download?v=${version}&parentId=${id}&parentModel=com.axelor.apps.crm.db.Catalog&image=true`,
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.txtTitle}>{name}</Text>
            <Text>{description}</Text>
          </View>
        </View>
        <View>
          <Badge
            title={category}
            color={colorBadgeStyle}
            style={styles.badge}
          />
        </View>
        <Icon name="external-link-alt" size={10} style={styles.iconStyle} />
      </Card>
    </TouchableOpacity>
  );
};
const getStyles = colorBadgeStyle =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    imageIcon: {
      height: 50,
      width: 50,
    },
    imageSize: {
      height: 50,
      width: 50,
    },
    txtTitle: {
      fontWeight: 'bold',
    },
    containerLeft: {
      flexDirection: 'row',
    },
    textContainer: {
      flexDirection: 'column',
      marginLeft: '10%',
    },
    badge: {
      backgroundColor: colorBadgeStyle?.background_light,
      borderColor: colorBadgeStyle?.background,
      borderWidth: 2,
      borderRadius: 7,
      margin: '1%',
      width: 87,
      height: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconStyle: {
      position: 'absolute',
      right: '5%',
      bottom: '10%',
    },
  });

export default CatalogCard;
