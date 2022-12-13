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
} from '@aos-mobile/ui';
import {useSelector} from '@aos-mobile/core';
import Lead from '../../../types/lead';

interface CrmLeadsCardProps {
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
}
const CrmLeadsCard = ({
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
}: CrmLeadsCardProps) => {
  const Colors = useThemeColor();
  const {baseUrl} = useSelector((state: any) => state.auth);

  const borderStyle = useMemo(() => {
    const colorIndex = allLeadStatus?.findIndex(
      status => status.id === leadsStatus.id,
    );
    return getStyles(Lead.getStatusColor(colorIndex, Colors).background)
      ?.border;
  }, [Colors, allLeadStatus, leadsStatus.id]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, borderStyle, style]}>
        <StarScore
          style={styles.leadScoring}
          score={leadScoring}
          showMissingStar={true}
        />
        <Image
          generalStyle={styles.imageIcon}
          imageSize={styles.imageSize}
          resizeMode="contain"
          defaultIconSize={70}
          source={{
            uri: `${baseUrl}ws/rest/com.axelor.apps.crm.db.Lead/${leadsId}/picture/download?v=${leadVersion}&parentId=${leadsId}&parentModel=com.axelor.apps.crm.db.Lead&image=true`,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.txtImportant}>{leadsFullname}</Text>
          <LabelText iconName="building" title={leadsCompany} />
          {leadsAddress !== null ? (
            <LabelText iconName="map-marker-alt" title={leadsAddress} />
          ) : null}
          {leadsPhoneNumber !== null ? (
            <LabelText
              iconName="mobile-phone"
              title={leadsPhoneNumber}
              FontAwesome5={false}
              size={18}
            />
          ) : null}
          {leadsFixedPhone !== null ? (
            <LabelText iconName="phone" title={leadsFixedPhone} />
          ) : null}
          <LabelText iconName="envelope" title={leadsEmail} />
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
    border: {borderLeftWidth: 7, borderLeftColor: color},
  });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
  },
  leadScoring: {
    position: 'absolute',
    flexDirection: 'row',
    top: '10%',
    left: '5%',
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
  imageIcon: {
    height: 80,
    width: 80,
  },
  imageSize: {
    height: 80,
    width: 80,
  },
});

export default CrmLeadsCard;
