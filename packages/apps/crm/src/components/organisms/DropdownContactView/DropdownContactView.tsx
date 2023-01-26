import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator, linkingProvider} from '@axelor/aos-mobile-core';
import {ContactInfoCard} from '../../molecules';
import {Text} from '@axelor/aos-mobile-ui';

interface DropdownContactViewProps {
  address: string;
  fixedPhone?: string;
  mobilePhone?: string;
  emailAddress: string;
  webSite: string;
}

const DropdownContactView = ({
  address,
  fixedPhone,
  mobilePhone,
  emailAddress,
  webSite,
}: DropdownContactViewProps) => {
  const I18n = useTranslator();

  if (!fixedPhone && !fixedPhone && !mobilePhone && !emailAddress && !webSite) {
    return (
      <View>
        <Text>{I18n.t('Crm_NoContactInformation')}</Text>
      </View>
    );
  }

  return (
    <View>
      <ContactInfoCard
        headerIconName={'map-marker-alt'}
        title={I18n.t('Crm_Adress')}
        data={address}
        rightIconName={'map-marked-alt'}
        border={
          fixedPhone != null ||
          mobilePhone != null ||
          emailAddress != null ||
          webSite != null
        }
        styleBorder={styles.borderInfoCard}
        rightIconAction={() => linkingProvider.openMapApp(address)}
      />
      <ContactInfoCard
        headerIconName={'phone-alt'}
        title={I18n.t('Crm_Phone')}
        data={fixedPhone}
        rightIconName={'phone-alt'}
        border={mobilePhone != null || emailAddress != null || webSite != null}
        styleBorder={styles.borderInfoCard}
        rightIconAction={() => linkingProvider.openCallApp(fixedPhone)}
      />
      <ContactInfoCard
        headerIconName={'mobile-alt'}
        title={I18n.t('Crm_MobilePhone')}
        data={mobilePhone}
        rightIconName={'phone-alt'}
        border={emailAddress != null || webSite != null}
        styleBorder={styles.borderInfoCard}
        rightIconAction={() => linkingProvider.openCallApp(mobilePhone)}
      />
      <ContactInfoCard
        headerIconName={'envelope'}
        title={I18n.t('Crm_Email')}
        data={emailAddress}
        rightIconName={'send'}
        FontAwesome5RightIcon={false}
        border={webSite != null}
        styleBorder={styles.borderInfoCard}
        rightIconAction={() => linkingProvider.openMailApp(emailAddress)}
      />
      <ContactInfoCard
        headerIconName={'link'}
        title={I18n.t('Crm_WebSite')}
        data={webSite}
        rightIconName={'external-link-alt'}
        styleBorder={styles.borderInfoCard}
        rightIconAction={() => linkingProvider.openBrowser(webSite)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  borderInfoCard: {
    width: '112%',
    left: '-5%',
  },
});

export default DropdownContactView;
