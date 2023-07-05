/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';
import {BlockInteractionScreen, Card, Icon} from '../../atoms';
import WarningCard from '../WarningCard/WarningCard';

/**
 * @description To use this component, please use setBlockInteractionConfig({visible:boolean,message:'string',callback:()=> {},iconName(optional):'string'}) from useConfig of aos-mobile/ui
 */

const BlockInteractionMessage = ({}) => {
  const {blockInteractionConfig, setBlockInteractionConfig} = useConfig();
  if (!blockInteractionConfig?.visible) {
    return null;
  }

  const handleButton = () => {
    blockInteractionConfig?.callback();
    setBlockInteractionConfig({
      visible: false,
      message: '',
      callback: () => {},
    });
  };

  return (
    <BlockInteractionScreen hideHeader={true}>
      <Card style={styles.container}>
        <WarningCard
          errorMessage={blockInteractionConfig.message}
          style={styles.warningCard}
        />
        <Icon
          name={blockInteractionConfig?.iconName}
          touchable={true}
          onPress={handleButton}
        />
      </Card>
    </BlockInteractionScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.4,
    left: Dimensions.get('window').width * 0.1,
    elevation: 24,
    shadowOpacity: 12,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  warningCard: {
    width: '100%',
    marginRight: 10,
  },
});

export default BlockInteractionMessage;
