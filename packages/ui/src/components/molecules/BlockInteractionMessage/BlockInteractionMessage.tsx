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

import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';
import {BlockInteractionScreen, Card} from '../../atoms';
import Button from '../Button/Button';
import WarningCard from '../WarningCard/WarningCard';

/**
 * @description To use this component, please use
 * setBlockInteractionConfig({
 *             style(optional): card style
 *             visible: boolean,
 *             message: 'string',
 *             actionItems: [
 *               {
 *                 iconName(optional): 'string',
 *                 title: 'string',
 *                 onPress: action,
 *                 color(optional): Color,
 *               },
 *             ],
 *           })
 */

const BlockInteractionMessage = () => {
  const {blockInteractionConfig} = useConfig();

  if (!blockInteractionConfig?.visible) {
    return null;
  }

  return (
    <BlockInteractionScreen hideHeader={true}>
      <Card style={[styles.container, blockInteractionConfig.style]}>
        <WarningCard
          errorMessage={blockInteractionConfig.message}
          style={styles.width}
        />
        {Array.isArray(blockInteractionConfig.actionItems) &&
          blockInteractionConfig.actionItems.length > 0 && (
            <View style={styles.buttonContainer}>
              {blockInteractionConfig.actionItems.map((action, index) => {
                return (
                  <Button
                    iconName={action.iconName}
                    key={index}
                    title={action.title}
                    onPress={action.onPress}
                    color={action.color}
                    testID={`blockInteractionMessageButton-idx${index}`}
                    style={styles.width}
                  />
                );
              })}
            </View>
          )}
      </Card>
    </BlockInteractionScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingRight: 16,
    paddingVertical: 10,
    position: 'absolute',
    top: Dimensions.get('window').height * 0.35,
    left: Dimensions.get('window').width * 0.1,
    elevation: 24,
    shadowOpacity: 12,
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  width: {
    width: Dimensions.get('window').width * 0.75,
  },
  buttonContainer: {
    flexDirection: 'column',
  },
});

export default BlockInteractionMessage;
