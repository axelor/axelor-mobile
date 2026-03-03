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

import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Alert} from '@axelor/aos-mobile-ui';
import {
  formConfigsProvider,
  FormView,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import ContactInfoFormButtons from './ContactInfoFormButtons';
import ContactInfoType from './contactInfoHelper';

const FORM_KEY = 'crm_contactInfoEdit';
const FORM_INPUT_HEIGHT = 62;
const FORM_INPUT_TITLE_HEIGHT = 68;
const FORM_BUTTONS_HEIGHT = 70;

interface ContactInfoAlertProps {
  title: string;
  contact?: any;
  contactInfoType: number;
  isLead?: boolean;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onDelete?: (args: {id: number; version: number}) => Promise<any>;
  onUpdate: (args: {id: number; version: number; data: Object}) => Promise<any>;
  refreshContactInfos: () => void;
}

const ContactInfoAlert = ({
  title,
  contact,
  contactInfoType,
  isLead = false,
  isVisible,
  setIsVisible,
  onDelete,
  onUpdate,
  refreshContactInfos,
}: ContactInfoAlertProps) => {
  const I18n = useTranslator();
  const {canDelete} = usePermitted({
    modelName: 'com.axelor.apps.base.db.PartnerAddress',
  });

  const styles = useMemo(() => {
    let formContainerHeight = 0;
    if (contactInfoType === ContactInfoType.type.Address) {
      formContainerHeight = FORM_INPUT_TITLE_HEIGHT * 3;
    } else {
      formContainerHeight = FORM_INPUT_HEIGHT;
    }
    formContainerHeight += FORM_BUTTONS_HEIGHT;

    return getStyles(formContainerHeight);
  }, [contactInfoType]);

  const contactInfo = useMemo(
    () => ContactInfoType.getContactInfo(contactInfoType, contact),
    [contact, contactInfoType],
  );

  const defaultValue = useMemo(
    () => ({
      ...contact,
      streetName: contact?.address?.streetName,
      city: contact?.address?.city?.name,
      country: contact?.address?.country?.name,
      zip: contact?.address?.zip,
      email: contact?.emailAddress?.address,
      formButtons: {
        displayDeleteButton: canDelete && !!onDelete,
        onDeleteButtonPress: () => {
          setIsVisible(false);
          onDelete?.({
            id: contactInfo.id,
            version: contactInfo.version,
          }).then(refreshContactInfos);
        },
        onConfirmButtonPress: data => {
          setIsVisible(false);
          onUpdate({
            id: contactInfo.id,
            version: contactInfo.version,
            data,
          }).then(refreshContactInfos);
        },
      },
    }),
    [
      canDelete,
      contact,
      contactInfo.id,
      contactInfo.version,
      onDelete,
      onUpdate,
      refreshContactInfos,
      setIsVisible,
    ],
  );

  const formKey = useMemo(
    () => `${FORM_KEY}_${contactInfoType}`,
    [contactInfoType],
  );

  useEffect(() => {
    formConfigsProvider.registerForm(
      formKey,
      {
        panels: {
          header: {
            direction: 'row',
            colSpan: 12,
          },
          headerLeft: {
            direction: 'column',
            colSpan: 6,
            parent: 'header',
          },
          headerRight: {
            direction: 'column',
            colSpan: 6,
            parent: 'header',
          },
        },
        fields: {
          streetName: {
            titleKey: 'Crm_StreetName',
            type: 'string',
            hideIf: () => contactInfoType !== ContactInfoType.type.Address,
          },
          city: {
            titleKey: 'Crm_City',
            type: 'string',
            hideIf: () => contactInfoType !== ContactInfoType.type.Address,
            parentPanel: 'headerLeft',
            options: {style: styles.headerLeft},
          },
          country: {
            titleKey: 'Crm_Country',
            type: 'string',
            hideIf: () => contactInfoType !== ContactInfoType.type.Address,
            parentPanel: 'headerRight',
            options: {
              style: styles.headerRight,
            },
          },
          zip: {
            titleKey: 'Crm_Zip',
            type: 'string',
            hideIf: () => contactInfoType !== ContactInfoType.type.Address,
            parentPanel: 'headerLeft',
            options: {style: styles.headerLeft},
          },
          mobilePhone: {
            type: 'phone',
            hideIf: () => contactInfoType !== ContactInfoType.type.MobilePhone,
          },
          fixedPhone: {
            type: 'phone',
            hideIf: () => contactInfoType !== ContactInfoType.type.FixedPhone,
          },
          email: {
            type: 'email',
            hideIf: () => contactInfoType !== ContactInfoType.type.Email,
          },
          webSite: {
            type: 'url',
            hideIf: () => contactInfoType !== ContactInfoType.type.WebSite,
          },
          formButtons: {
            type: 'object',
            widget: 'custom',
            customComponent: ContactInfoFormButtons,
          },
        },
        modelName: isLead
          ? 'com.axelor.apps.crm.db.Lead'
          : 'com.axelor.apps.base.db.Partner',
      },
      {replaceOld: true},
    );
  }, [formKey, contactInfoType, isLead, styles.headerLeft, styles.headerRight]);

  return (
    <Alert
      style={styles.alert}
      visible={isVisible}
      title={title}
      cancelButtonConfig={{
        title: null,
        width: 50,
        showInHeader: true,
        onPress: () => setIsVisible(false),
      }}
      translator={I18n.t}>
      <View style={styles.container}>
        <FormView
          styleScreen={styles.formView}
          defaultValue={defaultValue}
          actions={[]}
          floatingTools={false}
          formKey={formKey}
        />
      </View>
    </Alert>
  );
};
const getStyles = (formContainerHeight: number) =>
  StyleSheet.create({
    headerLeft: {
      width: '100%',
      marginLeft: -5,
    },
    headerRight: {
      width: '100%',
      height: 2 * FORM_INPUT_TITLE_HEIGHT,
      marginLeft: 5,
    },
    alert: {
      maxHeight: null,
    },
    container: {
      height: formContainerHeight,
      marginTop: 15,
    },
    formView: {
      marginHorizontal: -15,
      backgroundColor: null,
    },
  });

export default ContactInfoAlert;
