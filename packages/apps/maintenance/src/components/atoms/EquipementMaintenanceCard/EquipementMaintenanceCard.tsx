import React from 'react';
import {StyleSheet} from 'react-native';
import {useMetafileUri, useTranslator} from '@axelor/aos-mobile-core';
import {ObjectCard} from '@axelor/aos-mobile-ui';

interface EquipementMaintenanceCardProps {
  style?: any;
  image?: {id: number};
  code: string;
  name: string;
  machine: {name: string};
}

const EquipementMaintenanceCard = ({
  style,
  image,
  code,
  name,
  machine,
}: EquipementMaintenanceCardProps) => {
  const I18n = useTranslator();
  const formatMetaFile = useMetafileUri();

  return (
    <ObjectCard
      style={[styles.card, style]}
      showArrow={false}
      touchable={false}
      leftContainerFlex={2}
      image={
        image?.id != null
          ? {
              generalStyle: styles.imageSize,
              imageSize: styles.imageSize,
              resizeMode: 'contain',
              defaultIconSize: 50,
              source: formatMetaFile(image.id),
            }
          : undefined
      }
      upperTexts={{
        items: [
          {isTitle: true, displayText: code},
          {displayText: name},
          {
            iconName: 'wrench',
            indicatorText: `${I18n.t('Maintenance_Machine')} :`,
            displayText: machine.name,
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
    marginVertical: 4,
    paddingRight: 5,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
});

export default EquipementMaintenanceCard;
