import React from 'react';
import {View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {LabelText, Text} from '@axelor/aos-mobile-ui';

interface DropdownGeneralViewProps {
  assignedUser?: string;
  language?: string;
  category?: string;
  industrySector?: string;
  priceList?: string;
}

const DropdownGeneralView = ({
  assignedUser,
  language,
  category,
  industrySector,
  priceList,
}: DropdownGeneralViewProps) => {
  const I18n = useTranslator();

  if (
    !assignedUser &&
    !category &&
    !industrySector &&
    !priceList &&
    !language
  ) {
    return (
      <View>
        <Text>{I18n.t('Crm_NoGeneralInformation')}</Text>
      </View>
    );
  }

  return (
    <View>
      {assignedUser && (
        <LabelText
          title={I18n.t('Crm_AssignedTo')}
          iconName={'user-tie'}
          value={assignedUser}
        />
      )}
      {language && (
        <LabelText title={I18n.t('Crm_Language')} value={language} />
      )}
      {category && (
        <LabelText title={I18n.t('Crm_Category')} value={category} />
      )}
      {industrySector && (
        <LabelText title={I18n.t('Crm_Sector')} value={industrySector} />
      )}
      {priceList && (
        <LabelText title={I18n.t('Crm_PriceList')} value={priceList} />
      )}
    </View>
  );
};

export default DropdownGeneralView;
