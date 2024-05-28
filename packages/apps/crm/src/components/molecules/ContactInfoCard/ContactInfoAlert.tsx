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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Alert} from '@axelor/aos-mobile-ui';
import {
  formConfigsProvider,
  FormView,
  useTranslator,
} from '@axelor/aos-mobile-core';
import ContactInfoFormButtons from './ContactInfoFormButtons';
import ContactInfoType from './contactInfoHelper';

const FORM_KEY = 'crm_contactInfoEdit';
const FORM_INPUT_HEIGHT = 62;
const FORM_BUTTONS_HEIGHT = 70;

interface ContactInfoAlertProps {
  title: string;
  contact: any;
  contactInfoType: number;
  isLead?: boolean;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onUpdate: (args: {id: number; version: number; data: Object}) => void;
  refreshContactInfos: () => void;
}

const ContactInfoAlert = ({
  title,
  contact,
  contactInfoType,
  isLead = false,
  isVisible,
  setIsVisible,
  onUpdate,
  refreshContactInfos,
}: ContactInfoAlertProps) => {
  const I18n = useTranslator();

  const [isEditMode, setIsEditMode] = useState(false);

  const styles = useMemo(() => getStyles(isEditMode), [isEditMode]);

  const contactInfo = useMemo(
    () => ContactInfoType.getContactInfo(contactInfoType, contact, isLead),
    [contact, contactInfoType, isLead],
  );

  const defaultValue = useMemo(
    () => ({
      ...contact,
      email: contact.emailAddress.address,
      formButtons: {
        onCancelButtonPress: () => setIsEditMode(false),
        onConfirmButtonPress: data => {
          setIsEditMode(false);
          onUpdate({id: contactInfo.id, version: contactInfo.version, data});
        },
      },
    }),
    [contact, contactInfo, onUpdate],
  );

  const formKey = useMemo(
    () => `${FORM_KEY}_${contactInfoType}`,
    [contactInfoType],
  );

  useEffect(() => {
    formConfigsProvider.registerForm(
      formKey,
      {
        readonlyIf: () => !isEditMode,
        fields: {
          mobilePhone: {
            type: 'phone',
            widget: 'default',
            hideIf: () => contactInfoType !== ContactInfoType.type.MobilePhone,
          },
          fixedPhone: {
            type: 'phone',
            widget: 'default',
            hideIf: () => contactInfoType !== ContactInfoType.type.FixedPhone,
          },
          email: {
            type: 'email',
            widget: 'default',
            hideIf: () => contactInfoType !== ContactInfoType.type.Email,
          },
          webSite: {
            type: 'url',
            widget: 'default',
            hideIf: () => contactInfoType !== ContactInfoType.type.WebSite,
          },
          formButtons: {
            type: 'object',
            widget: 'custom',
            customComponent: ContactInfoFormButtons,
            hideIf: () => !isEditMode,
          },
        },
        modelName: isLead
          ? 'com.axelor.apps.crm.db.Lead'
          : 'com.axelor.apps.base.db.Partner',
      },
      {replaceOld: true},
    );
  }, [formKey, contactInfoType, isEditMode, isLead]);

  return (
    <Alert
      visible={isVisible}
      title={title}
      cancelButtonConfig={{
        title: null,
        width: 50,
        showInHeader: true,
        onPress: () => {
          setIsEditMode(false);
          setIsVisible(false);
          refreshContactInfos();
        },
      }}
      confirmButtonConfig={{
        title: null,
        iconName: 'pencil-fill',
        width: 50,
        hide: isEditMode,
        onPress: () => setIsEditMode(true),
      }}
      translator={I18n.t}>
      <View style={styles.container}>
        <FormView
          styleScreen={styles.formView}
          defaultValue={defaultValue}
          actions={[]}
          formKey={formKey}
        />
      </View>
    </Alert>
  );
};
const getStyles = (isEditMode: boolean) =>
  StyleSheet.create({
    container: {
      height: FORM_INPUT_HEIGHT + (isEditMode ? FORM_BUTTONS_HEIGHT : 0),
      marginTop: 15,
    },
    formView: {
      marginHorizontal: -30,
      backgroundColor: null,
    },
  });

export default ContactInfoAlert;
