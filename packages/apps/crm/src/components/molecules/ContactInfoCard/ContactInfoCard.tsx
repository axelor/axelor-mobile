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

import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  checkNullString,
  HorizontalRule,
  Icon,
  LabelText,
  Text,
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
  onCreate?: (args: {
    id: number;
    version: number;
    data: Object;
  }) => Promise<any>;
  refreshContactInfos: () => void;
  canCreate?: boolean;
}

const ContactInfoCard = ({
  style,
  headerIconName,
  title,
  contact,
  contactInfoType,
  isLead,
  border = true,
  styleBorder,
  onPress,
  onUpdate,
  onCreate,
  refreshContactInfos,
  canCreate = true,
}: ContactInfoCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const contactInfo = useMemo(
    () => ContactInfoType.getContactInfo(contactInfoType, contact),
    [contact, contactInfoType],
  );

  const isCreation = useMemo(
    () => checkNullString(contactInfo?.displayText),
    [contactInfo?.displayText],
  );

  if (isCreation && !canCreate) {
    return null;
  }

  return (
    <>
      {isCreation ? (
        <TouchableOpacity
          style={[styles.container, styles.rowDirection, style]}
          activeOpacity={0.9}
          onPress={() => setIsVisible(true)}>
          <LabelText
            title={title}
            iconName={headerIconName}
            size={15}
            textSize={14}
          />
          <Icon name="plus-lg" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.container, style]}
          activeOpacity={0.9}
          onPress={onPress}>
          <LabelText
            title={title}
            iconName={headerIconName}
            size={15}
            textSize={14}
          />
          <View style={styles.rowDirection}>
            <Text style={styles.text} fontSize={14}>
              {contactInfo.displayText}
            </Text>
            <View style={styles.rowDirection}>
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
        </TouchableOpacity>
      )}
      {border && <HorizontalRule style={[styles.borderBottom, styleBorder]} />}
      <ContactInfoAlert
        title={title}
        contact={contact}
        contactInfoType={contactInfoType}
        isLead={isLead}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onUpdate={(isCreation ? onCreate : undefined) ?? onUpdate}
        refreshContactInfos={refreshContactInfos}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    gap: 5,
  },
  rowDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  text: {
    flex: 1,
  },
  icon: {
    marginLeft: 5,
  },
  borderBottom: {
    marginVertical: 8,
  },
});

export default ContactInfoCard;
