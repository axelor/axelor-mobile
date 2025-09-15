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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  handlerApiCall,
  useNavigation,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  Icon,
  NumberBubble,
  RightIconButton,
  ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {countAttachedDocumentsApi} from '@axelor/aos-mobile-dms';

const MODEL = 'com.axelor.apps.quality.db.QIResolutionDefault';

interface DefectAttachedFilesButtonProps {
  defectId: number;
}

const DefectAttachedFilesButton = ({
  defectId,
}: DefectAttachedFilesButtonProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const navigation = useNavigation();

  const [indicator, setIndicator] = useState(0);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handleNavigation = useCallback(() => {
    navigation.navigate('AttachedFilesScreen', {
      model: MODEL,
      modelId: defectId,
    });
  }, [defectId, navigation]);

  useEffect(() => {
    if (!isNaN(defectId)) {
      handlerApiCall({
        fetchFunction: countAttachedDocumentsApi,
        data: {model: MODEL, modelId: defectId},
        action: 'Dms_SliceAction_CountAttachedFiles',
        getState: () => {},
        responseOptions: {returnTotal: true},
        errorOptions: {
          errorTracing: false,
          showErrorToast: false,
        },
      }).then(setIndicator);
    } else {
      setIndicator(0);
    }
  }, [defectId]);

  if (!(indicator > 0)) {
    return null;
  }

  return (
    <RightIconButton
      icon={
        <View style={styles.container}>
          <NumberBubble
            isNeutralBackground
            number={indicator}
            color={Colors.primaryColor}
          />
          <Icon name="chevron-right" color={Colors.primaryColor.background} />
        </View>
      }
      style={styles.content}
      title={I18n.t('Quality_SeeAttachedFiles')}
      onPress={handleNavigation}
    />
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 5,
    },
    content: {
      width: '100%',
      height: 40,
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
      paddingLeft: 10,
      paddingRight: 10,
      marginRight: 0,
    },
  });

export default DefectAttachedFilesButton;
