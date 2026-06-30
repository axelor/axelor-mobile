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
  IconTile,
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
  const Colors = useThemeColor();

  const [isVisible, setIsVisible] = useState(false);

  const contactInfo = useMemo(
    () => ContactInfoType.getContactInfo(contactInfoType, contact),
    [contact, contactInfoType],
  );

  const isCreation = useMemo(
    () => checkNullString(contactInfo?.displayText),
    [contactInfo?.displayText],
  );

  if (isCreation && !canCreate) return null;

  return (
    <>
      <TouchableOpacity
        style={[styles.container, style]}
        activeOpacity={0.9}
        onPress={onPress}>
        <View style={styles.rowDirection}>
          <LabelText title={title} iconName={headerIconName} />
          {isCreation && (
            <IconTile
              icon="plus-lg"
              size={30}
              iconSize={12}
              onPress={() => setIsVisible(true)}
              color={Colors.primaryColor}
            />
          )}
        </View>
        {!isCreation && (
          <View style={styles.rowDirection}>
            <Text style={styles.text}>{contactInfo.displayText}</Text>
            <View style={styles.rowDirection}>
              <IconTile
                icon="copy"
                size={30}
                iconSize={12}
                onPress={() =>
                  clipboardProvider.copyToClipboard(contactInfo.displayText)
                }
                color={Colors.secondaryColor}
                backgroundColor={Colors.screenBackgroundColor}
              />
              <IconTile
                icon="pencil-fill"
                size={30}
                iconSize={12}
                onPress={() => setIsVisible(true)}
                color={Colors.primaryColor}
                backgroundColor={Colors.screenBackgroundColor}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
      {border && (
        <HorizontalRule
          style={[styles.borderBottom, styleBorder]}
          color={Colors.secondaryColor.background_light}
        />
      )}
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
    gap: 5,
  },
  rowDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    flex: 1,
  },
  borderBottom: {
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
  },
});

export default ContactInfoCard;
