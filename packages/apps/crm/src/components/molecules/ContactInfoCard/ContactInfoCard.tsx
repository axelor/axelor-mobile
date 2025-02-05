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

import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  checkNullString,
  Icon,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {clipboardProvider} from '@axelor/aos-mobile-core';
import ContactInfoAlert from './ContactInfoAlert';
import ContactInfoType from './contactInfoHelper';

interface ContactInfoCardProps {
  style?: any;
  headerIconName: string;
  title: string;
  contact: any;
  contactInfoType: number;
  isLead?: boolean;
  border?: boolean;
  styleBorder?: any;
  onPress?: () => any;
  onUpdate: (args: {id: number; version: number; data: Object}) => Promise<any>;
  refreshContactInfos: () => void;
}

const ContactInfoCard = ({
  style,
  headerIconName,
  title,
  contact,
  contactInfoType,
  isLead,
  border = false,
  styleBorder,
  onPress,
  onUpdate,
  refreshContactInfos,
}: ContactInfoCardProps) => {
  const Colors = useThemeColor();

  const [isVisible, setIsVisible] = useState(false);

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const contactInfo = useMemo(
    () => ContactInfoType.getContactInfo(contactInfoType, contact),
    [contact, contactInfoType],
  );

  if (contactInfo == null) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.container, style]}
        activeOpacity={0.9}
        onPress={onPress}>
        {!checkNullString(contactInfo.displayText) && (
          <View>
            <LabelText
              title={title}
              iconName={headerIconName}
              size={15}
              textStyle={styles.textTitle}
            />
            <View style={styles.containerBody}>
              <Text style={styles.text} fontSize={14}>
                {contactInfo.displayText}
              </Text>
              <View style={styles.iconContainer}>
                <Icon
                  style={styles.icon}
                  name="copy"
                  touchable={true}
                  onPress={() =>
                    clipboardProvider.copyToClipboard(contactInfo.displayText)
                  }
                />
                <Icon
                  style={styles.icon}
                  name="pencil-fill"
                  touchable={true}
                  onPress={() => setIsVisible(true)}
                />
              </View>
            </View>
            {border && <View style={[styles.borderBottom, styleBorder]} />}
          </View>
        )}
      </TouchableOpacity>
      <ContactInfoAlert
        title={title}
        contact={contact}
        contactInfoType={contactInfoType}
        isLead={isLead}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onUpdate={onUpdate}
        refreshContactInfos={refreshContactInfos}
      />
    </>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: '95%',
      marginHorizontal: 5,
    },
    textTitle: {
      fontSize: 14,
    },
    containerBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginTop: 4,
    },
    text: {
      flex: 1,
    },
    iconContainer: {
      flexDirection: 'row',
    },
    icon: {
      marginLeft: 4,
    },
    borderBottom: {
      width: '100%',
      borderBottomWidth: 1.5,
      borderBottomColor: Colors.secondaryColor.background,
      marginVertical: 8,
    },
  });

export default ContactInfoCard;
