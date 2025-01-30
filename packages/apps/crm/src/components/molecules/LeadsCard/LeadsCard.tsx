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
  Icon,
  LabelText,
  Text,
  useThemeColor,
  Image,
  StarScore,
  checkNullString,
} from '@axelor/aos-mobile-ui';
import {useSelector} from '@axelor/aos-mobile-core';
import Lead from '../../../types/lead';

interface LeadsCardProps {
  style?: any;
  leadsFullname: string;
  leadsCompany: string;
  leadsAddress: string;
  leadsPhoneNumber: string;
  leadsFixedPhone: string;
  leadsEmail: string;
  leadScoring: number;
  leadVersion: string | number;
  leadsId: string | number;
  allLeadStatus?: any;
  leadsStatus?: any;
  onPress: () => void;
  isDoNotSendEmail: boolean;
  isDoNotCall: boolean;
}
const LeadsCard = ({
  style,
  leadsFullname,
  leadsCompany,
  leadsAddress,
  leadsPhoneNumber,
  leadsFixedPhone,
  leadsEmail,
  leadScoring,
  leadVersion,
  leadsId,
  allLeadStatus,
  leadsStatus,
  onPress,
  isDoNotSendEmail,
  isDoNotCall,
}: LeadsCardProps) => {
  const Colors = useThemeColor();

  const {baseUrl} = useSelector((state: any) => state.auth);

  const borderStyle = useMemo(() => {
    const colorIndex = allLeadStatus?.findIndex(
      status => status.id === leadsStatus?.id,
    );
    return getStyles(Lead.getStatusColor(colorIndex, Colors)?.background)
      ?.border;
  }, [Colors, allLeadStatus, leadsStatus?.id]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <View style={styles.leftContainer}>
          <StarScore score={leadScoring} showMissingStar={true} />
          <Image
            generalStyle={styles.imageSize}
            imageSize={styles.imageSize}
            resizeMode="contain"
            defaultIconSize={70}
            source={{
              uri: `${baseUrl}ws/rest/com.axelor.apps.crm.db.Lead/${leadsId}/picture/download?v=${leadVersion}&parentId=${leadsId}&parentModel=com.axelor.apps.crm.db.Lead&image=true`,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{leadsFullname}</Text>
          {!checkNullString(leadsCompany) && (
            <LabelText iconName="building" title={leadsCompany} />
          )}
          {!checkNullString(leadsAddress) && (
            <LabelText iconName="map-marker-alt" title={leadsAddress} />
          )}
          {!checkNullString(leadsPhoneNumber) && (
            <LabelText
              iconName={isDoNotCall ? 'phone-slash' : 'mobile-phone'}
              title={leadsPhoneNumber}
              FontAwesome5={isDoNotCall}
              color={isDoNotCall ? 'red' : null}
              textStyle={isDoNotCall ? styles.txtRed : null}
              size={isDoNotCall ? null : 18}
            />
          )}
          {!checkNullString(leadsFixedPhone) && (
            <LabelText
              iconName={isDoNotCall ? 'phone-slash' : 'phone'}
              title={leadsFixedPhone}
              color={isDoNotCall ? 'red' : null}
              textStyle={isDoNotCall ? styles.txtRed : null}
            />
          )}
          {!checkNullString(leadsEmail) && (
            <LabelText
              iconName={isDoNotSendEmail ? 'user-alt-slash' : 'envelope'}
              title={leadsEmail}
              color={isDoNotSendEmail ? 'red' : null}
              textStyle={isDoNotSendEmail ? styles.txtRed : null}
            />
          )}
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor.background_light}
          size={20}
        />
      </Card>
    </TouchableOpacity>
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  leftContainer: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageSize: {
    height: 80,
    width: 80,
  },
  txtRed: {
    color: 'red',
  },
});

export default LeadsCard;
