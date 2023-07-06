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
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {useConfig} from '../../../config/ConfigContext';
import {BlockInteractionScreen, Card, Icon} from '../../atoms';
import WarningCard from '../WarningCard/WarningCard';

/**
 * @description To activate this component, please use setShowBlockInteractionMessage(true,'message') from useConfig of aos-mobile/ui
 * @description To desactivate this component, please use setShowBlockInteractionMessage(false,'message') from useConfig of aos-mobile/ui
 */

interface BlockInteractionMessageProps {
  style?: any;
  navigation?: any;
}

const BlockInteractionMessage = ({
  style,
  navigation,
}: BlockInteractionMessageProps) => {
  const {showBlockInteractionMessage, setShowBlockInteractionMessage} =
    useConfig();

  if (!showBlockInteractionMessage?.show) {
    return null;
  }

  const handlePopButton = () => {
    setShowBlockInteractionMessage(false, '');
    navigation.popToTop();
  };

  return (
    <BlockInteractionScreen hideHeader={true}>
      <Card style={[styles.loadingIndicatorCard, style]}>
        <WarningCard errorMessage={showBlockInteractionMessage.message} />
        {navigation != null && (
          <TouchableOpacity onPress={handlePopButton}>
            <Icon name="undo" />
          </TouchableOpacity>
        )}
      </Card>
    </BlockInteractionScreen>
  );
};

const styles = StyleSheet.create({
  loadingIndicatorCard: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.4,
    left: Dimensions.get('window').width * 0.4,
    elevation: 24,
    shadowOpacity: 12,
  },
});

export default BlockInteractionMessage;
