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

import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {countAttachmentFiles} from '../features/attachedFilesSlice';
import {countUnreadMailMessages} from '../features/mailMessageSlice';
import {useTranslator} from '../i18n';
import {checkNullString} from '../utils';
import {fetchModel} from '../api/model-api';
import {useOnline} from '../features/onlineSlice';
import {getNetInfo} from '../api/net-info-utils';
import {fetchJsonFieldsOfModel} from '../forms';

export const useBasicActions = ({
  model,
  modelId,
  disableMailMessages,
  disableJsonFields = false,
  attachedFileScreenTitle,
  barcodeFieldname = 'barCode',
}) => {
  const navigation = useNavigation();
  const I18n = useTranslator();
  const online = useOnline();
  const dispatch = useDispatch();

  const {attachments} = useSelector(state => state.attachedFiles);
  const {unreadMessages} = useSelector(state => state.mailMessages);

  const [disableAttachementFiles, setDisableAttachementFiles] = useState(true);
  const [disableBarcode, setDisableBarcode] = useState(true);
  const [disableCustomView, setDisableCustomView] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  const modelConfigured = useMemo(
    () => !checkNullString(model) && modelId != null,
    [model, modelId],
  );

  const countUnreadMessagesAPI = useCallback(() => {
    if (modelConfigured) {
      dispatch(countUnreadMailMessages({model, modelId}));
    }
  }, [dispatch, model, modelConfigured, modelId]);

  const countAttachmentsAPI = useCallback(() => {
    if (modelConfigured) {
      dispatch(countAttachmentFiles({model, modelId}));
    }
  }, [dispatch, model, modelConfigured, modelId]);

  useEffect(() => {
    countUnreadMessagesAPI();
  }, [countUnreadMessagesAPI]);

  useEffect(() => {
    countAttachmentsAPI();
  }, [countAttachmentsAPI]);

  useEffect(() => {
    setDisableAttachementFiles(attachments === 0);
  }, [attachments]);

  useEffect(() => {
    fetchModel({model, modelId})
      .catch(() => {
        setDisableBarcode(true);
      })
      .then(object => setDisableBarcode(object?.[barcodeFieldname] == null));
  }, [barcodeFieldname, model, modelId]);

  useEffect(() => {
    fetchJsonFieldsOfModel({modelName: model})
      .catch(() => setDisableCustomView(true))
      .then(res => {
        setDisableCustomView(res?.data?.total == null || res.data.total === 0);
      });
  }, [model]);

  const checkInternetConnection = useCallback(async () => {
    const {isConnected: _isConnected} = await getNetInfo();

    setIsConnected(_isConnected);
  }, []);

  useEffect(() => {
    const interval = setInterval(checkInternetConnection, 2000);
    return () => clearInterval(interval.current);
  }, [checkInternetConnection]);

  const mailMessagesAction = useMemo(() => {
    return {
      key: 'mailMessages',
      order: 20,
      onPress: () =>
        navigation.navigate('MailMessageScreen', {
          model,
          modelId,
        }),
      hideIf: disableMailMessages,
      indicator: unreadMessages,
      iconName: 'bell',
      FontAwesome5: false,
      title: I18n.t('Base_MailMessages'),
      showInHeader: true,
    };
  }, [I18n, disableMailMessages, model, modelId, navigation, unreadMessages]);

  const attachedFilesAction = useMemo(() => {
    return {
      key: 'attachedFiles',
      order: 10,
      title: I18n.t('Base_AttachedFiles'),
      iconName: 'paperclip',
      indicator: attachments,
      hideIf: disableAttachementFiles,
      onPress: () =>
        navigation.navigate('AttachedFilesScreen', {
          model,
          modelId,
          screenTitle: attachedFileScreenTitle,
        }),
      showInHeader: true,
    };
  }, [
    I18n,
    attachedFileScreenTitle,
    attachments,
    disableAttachementFiles,
    model,
    modelId,
    navigation,
  ]);

  const barcodeAction = useMemo(() => {
    return {
      key: 'barcode',
      order: 30,
      title: I18n.t('Base_Barcode'),
      iconName: 'qrcode',
      hideIf: disableBarcode,
      onPress: () =>
        navigation.navigate('BarcodeDisplayScreen', {
          model,
          modelId,
          barcodeFieldname,
        }),
      showInHeader: true,
    };
  }, [I18n, barcodeFieldname, disableBarcode, model, modelId, navigation]);

  const jsonFieldsAction = useMemo(() => {
    return {
      key: 'metaJsonFields',
      order: 30,
      title: I18n.t('Base_MetaJsonFields'),
      iconName: 'object-group',
      hideIf:
        disableCustomView ||
        disableJsonFields ||
        !online.isEnabled ||
        !isConnected,
      onPress: () =>
        navigation.navigate('JsonFieldScreen', {
          model,
          modelId,
        }),
      showInHeader: true,
    };
  }, [
    I18n,
    disableCustomView,
    disableJsonFields,
    online.isEnabled,
    isConnected,
    navigation,
    model,
    modelId,
  ]);

  return useMemo(() => {
    if (modelConfigured) {
      return {
        mailMessagesAction,
        attachedFilesAction,
        barcodeAction,
        jsonFieldsAction,
      };
    }

    return {
      mailMessagesAction: {key: 'mailMessages', hideIf: true},
      attachedFilesAction: {key: 'attachedFiles', hideIf: true},
      barcodeAction: {key: 'barcode', hideIf: true},
      jsonFieldsAction: {key: 'metaJsonFields', hideIf: true},
    };
  }, [
    attachedFilesAction,
    barcodeAction,
    jsonFieldsAction,
    mailMessagesAction,
    modelConfigured,
  ]);
};
