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
  rightIconName: string;
  border?: boolean;
  styleBorder?: any;
  rightIconAction?: () => any;
  onUpdate: (args: {id: number; version: number; data: Object}) => void;
  refreshContactInfos: () => void;
}

const ContactInfoCard = ({
  style,
  headerIconName,
  title,
  contact,
  contactInfoType,
  isLead,
  rightIconName,
  border = false,
  styleBorder,
  rightIconAction,
  onUpdate,
  refreshContactInfos,
}: ContactInfoCardProps) => {
  const Colors = useThemeColor();

  const [isVisible, setIsVisible] = useState(false);

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  const contactInfo = useMemo(
    () => ContactInfoType.getContactInfo(contactInfoType, contact, isLead),
    [contact, contactInfoType, isLead],
  );

  if (contactInfo == null) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={() => setIsVisible(true)}
        activeOpacity={0.9}>
        {!checkNullString(contactInfo.displayText) && (
          <View>
            <LabelText
              title={title}
              iconName={headerIconName}
              size={15}
              textStyle={styles.textTitle}
            />
            <View style={styles.containerBody}>
              <Text style={styles.textData}>{contactInfo.displayText}</Text>
              <Icon
                style={styles.rightIcon}
                name={rightIconName}
                touchable={true}
                onPress={rightIconAction}
              />
              <Icon
                name="copy"
                touchable={true}
                onPress={() =>
                  clipboardProvider.copyToClipboard(contactInfo.displayText)
                }
              />
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
    containerBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '2%',
    },
    rightIcon: {
      marginRight: '2%',
    },
    textTitle: {
      fontSize: 14,
    },
    textData: {
      width: '85%',
      fontSize: 14,
    },
    borderBottom: {
      width: '100%',
      borderBottomWidth: 1.5,
      borderBottomColor: Colors.secondaryColor.background,
      marginVertical: '3%',
    },
  });

export default ContactInfoCard;
