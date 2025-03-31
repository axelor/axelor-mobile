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

import {useEffect} from 'react';
import {
  headerActionsProvider,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {getAction} from '../utils';

export const useMessageHeaders = () => {
  useMailMessagesGenericAction();
};

const useMailMessagesGenericAction = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);

  useEffect(() => {
    headerActionsProvider.registerGenericAction(
      'message_mailMessages',
      async ({model, modelId}) =>
        await getAction({
          model,
          modelId,
          navigation,
          hideIf: !mobileSettings?.isTrackerMessageEnabled,
          translator: I18n.t,
        }),
    );
  }, [I18n.t, mobileSettings, navigation, I18n]);
};
