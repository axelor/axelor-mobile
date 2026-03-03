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

import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Alert, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useIsSubscribed} from '../../../hooks';
import {
  subscribeModel,
  unsubscribeModel,
} from '../../../features/mailMessageSlice';

const UnsubscribeIcon = ({}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const isSubscribed = useIsSubscribed();
  const dispatch = useDispatch();

  const {model, modelId} = useSelector(state => state.mailMessages);

  const [alertVisible, setAlertVisible] = useState(false);

  const handleSubscribe = useCallback(() => {
    dispatch((subscribeModel as any)({model, modelId}));
  }, [dispatch, model, modelId]);

  const handleUnsubscribe = useCallback(() => {
    dispatch((unsubscribeModel as any)({model, modelId}));
    setAlertVisible(false);
  }, [dispatch, model, modelId]);

  return (
    <>
      <Icon
        name={isSubscribed ? 'star-fill' : 'star'}
        color={
          isSubscribed
            ? Colors.primaryColor.background
            : Colors.secondaryColor_dark.background
        }
        touchable
        onPress={isSubscribed ? () => setAlertVisible(true) : handleSubscribe}
      />
      <Alert
        visible={alertVisible}
        title={I18n.t('Message_Question')}
        cancelButtonConfig={{onPress: () => setAlertVisible(false)}}
        confirmButtonConfig={{onPress: handleUnsubscribe}}
        translator={I18n.t}>
        <Text>{I18n.t('Message_Unfollow_Confirmation')}</Text>
      </Alert>
    </>
  );
};

export default UnsubscribeIcon;
